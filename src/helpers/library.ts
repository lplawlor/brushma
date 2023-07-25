/**
 * A set of type interfaces and functions for automatically
 * fetching and filtering the user's library via the Spotify API.
 */

/**
 * The following two interfaces are incomplete respresentations Response as described here:
 * https://developer.spotify.com/documentation/web-api/reference/get-users-saved-tracks
 *
 * These interfaces contains only the fields which are needed for this app.
 */
interface SpotifyTrack {
  album: {
    // ...
    name: string;
    // ...
  };
  artists: [
    {
      // ...
      name: string;
      // ...
    }
  ];
  // ...
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  // ...
  name: string;
  // ...
  uri: string;
  is_local: boolean;
}

interface TracksResponseBody {
  // ...
  next: string;
  // ...
  items: [
    {
      // ...
      track: SpotifyTrack;
    }
  ];
}

/**
 * Spotify's track objects contain far more info than is needed for this app,
 * so we'll define as simplified object containing just the necessary info.
 */
export interface SimplifiedTrack {
  title: string;
  album_name: string;
  artist_names: string[];
  duration_ms: number;
  url: string;
  uri: string;
}

/**
 * Convert a SpotifyTrack object to a SimplifiedTrack object.
 *
 * @param track SpotifyTrack object to be simplified
 * @returns SimplifiedTrack object
 */
function simplifyTrack(track: SpotifyTrack): SimplifiedTrack {
  let artist_names = [];

  for (const artist of track.artists) {
    artist_names.push(artist.name);
  }

  return {
    title: track.name,
    album_name: track.album.name,
    artist_names: artist_names,
    duration_ms: track.duration_ms,
    url: track.external_urls.spotify,
    uri: track.uri,
  };
}

/**
 * Fetch and filter the user's library of saved tracks, and return it as a simplified array.
 * This method can invoke many GET requests to the Spotify API, each capped at 50 tracks.
 *
 * @param accessToken access_token string granted by Spotify
 *                    must have user-library-read scope
 * @param minLength minimum length of songs to include, in MS
 * @param maxLength maximum length of songs to include, in MS
 * @returns array of SimplifiedTracks, each matching the above criteria
 */
export async function getFilteredLibrary(
  accessToken: string,
  minLength: number,
  maxLength: number
): Promise<SimplifiedTrack[]> {
  // This will be an array of SimplifiedTracks
  // It will store each track in the user's library which is within the time range given
  let tracks : SimplifiedTrack[] = [];

  // Often, requests to the Spotify /tracks endpoint will fail with error 500 (server error)
  // We will wait for 3 such errors to occur on a given request before giving up and throwing an error
  let failures = 0;

  // We will start at the first "page" of tracks, and continue until there are no pages left
  // Note that we're using the max value for 'limit' (50)
  let nextPage = "https://api.spotify.com/v1/me/tracks/?offset=0&limit=50";
  while (nextPage !== null) {
    // GET the next page of the user's library (liked tracks)
    const response = await fetch(nextPage, {
      method: "GET",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    });

    if (!response.ok) {
      failures++;

      // If less than three errors have occured, return to the start of the loop and try again
      if (failures < 3) {
        continue;
      }

      // If 3 errors occur on one request, give up
      throw Error(
        "Spotify Error " +
        response.status +
        " on GET " +
        nextPage +
        ": " +
        (await response.text())
      );
    }

    // Reset the failure count for each new request
    failures = 0;

    const responseBody =
      (await response.json()) as TracksResponseBody;

    nextPage = responseBody.next;

    for (const { track } of responseBody.items) {
      // Do not include tracks which are local or outside of the time range given in the request
      if (
        track.is_local || //TODO: Consider if including local tracks will break the app
        track.duration_ms < minLength ||
        track.duration_ms > maxLength
      ) {
        continue;
      }

      tracks.push(simplifyTrack(track));
    }
  }

  return tracks;
}

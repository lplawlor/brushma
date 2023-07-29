/**
 * A set of type interfaces and functions for automatically
 * fetching and filtering the user's library via the Spotify API.
 */

import { retry } from "async";

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
  total: number;
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
 * Return a promise which will resolve in the given number of miliseconds.
 *
 * @param ms number of miliseconds to sleep for
 * @returns Promise resolving in ms miliseconds
 */
async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Fetch and filter the user's library of saved tracks, and return it as a simplified array.
 * This method can invoke many GET requests to the Spotify API, each capped at 50 tracks.
 * The requests are made asynchronously, which reduces the runtime of this function considerably.
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
  // This will store all tracks in the user's library which are within the time range given
  // It will be returned in the end
  let tracks: SimplifiedTrack[] = [];

  /**
   * Fetch 50 tracks at the given offset using a GET request and return the body as JSON.
   * An error is thrown for a HTTP 500 response status.
   * This nested function was created as it is needed multiple times later in this function.
   *
   * @param offset number of tracks to skip ahead in the user's library
   * @returns a Promise which should resolve to a TracksResponseBody object
   */
  async function fetchJSON(offset: number): Promise<TracksResponseBody> {
    const response = await fetch(
      "https://api.spotify.com/v1/me/tracks/?offset=" + offset + "&limit=50",
      {
        method: "GET",
        cache: "no-store",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        "Spotify Error " +
          response.status +
          " on GET " +
          offset +
          ": " +
          response.statusText
      );
    }

    return (await response.json()) as TracksResponseBody;
  }

  /**
   * Loop through the tracks on a "page" and add the matching ones to the tracks list.
   * This nested function is defined to be used as a callback later.
   *
   * @param responseBody body of the response object returned from Spotify's /me/tracks endpoint
   */
  async function filterAndAddTracks(
    responseBody: TracksResponseBody
  ): Promise<void> {
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

  const retryOpts = {
    times: 5,
    interval: 10,
  };

  // The first request must be made outside the loop, to get the total number of pages
  // Occasionally, a HTTP 500 (server) status will be returned despite the request being okay
  // Therefore, the retry() method is used to try 3 times before giving up
  const responseBody = await retry(retryOpts, async () => {
    // Get the first 50 tracks (offset 0)
    return await fetchJSON(0);
  });

  // This is the total number of requests which must be made (the first is already done)
  const totalPages = Math.ceil(responseBody.total / 50);

  // This list will store the Promises created by running filterAndAddTracks on the response body of each request
  let promises: Promise<void>[] = [filterAndAddTracks(responseBody)];

  // The rest of the requests can be made in a loop, incrementing the offset each time
  for (let page = 1; page < totalPages; page++) {
    // Push each promise from filterAndAddTracks to the list
    // Note that we do not await the resolution of filterAndAddTracks, so the requests can be made asynchronously
    promises.push(
      // Once again, retry is used to send each request 3 times before giving up
      retry(retryOpts, async () => {
        // The offset is the page number multiplied by the page size (50)
        return await fetchJSON(50 * page);
      }).then(async (responseBody) => {
        // Once the response body is ready, filter the list of tracks and add them
        return await filterAndAddTracks(responseBody);
      })
    );

    // Sleep for 20 ms between creating promises to avoid exceeding rate limit
    await sleep(20);
  }

  // Await for all pages to be processed
  await Promise.all(promises);

  // Return the list of SimplifiedTrack objects which match the given criteria
  return tracks;
}

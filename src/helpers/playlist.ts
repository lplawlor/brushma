import { SimplifiedTrack } from "./library";

/**
 * Creates a new private playlist named 'Brushma' in the current user's library.
 *
 * @param accessToken access token with playlist-modify-private scope for the current user
 * @param userID Spotify ID of the current user
 * @returns Spotify ID of the newly created playlist
 */
export async function createPlaylist(
  accessToken: string,
  userID: string
): Promise<string> {
  const endpoint = "https://api.spotify.com/v1/users/" + userID + "/playlists";

  const currentDate = new Date();

  const body = JSON.stringify({
    name: "Brushma",
    public: "false",
    collaborative: "false",
    description: "Generated by Brushma (" + currentDate.toUTCString() + ")",
  });

  const spotifyResponse = await fetch(endpoint, {
    method: "POST",
    cache: "no-store",
    headers: {
      Authorization: "Bearer " + accessToken,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!spotifyResponse.ok) {
    throw Error(
      "Spotify Error " + spotifyResponse.status + " on POST " + endpoint
    );
  }

  return (await spotifyResponse.json()).id;
}

/**
 * Fill an empty Spotify playlist with a collection of tracks
 *
 * @param accessToken access token with playlist-modify-private scope for the current user
 * @param playlistID id of the empty playlist to populate
 * @param tracks array of SimplifiedTrack objects to fill the playlist with
 */
export async function populatePlaylist(
  accessToken: string,
  playlistID: string,
  tracks: SimplifiedTrack[]
) {
  /**
   * Make a POST request to the Spotify API to add the given items to the playlist
   *
   * @param urisCSL comma seperated list of Spotify URIs
   */
  async function addToPlaylist(uris: string[]) {
    const endpoint =
      "https://api.spotify.com/v1/playlists/" + playlistID + "/tracks";

    const body = JSON.stringify({ uris: uris });


    const response = await fetch(endpoint, {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: body,
    });

    if (!response.ok) {
      throw Error("Spotify Error " + response.status + " on POST " + endpoint);
    }
  }

  let uris = [];

  for (const track of tracks) {
    // The Spotify API is limited to 100 tracks at a time,
    // So if we reach 100 we'll make the request early and clear the list of URIs
    if (uris.length >= 100) {
      await addToPlaylist(uris);
      uris = [];
    }
    uris.push(track.uri);
  }

  await addToPlaylist(uris);
}

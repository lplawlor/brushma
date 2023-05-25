interface ImageObject {
  url: string;
  height: null | number;
  width: null | number;
}

export interface SpotifyUser {
  display_name: string;
  // ...
  images: [ImageObject];
  // ...
  uri: string;
}

export interface User {
  display_name: string;
  image_url: null | string;
  uri: string;
}

const USER_ENDPOINT = "https://api.spotify.com/v1/me";

export async function getUserInfo(accessToken: string): Promise<User> {
  const spotifyResponse = await fetch(USER_ENDPOINT, {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!spotifyResponse.ok) {
    throw Error(
      "Spotify Error " + spotifyResponse.status + " on GET " + USER_ENDPOINT
    );
  }

  const spotifyResponseBody = (await spotifyResponse.json()) as SpotifyUser;

  // If the user has a profile pic, use its url, else use null
  const profile_pic =
    spotifyResponseBody.images.length > 0
      ? spotifyResponseBody.images[0].url
      : null;

  // Extract and return just the necessary info from the response
  return {
    display_name: spotifyResponseBody.display_name,
    image_url: profile_pic,
    uri: spotifyResponseBody.uri,
  };
}

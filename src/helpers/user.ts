interface ImageObject {
  url: string;
  height: null | number;
  width: null | number;
}

export interface User {
  display_name: string;
  // ...
  images: [ImageObject];
  // ...
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

  const spotifyResponseBody = (await spotifyResponse.json()) as User;

  // Extract just the necessary info from the response
  return {
    display_name: spotifyResponseBody.display_name,
    images: spotifyResponseBody.images,
    uri: spotifyResponseBody.uri,
  };
}

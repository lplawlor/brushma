import "client-only";
import Cookies from "universal-cookie";

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

/**
 * Fetch current User via a GET request and save it as a cookie.
 *
 * @param accessTokenJWT Spotify API access token signed as a JWT
 *                       This should be stored as a cookie after the Authentication process
 * @returns the User which was fetched and saved as a cookie
 */
export async function fetchUser(accessTokenJWT: string): Promise<User> {
  const endpoint = process.env.NEXT_PUBLIC_CANONICAL_URL + "api/user";

  const response = await fetch(endpoint + "?accessTokenJWT=" + accessTokenJWT, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw Error("Error " + response.status + " on GET " + endpoint);
  }

  const responseBody = (await response.json()) as SpotifyUser;

  // If the user has a profile pic, use its url, else use null
  const profilePic =
    responseBody.images.length > 0 ? responseBody.images[0].url : null;

  const thisUser = {
      display_name: responseBody.display_name,
      image_url: profilePic,
      uri: responseBody.uri,
    };

  // Extract and return just the necessary info from the response
  const universalCookies = new Cookies();
  universalCookies.set(
    "user",
    thisUser,
    {
      path: "/",
      maxAge: 3540,
      sameSite: "lax",
    }
  );

  return thisUser;
}

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Request an access token from Spotify using authorization code and code verifier.
 * If the request to Spotify's API is unsuccessful, the response is returned as-is.
 * If successful, its body is signed as a JWT string and returned.
 *
 * @param request Request object containing code and codeVerifier as body parameters
 * @returns Response object containing JWT on success
 */
export async function POST(request: NextRequest) {
  const { code, codeVerifier } = await request.json();

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.NEXT_PUBLIC_CANONICAL_URL + "spotify-redirect",
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_ID,
    code_verifier: codeVerifier,
  });

  const spotifyResponse = await fetch(
    "https://accounts.spotify.com/api/token",
    {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: body,
    }
  );

  // If the call to the Spotify token API results in an error, return the response as-is
  if (!spotifyResponse.ok) {
    return spotifyResponse;
  }

  // Extract the access token from the response body and sign it as a JWT using a secret key
  const accessToken = (await spotifyResponse.json()).access_token;
  const accessTokenJWT = jwt.sign(accessToken, process.env.JWT_SECRET);

  // Repackage the JWT as a successful response (HTTP status 200)
  return new NextResponse(accessTokenJWT, {
    status: 200,
  });
}

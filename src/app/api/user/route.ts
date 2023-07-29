import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

/**
 * Request info about the user associated with the given access token from the Spotify API.
 * If the given accessTokenJWT cannot be verified, a 400 status will be returned.
 * Otherwise, the response from Spotify will be returned.
 *
 * @param request Request object containing accessCodeJWT, as recieved from /api/token
 * @returns Response object
 */
export async function GET(request: NextRequest): Promise<Response> {
  const accessTokenJWT = request.nextUrl.searchParams.get(
    "accessTokenJWT"
  ) as string;

  let accessToken;

  try {
    // Verify (decode) the accessToken using the secret key
    accessToken = jwt.verify(accessTokenJWT, process.env.JWT_SECRET) as string;
  } catch (error) {
    return new NextResponse("Could not verify accessTokenJWT.", {
      status: 400,
    });
  }

  const spotifyResponse = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    cache: "no-store",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  });

  if (!spotifyResponse.ok) {
    return new NextResponse("GET request to Spotify /me endpoint failed.", {
      status: spotifyResponse.status,
      statusText: spotifyResponse.statusText,
    });
  }

  const spotifyResponseBody = await spotifyResponse.json();

  return new NextResponse(JSON.stringify(spotifyResponseBody), {
    status: 200,
  });
}

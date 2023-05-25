import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(request: NextRequest): Promise<Response> {
  const accessTokenJWT = request.nextUrl.searchParams.get("accessTokenJWT");

  if (accessTokenJWT == null) {
    return new NextResponse("Missing query parameter: accessTokenJWT", {
      status: 400,
    });
  }

  let accessToken;

  try {
    // Verify (decode) the accessToken using the secret key
    accessToken = jwt.verify(accessTokenJWT, process.env.JWT_SECRET);
  } catch (error) {
    return new NextResponse("accessTokenJWT could not be verfied.", {
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

  return spotifyResponse;
}

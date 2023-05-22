import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  const { code, codeVerifier } = await request.json();

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code: code,
    redirect_uri: process.env.NEXT_PUBLIC_CANONICAL_URL,
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_ID,
    code_verifier: codeVerifier,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    cache: "no-store",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body,
  });

  if (!response.ok) {
    return response;
  }

  const responseBody = await response.json();

  const bodyAsJWT = jwt.sign(JSON.stringify(responseBody), process.env.JWT_SECRET);

  return new Response(bodyAsJWT, {
    status: 200,
  });
}

"use client";

import { requestUserAuthorization } from "@/helpers/authorization";

function SignInWithSpotify() {
  return (
    <button
      onClick={() =>
        requestUserAuthorization(
          process.env.NEXT_PUBLIC_SPOTIFY_ID,
          process.env.NEXT_PUBLIC_SCOPE,
          process.env.NEXT_PUBLIC_CANONICAL_URL + "spotify-redirect"
        )
      }
    >
      Authorize
    </button>
  );
}

export default SignInWithSpotify;

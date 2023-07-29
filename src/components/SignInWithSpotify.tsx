"use client";

import { requestUserAuthorization } from "@/helpers/authorization";

function SignInWithSpotify() {
  return (
    <button
      className="btn-primary"
      onClick={() =>
        requestUserAuthorization(
          process.env.NEXT_PUBLIC_SPOTIFY_ID,
          process.env.NEXT_PUBLIC_SCOPE,
          process.env.NEXT_PUBLIC_CANONICAL_URL + "spotify-redirect"
        )
      }
    >
      Sign In With Spotify
    </button>
  );
}

export default SignInWithSpotify;

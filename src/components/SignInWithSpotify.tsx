"use client";

import { requestUserAuthorization } from "@/helpers/authorization";
import PrimaryButton from "@/components/PrimaryButton";

function SignInWithSpotify() {
  return (
    <PrimaryButton
      onClick={() =>
        requestUserAuthorization(
          process.env.NEXT_PUBLIC_SPOTIFY_ID,
          process.env.NEXT_PUBLIC_SCOPE,
          process.env.NEXT_PUBLIC_CANONICAL_URL + "spotify-redirect"
        )
      }
    >
      Sign In With Spotify
    </PrimaryButton>
  );
}

export default SignInWithSpotify;

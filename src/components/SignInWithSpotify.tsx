"use client";

import { requestUserAuthorization } from "@/helpers/authorization";

function SignInWithSpotify() {
  return (
    <button
      className="text-red-400 bg-white border-2 border-red-400 hover:text-white hover:bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-lg px-5 py-2.5 text-center mr-2 mb-2"
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

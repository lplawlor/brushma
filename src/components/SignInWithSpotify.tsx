"use client";

import { requestUserAuthorization } from "@/helpers/authorization";

function SignInWithSpotify() {
  return (
    <button
      className="m-6 rounded-full border-2 border-red-400 bg-transparent px-5 py-2.5 text-center text-xl font-medium text-red-400 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
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

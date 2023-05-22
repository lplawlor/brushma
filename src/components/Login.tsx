"use client";

import { requestUserAuthorization } from "@/helpers/authorization";

function Login() {
  const scope = "playlist-read-private playlist-modify-private";

  return (
    <button
      onClick={() =>
        requestUserAuthorization(
          process.env.NEXT_PUBLIC_SPOTIFY_ID,
          scope,
          process.env.NEXT_PUBLIC_CANONICAL_URL
        )
      }
    >
      Authorize
    </button>
  );
}

export default Login;

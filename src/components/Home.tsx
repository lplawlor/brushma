"use client";

import { requestUserAuthorization } from "@/helpers/authorization";

function Home() {
  const scope = "playlist-modify-private user-library-read";

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

export default Home;

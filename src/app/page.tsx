import { cookies } from "next/headers";
import SpotifyRedirectHandler from "@/components/SpotifyRedirectHandler";
import Home from "@/components/Home";
import PlaylistGenerator from "@/components/PlaylistGenerator";

async function Page() {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");

  if (!accessTokenJWTCookie) {
    return <Home />;
  }

  return <PlaylistGenerator accessTokenJWT={accessTokenJWTCookie.value} />;
}

export default Page;

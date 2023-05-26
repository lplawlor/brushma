import { cookies } from "next/headers";
import SpotifyRedirectHandler from "@/components/SpotifyRedirectHandler";
import Home from "@/components/Home";
import PlaylistGenerator from "@/components/PlaylistGenerator";

async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");

  // If this is a redirect from the Spotify Authentication page
  if (searchParams && searchParams.state && searchParams.code) {
    return (
      <SpotifyRedirectHandler
        returnState={searchParams.state}
        returnCode={searchParams.code}
      />
    );
  }

  if (!accessTokenJWTCookie) {
    return <Home />;
  }

  return (
    <PlaylistGenerator accessTokenJWT={accessTokenJWTCookie.value}/>
  );
}

export default Page;

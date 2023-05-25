import { cookies } from "next/headers";
import Login from "@/components/Login";
import SpotifyRedirectHandler from "@/components/SpotifyRedirectHandler";
import UserInfo from "@/components/UserInfo";
import Tracks from "@/components/Tracks";

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
    return <Login />;
  }

  return (
    /* @ts-expect-error Async Server Component */
    <UserInfo accessTokenJWT={accessTokenJWTCookie.value} />
    // <Tracks
    //   accessTokenJWT={accessTokenJWTCookie.value}
    //   minLength={120000}
    //   maxLength={135000}
    // />
  );
}

export default Page;

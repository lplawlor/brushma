import { cookies } from "next/headers";
import Login from "@/components/Login";
import SpotifyRedirectHandler from "@/components/SpotifyRedirectHandler";
import UserInfo from "@/components/UserInfo";

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

  return <UserInfo accessTokenJWT={accessTokenJWTCookie.value}/>;
}

export default Page;

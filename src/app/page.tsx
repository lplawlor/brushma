import { cookies } from "next/headers";
import Login from "@/components/Login";
import SpotifyRedirectHandler from "@/components/SpotifyRedirectHandler";

async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const accessTokenJWT = cookieStore.get("accessTokenJWT");

  // If this is a redirect from the Spotify Authentication page
  if (searchParams && searchParams.state && searchParams.code) {
    return <SpotifyRedirectHandler returnState={searchParams.state} returnCode={searchParams.code}/>
  }

  if (!accessTokenJWT) {
    return <Login />;
  }

  return <>Logged In - JWT: {accessTokenJWT.value}</>;
}

export default Page;

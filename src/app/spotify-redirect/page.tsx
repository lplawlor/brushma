import { redirect } from "next/navigation";
import SpotifyRedirectHandler from "@/components/SpotifyRedirectHandler";

async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  // If the following aren't present, this is not a valid redirect
  // from Spotify, or the user did not give authorization
  if (!searchParams || !searchParams.state || !searchParams.code) {
    redirect("/");
  }

  return (
    <SpotifyRedirectHandler
      returnState={searchParams.state}
      returnCode={searchParams.code}
    />
  );
}

export default Page;

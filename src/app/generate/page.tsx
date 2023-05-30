import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { User } from "@/helpers/user";
import { getFilteredLibrary } from "@/helpers/library";
import { createPlaylist, populatePlaylist } from "@/helpers/playlist";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");
  const userCookie = cookieStore.get("user");

  // If the user is logged not in, redirect them
  if (!accessTokenJWTCookie || !userCookie) {
    redirect("/");
  }

  if (!searchParams.minLength || !searchParams.maxLength) {
    throw Error("Query parameters 'minLength' and/or 'maxLength' missing.")
  }

  const minLength = parseInt(searchParams.minLength);
  const maxLength = parseInt(searchParams.maxLength);

  if (isNaN(minLength) || isNaN(maxLength)) {
    throw Error("Could not parse query parameters 'minLength' and/or 'maxLength' as integers.");
  }

  if (minLength > maxLength) {
    throw Error("Query parameters 'minLength' and 'maxLength' must be equal.");
  }

  const userID = (JSON.parse(userCookie.value) as User).id;

  let accessToken;

  try {
    // Verify (decode) the accessToken using the secret key
    accessToken = jwt.verify(accessTokenJWTCookie.value, process.env.JWT_SECRET) as string;
  } catch (error) {
    return <>Error: Could not verfiy accessTokenJWT</>;
  }

  // FETCH STEP 1: Get all the user's song in the given time range
  const tracks = await getFilteredLibrary(accessToken, minLength, maxLength);

  if (tracks.length == 0) {
    throw Error("No tracks in given range found.");
  }

  // FETCH STEP 2: Create a new empty playlist
  const playlistID = await createPlaylist(accessToken, userID);

  // FETCH STEP 3: Add the songs to the new playlist
  await populatePlaylist(accessToken, playlistID, tracks);

  const tracksJSX = tracks.map((track) => {
    return (
      <p key={track.uri}>
        {track.title} - {track.artist_names[0]} - {track.album_name} - {track.uri}
      </p>
    );
  });

  return <> {tracksJSX} </>;
}

export default Page;

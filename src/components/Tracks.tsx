import { getFilteredLibrary } from "@/helpers/library";
import { createPlaylist, populatePlaylist } from "@/helpers/playlist";
import jwt from "jsonwebtoken";

async function Tracks({
  accessTokenJWT,
  userID,
  minLength,
  maxLength,
}: {
  accessTokenJWT: string;
  userID: string;
  minLength: number;
  maxLength: number;
}) {
  let accessToken;

  try {
    // Verify (decode) the accessToken using the secret key
    accessToken = jwt.verify(accessTokenJWT, process.env.JWT_SECRET) as string;
  } catch (error) {
    return <>Error: Could not verfiy accessTokenJWT</>;
  }

  const tracks = await getFilteredLibrary(accessToken, minLength, maxLength);

  if (tracks.length == 0) {
    throw Error("No tracks in given range found.");
  }

  const playlistID = await createPlaylist(accessToken, userID);

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

export default Tracks;

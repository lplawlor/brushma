import { SimplifiedTrack, getFilteredLibrary } from "@/helpers/library";
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

  let tracks;

  try {
    tracks = await getFilteredLibrary(accessToken, minLength, maxLength);
  } catch (error) {
    return <>Error: Could not filter library</>;
  }

  let playlistID;

  try {
    playlistID = await createPlaylist(accessToken, userID);
  } catch (error) {
    return <>Error: Could not create new playlist</>;
  }

  try {
    await populatePlaylist(accessToken, playlistID, tracks);
  } catch (error) {
    return <>Error: Could not populate playlist</>;
  }

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

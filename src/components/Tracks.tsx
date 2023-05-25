import { SimplifiedTrack, getFilteredLibrary } from "@/helpers/library";
import jwt from "jsonwebtoken";

async function Tracks({
  accessTokenJWT,
  minLength,
  maxLength,
}: {
  accessTokenJWT: string;
  minLength: number;
  maxLength: number;
}) {
  if (accessTokenJWT == null) {
    return <>Error: accessCodeJWT is Null</>;
  }

  let accessToken;

  try {
    // Verify (decode) the accessToken using the secret key
    accessToken = jwt.verify(accessTokenJWT, process.env.JWT_SECRET) as string;
  } catch (error) {
    return <>Error: Could not verfiy accessTokenJWT</>;
  }

  let tracks;

  try {
    tracks = (await getFilteredLibrary(accessToken, minLength, maxLength)) as SimplifiedTrack[];
  } catch (error) {
    return <>Error: Could not filter library</>;
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

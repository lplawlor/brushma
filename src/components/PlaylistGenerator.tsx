import Tracks from "@/components/Tracks";

function PlaylistGenerator({ accessTokenJWT }: { accessTokenJWT: string }) {
  return (
    /*  @ts-expect-error Async Server Component */
    <Tracks
      accessTokenJWT={accessTokenJWT}
      minLength={120000}
      maxLength={135000}
    />
  );
}

export default PlaylistGenerator;

import { User } from "@/helpers/user";
import UserInfo from "@/components/UserInfo";
import Tracks from "@/components/Tracks";

function PlaylistGenerator({
  accessTokenJWT,
  user,
}: {
  accessTokenJWT: string;
  user: User;
}) {
  return (
    <>
      {/*  @ts-expect-error Async Server Component */}
      <UserInfo user={user} />
      {/*  @ts-expect-error Async Server Component */}
      <Tracks
        accessTokenJWT={accessTokenJWT}
        minLength={120000}
        maxLength={135000}
      />
    </>
  );
}

export default PlaylistGenerator;

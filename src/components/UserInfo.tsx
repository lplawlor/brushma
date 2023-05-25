import { User, getUserInfo } from "@/helpers/user";
import jwt from "jsonwebtoken";

async function UserInfo({ accessTokenJWT }: { accessTokenJWT: string }) {
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

  let user;

  try {
    user = (await getUserInfo(accessToken)) as User;
  } catch (error) {
    return <>Error: Could not fetch user info</>;
  }

  return (
    <>
      <p>Logged in as {user.display_name}</p>
      {/* <Image src={user.images[0].url} alt="Profile picture" height={500} /> */}
      <p>URI: {user.uri}</p>
    </>
  );
}

export default UserInfo;

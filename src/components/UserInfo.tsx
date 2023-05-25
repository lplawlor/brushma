import Image from "next/image";
import { User, getUserInfo } from "@/helpers/user";
import jwt from "jsonwebtoken";
import DefaultProfilePic from "@/assets/profile_pic.png";

async function UserInfo({ accessTokenJWT }: { accessTokenJWT: string }) {
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
      <Image
        src={user.image_url == null ? DefaultProfilePic : user.image_url}
        alt="Profile picture"
        height={100}
        width={100}
      />
      <p>URI: {user.uri}</p>
    </>
  );
}

export default UserInfo;

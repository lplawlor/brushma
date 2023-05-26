import Image from "next/image";
import { User } from "@/helpers/user";
import DefaultProfilePic from "@/assets/profile_pic.png";

async function UserInfo({user}: { user: User}) {
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

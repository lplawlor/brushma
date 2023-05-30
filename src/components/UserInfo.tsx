import Image from "next/image";
import { User } from "@/helpers/user";

async function UserInfo({ user }: { user: User }) {
  const imageElement =
    user.image_url == null ? null : (
      <Image
        src={user.image_url}
        alt="Profile picture"
        height={100}
        width={100}
        className="mt-4 rounded-full"
      />
    );

  return (
    <div className="m-4 flex flex-col items-center justify-center text-center text-3xl font-light">
      <p>Signed in as {user.display_name}</p>
      {imageElement}
    </div>
  );
}

export default UserInfo;

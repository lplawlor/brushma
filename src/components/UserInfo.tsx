import Image from "next/image";
import { User } from "@/helpers/user";

async function UserInfo({ user }: { user: User }) {
  const imageElement =
    user.image_url == null ? null : (
      <div className="mt-4 flex h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-full">
        <Image
          src={user.image_url}
          alt="Profile picture"
          height={128} // h-32 and w-32 correspond to 128px
          width={128}
          className="object-cover"
        />
      </div>
    );

  return (
    <div className="m-4 flex flex-col items-center justify-center text-center text-2xl md:text-3xl font-light">
      <p>Signed in as {user.display_name}</p>
      {imageElement}
    </div>
  );
}

export default UserInfo;

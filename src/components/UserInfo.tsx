/**
 * Component containing information about the given User and a button to Sign Out.
 */
import Image from "next/image";
import { User } from "next-auth";
import * as actions from "@/actions";
import PrimaryButton from "@/components/PrimaryButton";

export default function UserInfo({ user }: { user: User }) {
  return (
    <div className="m-4 flex flex-col items-center justify-center text-center text-2xl md:text-3xl font-light">
      <p>Signed in as {user.name}</p>
      {
        user.image ?
          <div className="mt-4 flex h-24 w-24 md:h-32 md:w-32 overflow-hidden rounded-full">
            <Image
              src={user.image}
              alt="Profile picture"
              height={128} // h-32 and w-32 correspond to 128px
              width={128}
              className="object-cover"
            />
          </div>
          : null
      }
      <form action={actions.signOut}>
        <PrimaryButton type="submit">Sign Out</PrimaryButton>
      </form>
    </div>
  );
}

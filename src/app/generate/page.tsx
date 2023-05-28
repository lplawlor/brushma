import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Tracks from "@/components/Tracks";
import { User } from "@/helpers/user";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");
  const userCookie = cookieStore.get("user");

  // If the user is logged not in, redirect them
  if (!accessTokenJWTCookie || !userCookie) {
    redirect("/");
  }

  if (!searchParams.minLength || !searchParams.maxLength) {
    throw Error("Query parameters 'minLength' and/or 'maxLength' missing.")
  }

  const minLength = parseInt(searchParams.minLength);
  const maxLength = parseInt(searchParams.maxLength);

  if (isNaN(minLength) || isNaN(maxLength)) {
    throw Error("Could not parse query parameters 'minLength' and/or 'maxLength' as integers.");
  }

  if (minLength > maxLength) {
    throw Error("Query parameters 'minLength' and 'maxLength' must be equal.");
  }

  const userID = (JSON.parse(userCookie.value) as User).id;

  return (
    <>
      {/*  @ts-expect-error Async Server Component */}
      <Tracks accessTokenJWT={accessTokenJWTCookie.value} userID={userID} minLength={minLength} maxLength={maxLength} />
    </>
  );
}

export default Page;

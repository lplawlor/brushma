import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SignInWithSpotify from "@/components/SignInWithSpotify";

async function Page() {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");
  const userCookie = cookieStore.get("user");

  // If the user is logged in, redirect them
  if (accessTokenJWTCookie && userCookie) {
    redirect("/in");
  }

  return (
    <>
      <SignInWithSpotify />
    </>
  );
}

export default Page;

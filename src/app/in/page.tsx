import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import SettingsForm from "@/components/SettingsForm";
import UserInfo from "@/components/UserInfo";

async function Page() {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");
  const userCookie = cookieStore.get("user");

  // If the user is logged not in, redirect them
  if (!accessTokenJWTCookie || !userCookie) {
    redirect("/");
  }

  return (
    <>
      {/*  @ts-expect-error Async Server Component */}
      <UserInfo user={JSON.parse(userCookie.value)} />
      <SettingsForm />
    </>
  );
}

export default Page;

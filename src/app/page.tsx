import { cookies } from "next/headers";
import Home from "@/components/Home";
import PlaylistGenerator from "@/components/PlaylistGenerator";

async function Page() {
  const cookieStore = cookies();
  const accessTokenJWTCookie = cookieStore.get("accessTokenJWT");
  const userCookie = cookieStore.get("user");

  if (!accessTokenJWTCookie || !userCookie) {
    return <Home />;
  }

  return (
    <PlaylistGenerator
      accessTokenJWT={accessTokenJWTCookie.value}
      user={JSON.parse(userCookie.value)}
    />
  );
}

export default Page;

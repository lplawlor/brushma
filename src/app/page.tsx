import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";
import SignInWithSpotify from "@/components/SignInWithSpotify";
import logo from "@/assets/logo.svg";
import Footer from "@/components/Footer";

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
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Image src={logo} alt="Brushma Logo" className="m-6 w-3/4 md:w-[40rem] lg:w-[50rem]" />
        <p className="mx-10 text-lg md:text-xl lg:text-2xl">
          Create a tooth-brushing playlist from your favorite songs!
        </p>
        <SignInWithSpotify />
      </div>
      <Footer />
    </>
  );
}

export default Page;

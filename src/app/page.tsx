/**
 * Homepage containing the logo, tagline and a link to sign in with Spotify.
 */
import Image from "next/image";
import { redirect } from "next/navigation";
import * as actions from "@/actions";
import logo from "@/assets/logo.svg";
import { auth } from "@/auth";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";

export default async function Home() {
  const session = await auth();

  // Redirect logged-in users to the /in page
  if (session?.user) {
    redirect("/in");
  }

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <Image src={logo} alt="Brushma Logo" className="m-6 w-3/4 md:w-[40rem] lg:w-[50rem]" />
        <p className="mx-10 text-lg md:text-xl lg:text-2xl">
          Create a tooth-brushing playlist from your favorite songs!
        </p>
        <p className="mt-6 mx-10 text-lg md:text-xl lg:text-2xl text-red-500 font-bold">
          Brushma is currently in Development Mode, and will not work unless you are an authorized user.
        </p>
        <form action={actions.signIn}>
          <PrimaryButton type="submit">Sign In</PrimaryButton>
        </form>
      </div>
      <Footer />
    </>
  );
}

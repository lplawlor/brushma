/**
 * Post-generation page linking to the new playlist.
 *
 * No slug validation is performed, so really any playlist can be linked to.
 */
import Image from "next/image";
import { Link } from "@nextui-org/react";
import icon from "@/assets/icon.svg"
import spotify from "@/assets/spotify.png";
import Footer from "@/components/Footer";
import PrimaryButton from "@/components/PrimaryButton";
import SignOut from "@/components/SignOut";

export default function Playlist({ params }: { params: { slug: string } }) {
  const playlistLink = "https://open.spotify.com/playlist/" + params.slug;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image src={icon} alt="Brushma Icon" className="m-6 w-28 md:w-36" />
        <p className="text-xl md:text-2xl">Your Brushma playlist is ready!</p>
        <PrimaryButton
          href={playlistLink}
          as={Link}
          target="_blank"
        >
          View on <Image height={38} src={spotify} alt="Spotify"/>
        </PrimaryButton>
        <SignOut />
      </div>
      <Footer />
    </>
  );
}

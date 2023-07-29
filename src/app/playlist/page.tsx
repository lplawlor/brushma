import Image from "next/image";
import icon from "@/assets/icon.svg"
import Footer from "@/components/Footer";

async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams.id) {
    throw Error("Query parameter 'id' missing.");
  }

  const playlistLink = "https://open.spotify.com/playlist/" + searchParams.id;

  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center">
        <Image src={icon} alt="Brushma Icon" className="m-6" />
        <p className="text-2xl">Your Brushma playlist is ready!</p>
        <a
          className="btn-primary"
          href={playlistLink}
          target="_blank"
        >
          View on Spotify
        </a>
      </div>
      <Footer />
    </>
  );
}

export default Page;

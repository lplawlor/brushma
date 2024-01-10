/**
 * Header present across the application with links to my website and the GitHub repo.
 */
import Image from "next/image";
import Link from "next/link";
import github_icon from "@/assets/github_icon.svg";

export default function Header() {
  return (
    <header className="w-screen top-0 p-6 flex flex-row items-center text-md md:text-lg">
      <p className="mr-3">
        Made by Liam Lawlor (
        <Link
          href="https://www.lplawlor.com/"
          target="_blank"
          className="text-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          lplawlor.com
        </Link>
        )
      </p>

      <Link
        href="https://github.com/lplawlor/brushma"
        target="_blank"
        className="ml-auto flex flex-row items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        <p className="text-right">View on GitHub</p>
        <Image src={github_icon} alt="GitHub Icon" className="ml-2 h-7 w-7" />
      </Link>
    </header>
  );
}

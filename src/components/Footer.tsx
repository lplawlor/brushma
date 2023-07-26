import Image from "next/image";
import github_icon from "@/assets/github_icon.svg";

function Footer() {
  return (
    <footer className="bottom-0 p-6">
      <div className="flex flex-row items-start text-base">
        <p>
          Made by Liam Lawlor (
          <a
            href="https://www.lplawlor.com/"
            target="_blank"
            className="text-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            lplawlor.com
          </a>
          )
        </p>

        <a
          href="https://github.com/lplawlor/brushma"
          target="_blank"
          className="ml-auto flex flex-row items-center justify-center focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          <p>View on GitHub</p>
          <Image src={github_icon} alt="GitHub Icon" className="ml-2 h-7 w-7" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

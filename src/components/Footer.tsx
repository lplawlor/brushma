import Image from "next/image";
import github_icon from "@/assets/github_icon.svg";

function Footer() {
  return (
    <footer className="bottom-0 mx-6 mb-6">
      <hr className="mb-6 h-px border-0 bg-gray-200" />
      <div className="flex flex-row items-start text-base">
        <p>
          Made by Liam Lawlor (
          <a
            href="https://www.lplawlor.com/"
            target="_blank"
            className="text-red-400"
          >
            lplawlor.com
          </a>
          )
        </p>

        <a
          href="https://github.com/lplawlor/brushma"
          target="_blank"
          className="ml-auto flex flex-row items-center justify-center"
        >
          <p>View on GitHub</p>
          <Image src={github_icon} alt="GitHub Icon" className="ml-2 h-7 w-7" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

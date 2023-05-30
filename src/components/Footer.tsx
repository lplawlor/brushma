import Image from "next/image";
import github_icon from "@/assets/github_icon.svg";

function Footer() {
  return (
    <footer className="bottom-0 mx-6 mb-6">
      <hr className="mb-6 h-px border-0 bg-gray-200" />
      <div className="flex flex-row text-base font-light items-start">
        <p>
          Made by Liam Lawlor (
          <a href="https://www.lplawlor.com/" className="text-red-400">
            lplawlor.com
          </a>
          )
        </p>

        <a className="items-center ml-auto flex flex-row justify-center" href="https://github.com/lplawlor/brushma">
          <p>View on GitHub</p>
          <Image src={github_icon} alt="GitHub Icon" className="h-7 w-7 ml-1" />
        </a>
      </div>
    </footer>
  );
}

export default Footer;

/**
 * 404 page containing a link back to the homepage.
 */
import { Link } from "@nextui-org/react";
import PrimaryButton from "@/components/PrimaryButton";

export default function NotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center mx-10 text-center">
      <p className="text-3xl md:text-4xl mb-4">Not Found.</p>
      <p className="text-lg md:text-xl font-light">Could not find the requested resource.</p>
      <PrimaryButton
        as={Link}
        href="/"
      >
        Return to Home
      </PrimaryButton>
    </div>
  );
}

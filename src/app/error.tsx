"use client";

import { useEffect } from "react";

function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <p className="text-4xl mb-6">Uh-oh.</p>
      <p className="text-xl font-light">Something went wrong. See the developer console for more info.</p>
      <a
        className="m-6 rounded-full border-2 border-red-400 bg-transparent px-5 py-2.5 text-center text-xl font-medium text-red-400 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
        href="/"
      >
        Return to Home
      </a>
    </div>
  );
}

export default Error;

"use client";

import { useEffect } from "react";

function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center mx-10 text-center">
      <p className="text-3xl md:text-4xl mb-4">Uh-oh.</p>
      <p className="text-lg md:text-xl font-light">Something went wrong.</p>
      <p className="text-lg md:text-xl font-light">See the developer console for more info.</p>
      <a
        className="btn-primary"
        href="/"
      >
        Return to Home
      </a>
    </div>
  );
}

export default Error;

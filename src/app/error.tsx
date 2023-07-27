"use client";

import { useEffect } from "react";

function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <a href="/">Return to homepage</a>
    </div>
  );
}

export default Error;

"use client";

// import Image from "next/image";
import { useEffect, useState } from "react";

// interface ImageObject {
//   url: string;
//   height: null | number;
//   width: null | number;
// }

interface User {
  display_name: string;
  id: string;
  // images: [ImageObject];
  uri: string;
}

function UserInfo({ accessTokenJWT }: { accessTokenJWT: string }) {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    async function fetchToken(accessTokenJWT: string) {
      const response = await fetch(
        process.env.NEXT_PUBLIC_CANONICAL_URL +
          "/api/user/?accessTokenJWT=" +
          accessTokenJWT,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        return "/?error=spotify-error-" + response.status;
      }

      setUser(await response.json());
    }

    fetchToken(accessTokenJWT);
  }, [accessTokenJWT]);

  if (!user) {
    return <>Fetching User Info...</>;
  }

  return (
    <>
      <p>Logged in as {user.display_name}</p>
      {/* <Image src={user.images[0].url} alt="Profile picture" height={500} /> */}
      <p>URI: {user.uri}</p>
    </>
  );
}

export default UserInfo;

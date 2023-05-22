"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

function SpotifyRedirectHandler({
  returnState,
  returnCode,
}: {
  returnState: string;
  returnCode: string;
}) {
  const [redirectPath, setRedirectPath] = useState("");
  const universalCookies = new Cookies();
  const codeVerifier = universalCookies.get("codeVerifier");
  const state = universalCookies.get("state");

  useEffect(() => {
    if (!state) {
      setRedirectPath("/?error=state-not-found");
    }

    if (!codeVerifier) {
      setRedirectPath("/?error=verifier-not-found");
    }

    // If the states do not match
    if (returnState != state) {
      setRedirectPath("/?error=states-do-not-match");
    }

    async function fetchToken(code: string, codeVerifier: string) {
      const body = JSON.stringify({
        code: code,
        codeVerifier: codeVerifier,
      });

      const response = await fetch(
        process.env.NEXT_PUBLIC_CANONICAL_URL + "/api/token",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
          body: body,
        }
      );

      if (!response.ok) {
        return "/?error=spotify-error" + response.status;
      }

      const universalCookies = new Cookies();

      universalCookies.set("accessTokenJWT", await response.text());

      return "/";
    }

    fetchToken(returnCode, codeVerifier).then((returnedPath) => {
      setRedirectPath(returnedPath);
    });
  }, [returnState, returnCode, state, codeVerifier]);

  if (!redirectPath) {
    return <>Loading...</>;
  }

  redirect(redirectPath);
}

export default SpotifyRedirectHandler;

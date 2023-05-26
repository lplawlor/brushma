"use client";

import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { fetchAccessTokenJWT } from "@/helpers/authorization";
import { fetchUser } from "@/helpers/user";

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

    fetchAccessTokenJWT(returnCode, codeVerifier)
      .then(fetchUser)
      .then(() => {
        setRedirectPath("/");
      })
      .catch(() => {
        setRedirectPath("/?error=fetch-error");
      });
  }, [returnState, returnCode, state, codeVerifier]);

  if (!redirectPath) {
    return <>Fetching Access Token...</>;
  }

  redirect(redirectPath);
}

export default SpotifyRedirectHandler;

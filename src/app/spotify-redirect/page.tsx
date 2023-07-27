"use client";

import { useEffect, useState } from "react";
import { redirect, useSearchParams } from "next/navigation";
import Cookies from "universal-cookie";
import { fetchAccessTokenJWT } from "@/helpers/authorization";
import { fetchUser } from "@/helpers/user";
import LoadingPage from "@/components/LoadingPage";

function Page() {
  const searchParams = useSearchParams();
  const [complete, setComplete] = useState(false);
  const universalCookies = new Cookies();
  const codeVerifier = universalCookies.get("codeVerifier");
  const state = universalCookies.get("state");

  useEffect(() => {
    // If the following aren't present, this is not a valid redirect
    // from Spotify, or the user did not give authorization
    if (!searchParams.get("state") || !searchParams.get("code")) {
      throw Error("Query parameters 'state' and/or 'code' missing.")
    }

    if (searchParams.get("state") != state) {
      throw Error("States do not match.")
    }

    fetchAccessTokenJWT(searchParams.get("code") as string, codeVerifier)
      .then(fetchUser)
      .then(() => {
        setComplete(true);
      })
  }, [searchParams, state, codeVerifier]);

  if (complete) {
    redirect("/in");
  }
  
  return <LoadingPage lines={["Signing in..."]}/>;
}

export default Page;

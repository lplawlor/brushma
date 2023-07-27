"use client";

import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import Cookies from "universal-cookie";
import { fetchAccessTokenJWT } from "@/helpers/authorization";
import { fetchUser } from "@/helpers/user";
import LoadingPage from "@/components/LoadingPage";

function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const [complete, setComplete] = useState(false);
  const universalCookies = new Cookies();
  const codeVerifier = universalCookies.get("codeVerifier");
  const state = universalCookies.get("state");

  useEffect(() => {
    // If the following aren't present, this is not a valid redirect
    // from Spotify, or the user did not give authorization
    if (!searchParams.state || !searchParams.code) {
      throw Error("Query parameters 'state' and/or 'code' missing.")
    }

    if (searchParams.state != state) {
      throw Error("States do not match.")
    }

    fetchAccessTokenJWT(searchParams.code, codeVerifier)
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

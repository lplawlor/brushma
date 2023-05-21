import Login from "@/components/Login";
import { cookies } from "next/headers";

async function Page({
  searchParams,
}: {
  searchParams?: { [key: string]: string | undefined };
}) {
  const cookieStore = cookies();
  const authToken = cookieStore.get("authToken");
  const codeVerifier = cookieStore.get("codeVerifier");
  const state = cookieStore.get("state");

  // If this is a redirect from the Spotify Authentication page
  if (searchParams && searchParams.code && searchParams.state) {
    // If the codeVerifier or the state were not stored as cookies
    if (!state || !codeVerifier) {
      return <>Error: state or codeVerifier not found in cookies</>;
    }

    // If the states do not match
    if (searchParams.state != state.value) {
      return <>Error: States do not match. Potential cross-site forgery</>;
    }

    const body = JSON.stringify({
      code: searchParams.code,
      codeVerifier: codeVerifier.value,
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
      return <>Error: {response.status} - {response.statusText}</>;
    }

    return <>{JSON.stringify(await response.json())}</>;
  }

  if (!authToken) {
    return <Login />;
  }

  return <>Logged In</>;
}

export default Page;

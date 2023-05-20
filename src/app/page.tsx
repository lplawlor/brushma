"use client";

import { getSession, signIn, signOut, useSession } from "next-auth/react";
// import authOptions from "./api/auth/[...nextauth]/authOptions";

async function Page() {
  const { data: session, status } = useSession();
  // const session = await getSession();

  let view;

  if (status === "authenticated") {
  // if (session) {
    view = (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  } else {
    view = (
      <>
        Not signed in <br />
        <button onClick={() => signIn("spotify")}>Sign In</button>
      </>
    );
  }

  return <>{view}</>;
}

export default Page;

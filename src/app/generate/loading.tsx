"use client";

import LoadingPage from "@/components/LoadingPage";

function Loading() {
  return <LoadingPage lines={["Generating Playlist...", "This could take a few minutes."]}/>;
}

export default Loading;

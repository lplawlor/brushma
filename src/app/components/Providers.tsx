"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import type { Session } from "next-auth";

interface ProvidersProps {
  children: React.ReactNode;
  session: Session | null;
}

function Providers({ session, children }: ProvidersProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default Providers;

import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Favicon from "@/components/Favicon";
import Background from "@/components/Background";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Brushma",
  description: "WIP Spotify Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body
        className={inter.className + " flex min-h-screen flex-col antialiased"}
      >
        <Background />
        <Header />
        <div className="flex flex-1 flex-col">{children}</div>
      </body>
    </html>
  );
}

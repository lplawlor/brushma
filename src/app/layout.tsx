/**
 * Root layout for the entire site.
 */
import { Inter } from "next/font/google"
import Background from "@/components/Background";
import Favicon from "@/components/Favicon";
import Header from "@/components/Header";
import "./globals.css"
import Providers from "./providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Brushma",
  description: "Web app for creating a tooth-brushing playlist using the Spotify API."
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Favicon />
      </head>
      <body className={"light " + inter.className}>
        <Providers>
          <div className="flex flex-col min-h-screen antialiased drop-shadow-md">
            <Background />
            <Header />
            <div className="flex flex-1 flex-col">{children}</div>
          </div>
        </Providers>
      </body>
    </html>
  )
}

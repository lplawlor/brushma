import { Inter } from 'next/font/google'
import "@/styles/globals.css";

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

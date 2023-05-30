import { Inter } from 'next/font/google'
import "@/styles/globals.css";
import Favicon from '@/components/Favicon';

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
      <head>
        <Favicon />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

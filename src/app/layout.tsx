import { getServerSession } from "next-auth";
import authOptions from "./api/auth/[...nextauth]/authOptions";
import Providers from "./components/Providers";

export const metadata = {
  title: "Brushma",
  description: "WIP Spotify Application",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <Providers session={session}>
          {children}
        </Providers>
      </body>
    </html>
  );
}

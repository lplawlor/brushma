import SpotifyProvider from "next-auth/providers/spotify";

const authOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID as string,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET as string,
      authorization: {
        params: { scope: "playlist-read-private playlist-modify-private" },
      },
    }),
  ],
};

export default authOptions;

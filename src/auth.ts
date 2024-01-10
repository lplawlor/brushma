/**
 * Custom NextAuth configuration needed to access the User's Spotify ID and API access token.
 */
import NextAuth from "next-auth";
import Spotify from "next-auth/providers/spotify";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_ID;

if (!SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
  throw new Error("Missing Spotify OAuth credentials in .env.local");
}

export const { handlers: { GET, POST }, auth, signIn, signOut } = NextAuth({
  providers: [
    Spotify({
      clientId: SPOTIFY_CLIENT_ID,
      clientSecret: SPOTIFY_CLIENT_SECRET,
      // Override the default scope, since we don't need to read the User's email,
      // but do need to be able to read their library and create playlists
      authorization: "https://accounts.spotify.com/authorize?scope=playlist-modify-private+user-library-read"
    }),
  ],

  // Modified from https://stackoverflow.com/a/75952137/20310376
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // Provide the User's API Access Token and Spotify-ID along with the usual stuff
        token = Object.assign(token, { access_token: account.access_token, id: account.providerAccountId });
      }
      return token;
    },
    async session({ session, token }) {
      if (session) {
        // Provide the API access token as an attribute of 'session'
        session = Object.assign(session, { access_token: token.access_token });

        // Provide the User's Spotify ID as an attribute of 'session.user'
        session.user = Object.assign({}, session.user, { id: token.id });
      }

      return session;
    }
  }
});

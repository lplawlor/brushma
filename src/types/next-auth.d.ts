/**
 * Overrides to the NextAuth types, needed to access the Spotify API access token.
 */
import NextAuth from "next-auth";

declare module "next-auth" {
  // Extend the Session interface to include the access_token, reflecting the modified callbacks in @/auth.ts
  interface Session {
    access_token: string;
  }
}
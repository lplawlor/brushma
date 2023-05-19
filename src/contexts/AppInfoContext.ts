import { createContext } from "react";

// This context does should not need a provider, as the values will never change from their defaults
export const AppInfoContext = createContext({
  clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
  redirectURI: import.meta.env.VITE_REDIRECT_URI,
  scope: "playlist-read-private playlist-modify-private",
});

export default AppInfoContext;
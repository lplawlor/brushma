import { createContext } from "react";

// This context does should not need a provider, as the values will never change from their defaults
export const AppInfoContext = createContext({
  clientId: "7fdcd3390cbb4e77bb3f64b2a998f0c8",
  redirectURI: "http://localhost:5173/",
  scope: "playlist-read-private playlist-modify-private",
});

export default AppInfoContext;
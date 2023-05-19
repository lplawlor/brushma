import { useEffect, useContext } from "react";
import AppInfoContext from "../contexts/AppInfoContext";

type RequestAccessTokenArgs = {
  code: string;
  codeVerifier: string;
};

function RequestAccessToken({ code, codeVerifier }: RequestAccessTokenArgs) {
  const appInfo = useContext(AppInfoContext);

  useEffect(() => {
    async function fetchAccessToken() {
      const body = new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: appInfo.redirectURI,
        client_id: appInfo.clientId,
        code_verifier: codeVerifier,
      });
      
      // This request generates an error, seemingly due to CORS
      const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body,
      });

      if (!response.ok) {
        console.error("Error: ", response.status);
      } else {
        const responseJSON = await response.json();
        localStorage.setItem("accessToken", responseJSON.access_token);
      }
    }

    console.log("Make API request");
    fetchAccessToken().catch(console.error);

    // The above request doesn't actually cause a redirect (despite needing the redirect_uri param)
    // So we will redirect now
    // For info on why (window as Window) is used, see:
    // https://github.com/microsoft/TypeScript/issues/48949#issuecomment-1203967132
    (window as Window).location = appInfo.redirectURI;

  }, [appInfo, code, codeVerifier]);

  return (
    <>
      <div>Fetching access token</div>
    </>
  );
}

export default RequestAccessToken;

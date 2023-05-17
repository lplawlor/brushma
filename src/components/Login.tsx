import { useContext } from "react";
import AppInfoContext from "../contexts/AppInfoContext";
import { requestUserAuth } from "../helpers/authentication";

function Login() {
  const appInfo = useContext(AppInfoContext);
  return (
    <button
      onClick={() =>
        requestUserAuth(appInfo.clientId, appInfo.scope, appInfo.redirectURI)
      }
    >
      Authorize
    </button>
  );
}

export default Login;

import { useContext } from "react";
import AppInfoContext from "../contexts/AppInfoContext";
import { requestUserAuthorization } from "../helpers/authentication";

function Login() {
  const appInfo = useContext(AppInfoContext);
  return (
    <button
      onClick={() =>
        requestUserAuthorization(appInfo.clientId, appInfo.scope, appInfo.redirectURI)
      }
    >
      Authorize
    </button>
  );
}

export default Login;

import Login from "./components/Login";
import { useCookies } from "react-cookie";
// import RequestAccessToken from "./components/RequestAccessToken";

function App() {
  let view;
  const [cookies] = useCookies([
    "accessToken",
    "codeVerifier",
    "state",
  ]);

  if (cookies.accessToken !== undefined) {
    // User logged in
    view = (
      <>
        <div>Logged in</div>
      </>
    );
  } else {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code === null) {
      // User not logged in, not redirected from Spotify user authorization
      view = (
        <>
          <Login />
        </>
      );
    } else if (state !== cookies.state) {
      // State incorrect, potential cross-site forgery
      view = (
        <>
          <div>Error: States do not match.</div>
        </>
      );
    } else {
      const codeVerifier = cookies.codeVerifier;

      if (codeVerifier === undefined) {
        // codeVerifier not stored, likely a bug in Login component
        view = (
          <>
            <div>Error: codeVerifier not saved in localStorage.</div>
          </>
        );
      } else {
        view = (
          <>
            <h1>Code</h1>
            <div>{code}</div>
            <h1>Code Verifier</h1>
            <div>{codeVerifier}</div>
            {/* <RequestAccessToken code={code} codeVerifier={codeVerifier} /> */}
          </>
        );
      }
    }
  }

  return <>{view}</>;
}

export default App;

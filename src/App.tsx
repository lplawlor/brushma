import Login from "./components/Login";
import RequestAccessToken from "./components/RequestAccessToken";
function App() {
  let view;

  if (localStorage.getItem("accessToken") !== null) {
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
    } else if (state != localStorage.getItem("state")) {
      // State incorrect, potential cross-site forgery
      view = (
        <>
          <div>Error: States do not match.</div>
        </>
      );
    } else {
      const codeVerifier = localStorage.getItem("codeVerifier");

      if (codeVerifier == null) {
        // codeVerifier not stored, likely a bug in Login component
        view = (
          <>
            <div>Error: codeVerifier not saved in localStorage.</div>
          </>
        );
      } else {
        view = (
          <>
            <RequestAccessToken code={code} codeVerifier={codeVerifier} />
          </>
        );
      }
    }
  }

  return <>{view}</>;
}

export default App;

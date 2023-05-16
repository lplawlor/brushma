import {
  randomAlphanumString,
  generateCodeChallenge,
} from "../helpers/authentication";

const clientId = "7fdcd3390cbb4e77bb3f64b2a998f0c8";
const scope = "playlist-read-private playlist-modify-private";
const redirectUri = "http://localhost:5173/";

async function authenticate() {
  const codeVerifier = randomAlphanumString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = randomAlphanumString(16);

  localStorage.setItem("code-verifier", codeVerifier);

  const args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectUri,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  window.location = "https://accounts.spotify.com/authorize?" + args;
}

function Login() {
  return <button onClick={authenticate}>Authorize</button>;
}

export default Login;

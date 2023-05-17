// Taken from https://stackblitz.com/edit/typescript-sha256-base64-encoded-4sbjzv?file=index.ts
// and https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
function randomAlphanumString(length: number) {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

function sha256(message: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  return window.crypto.subtle.digest("SHA-256", data);
}

function urlEncodeBase64(input: string) {
  return input.replace("+", "-").replace("/", "_").replace("=", " ");
}

function bufferToBase64UrlEncoded(input: ArrayBuffer) {
  const bytes = new Uint8Array(input);
  return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)));
}

async function generateCodeChallenge(codeVerifier: string) {
  const shaBuffer = await sha256(codeVerifier);

  return bufferToBase64UrlEncoded(shaBuffer);
}

export async function requestUserAuth(clientId: string, scope: string, redirectURI: string) {
  const codeVerifier = randomAlphanumString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = randomAlphanumString(16);

  localStorage.setItem("codeVerifier", codeVerifier);
  localStorage.setItem("state", state);

  const args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectURI,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  // For info on why (window as Window) is used, see:
  // https://github.com/microsoft/TypeScript/issues/48949#issuecomment-1203967132
  (window as Window).location = ("https://accounts.spotify.com/authorize?" + args);
}

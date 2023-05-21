/**
 * A set of client-side functions used for authentication via the Spotify API.
 *
 * These functions are mostly adapted from the following:
 *  - https://stackblitz.com/edit/typescript-sha256-base64-encoded-4sbjzv?file=index.ts
 *  - https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 */
import Cookies from "universal-cookie";

/**
 * Generate an random string of given length, consisting of A-Z, a-z and 0-9.
 * @param length number of characters in the return string
 * @returns alphanumeric string
 */
function randomAlphanumString(length: number): string {
  let text = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

/**
 * Digest the given string using the SHA-256 algorithm.
 *
 * @param input arbitrarily large string to be digested
 * @returns ArrayBuffer digest as returned by the SubtleCrypto.digest() method
 */
async function sha256(input: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  return window.crypto.subtle.digest("SHA-256", data);
}

/**
 * Transform a Base 64-encoded string into one which can be used in URLs.
 * This is done by replacing '+', '/' and '=' with '-', '_' and ' ' respectively
 *
 * @param input Base 64 string to be encoded
 * @returns URL-safe base64 string
 */
function urlEncodeBase64(input: string): string {
  return input.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/**
 * Convert a buffer of binary data to a URL-safe Base 64 string.
 *
 * @param input ArrayBuffer of binary data
 * @returns URL-safe Base64 string
 */
function bufferToBase64UrlEncoded(input: ArrayBuffer): string {
  const bytes = new Uint8Array(input);
  return urlEncodeBase64(window.btoa(String.fromCharCode(...bytes)));
}

/**
 * Digest the code verifier using SHA-256 and return the result as a URL-safe Base 64 string.
 *
 * @param codeVerifier string to be digested
 * @returns result of SHA-256 digest, encoded as a URL-safe Base 64 string
 */
async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const shaBuffer = await sha256(codeVerifier);
  return bufferToBase64UrlEncoded(shaBuffer);
}

/**
 * Redirect the user to the Spotify authorization page for granting permissions.
 * This is the first step of the 'Authorization Code with PKCE Flow' process.
 * See: https://developer.spotify.com/documentation/web-api/tutorials/code-pkce-flow
 *
 * @param clientId Client ID of Spotify application
 * @param scope scope of permissions needed by the application
 *              see: https://developer.spotify.com/documentation/web-api/concepts/scopes
 * @param redirectURI URI that the user should be redirected to after authorization
 *                    This URI must be set in the Spotify for Developers application settings
 */
export async function requestUserAuthorization(
  clientId: string,
  scope: string,
  redirectURI: string
): Promise<void> {
  const codeVerifier = randomAlphanumString(128);
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = randomAlphanumString(16);

  // Store the codeVerifier and state as cookies, as we will need them after the redirect
  const cookies = new Cookies();
  cookies.set("codeVerifier", codeVerifier, {
    path: "/",
  });
  cookies.set("state", state, {
    path: "/",
  });

  // Prepare the URL parameters needed to get the user's authorization
  const args = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scope,
    redirect_uri: redirectURI,
    state: state,
    code_challenge_method: "S256",
    code_challenge: codeChallenge,
  });

  // Send the user to the Spotify authorization page
  // For info on why (window as Window) is used, see:
  // https://github.com/microsoft/TypeScript/issues/48949#issuecomment-1203967132
  (window as Window).location =
    "https://accounts.spotify.com/authorize?" + args;
}

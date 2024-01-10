/**
 * Server actions used throughout the application.
 */
"use server";

import { redirect } from "next/navigation";
import * as auth from "@/auth";
import { getFilteredLibrary } from "@/helpers/library";
import { createPlaylist, populatePlaylist } from "@/helpers/playlist";

/**
 * Server-action wrapper for sign-in using Auth.js with the Spotify provider.
 */
export async function signIn(): Promise<never> {
  return auth.signIn("spotify");
}

/**
 * Server-action wrapper for sign-out using Auth.js.
 */
export async function signOut(): Promise<never> {
  return auth.signOut({ redirectTo: "/" });
}

/**
 * Server-action for filtering the User's library and generating a new playlist based on song length.
 *
 * Upon playlist creation, a redirect occurs to a page linking to the new playlist on Spotify.
 * Errors are returned as strings for use with the useFormState hook.
 *
 * @param formState Unused formState needed as the first argument because of the useFormState hook.
 * @param formData Data for a form with 2 inputs named 'time': the min and max time in seconds.
 * @returns Promise which will resolve to an error message if a redirect does not occur.
 */
export async function generatePlaylist(formState: string | null, formData: FormData): Promise<string | null> {
  let playlistID = "";

  try {
    const timeRangeStrings = (formData.getAll("time")) as [string, string];

    const [minMS, maxMS] = timeRangeStrings.map((secondString) => parseInt(secondString) * 1000);

    const session = await auth.auth();


    const token: string | undefined = session?.access_token;
    const id = session?.user?.id;

    if (!token) {
      throw Error("Spotify API access token not found.");
    }

    if (!id) {
      throw Error("User's Spotify ID not found.");
    }

    // GENERATE STEP 1: Get all the user's song in the given time range
    const tracks = await getFilteredLibrary(token, minMS, maxMS);

    if (tracks.length == 0) {
      return "No songs in this range found in your library.";
    }

    // GENERATE STEP 2: Create a new empty playlist
    playlistID = await createPlaylist(token, id);

    // GENERATE STEP 3: Add the songs to the new playlist
    await populatePlaylist(token, playlistID, tracks);
  }
  catch (err: unknown) {
    return err instanceof Error ? err.message : "Something went wrong.";
  }

  redirect("/playlist/" + playlistID);
}
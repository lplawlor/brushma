/**
 * Form containing the dual-input slider and button used to generate the playlist.
 *
 * This component is client-side to make use of the useFormState hook for error messages.
 */
"use client"

import { useFormState } from "react-dom";
import * as actions from "@/actions";
import PrimaryButton from "@/components/PrimaryButton";
import TimeSlider from "@/components/TimeSlider";

export default function GenerationForm() {
  // Use the generatePlaylist server-action wrapped by the useFormState hook to display error messages
  const [formState, action] = useFormState(actions.generatePlaylist, null);

  return (
    <form
      action={action}
      className="w-2/3 md:w-1/2 xl:w-1/3 flex flex-col items-center text-lg md:text-xl"
    >
      <TimeSlider />
      <PrimaryButton type="submit">Generate Playlist</PrimaryButton>
      {
        // Conditionally show the error message in a red <p> tag if there is an error
        formState ? <p className="mt-6 p-4 bg-red-500 rounded-lg text-white font-bold">{formState}</p> : null
      }
    </form>
  );
}
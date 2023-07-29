"use client";

import { useState } from "react";

const RANGE_MIN = 0;
const RANGE_MAX = 180000;
const RANGE_STEP = 5000;
const MIN_DEFAULT = 120000;
const MAX_DEFAULT = 135000;

function SettingsForm() {
  const [minMS, setMinMS] = useState(MIN_DEFAULT);
  const [maxMS, setMaxMS] = useState(MAX_DEFAULT);

  function handleChangeMin(event: React.ChangeEvent<HTMLInputElement>) {
    const desired = Number.parseInt(event.target.value);

    if (desired < maxMS) {
      setMinMS(desired);
    }
  }

  function handleChangeMax(event: React.ChangeEvent<HTMLInputElement>) {
    const desired = Number.parseInt(event.target.value);

    if (desired > minMS) {
      setMaxMS(desired);
    }
  }

  function milisecondstoMMSS(miliseconds: number) {
    const total_seconds = Math.floor(miliseconds / 1000);
    const minutes = Math.floor(total_seconds / 60);
    const seconds = total_seconds % 60;
    const minutesWord = minutes == 1 ? " minute, " : " minutes, ";
    const secondsWord = seconds == 1 ? " second" : " seconds";
    return minutes + minutesWord + seconds + secondsWord;
  }

  return (
    <>
      <form
        action="/generate"
        className="flex w-auto flex-col items-center justify-center text-center text-xl"
      >
        <p>Using songs from your library between</p>

        <label htmlFor="minLength" className="m-2">
          {milisecondstoMMSS(minMS)}
        </label>
        <input
          type="range"
          name="minLength"
          min={RANGE_MIN}
          max={RANGE_MAX}
          step={RANGE_STEP}
          value={minMS}
          onChange={handleChangeMin}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
        />

        <p className="mt-2">and</p>

        <label htmlFor="maxLength" className="m-2">
          {milisecondstoMMSS(maxMS)}
        </label>
        <input
          type="range"
          name="maxLength"
          min={RANGE_MIN}
          max={RANGE_MAX}
          step={RANGE_STEP}
          value={maxMS}
          onChange={handleChangeMax}
          className="h-2 w-full cursor-pointer appearance-none rounded-full bg-red-400 focus:outline-none focus:ring-4 focus:ring-red-300"
        />

        <button
          className="btn-primary"
          type="submit"
        >
          Generate Playlist
        </button>
      </form>
    </>
  );
}

export default SettingsForm;

"use client";

import { useState } from "react";
import PrimaryButton from "@/components/PrimaryButton";

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
    const padding0 = seconds < 10 ? "0" : "";
    return minutes + ":" + padding0 + seconds;
  }

  return (
    <>
      <form action="/generate">
        <label>
          Minimum Length: {milisecondstoMMSS(minMS)}
          <br />
          <input
            type="range"
            name="minLength"
            min={RANGE_MIN}
            max={RANGE_MAX}
            step={RANGE_STEP}
            value={minMS}
            onChange={handleChangeMin}
          />
        </label>
        <br />
        <label>
          Maximum Length: {milisecondstoMMSS(maxMS)}
          <br />
          <input
            type="range"
            name="maxLength"
            min={RANGE_MIN}
            max={RANGE_MAX}
            step={RANGE_STEP}
            value={maxMS}
            onChange={handleChangeMax}
          />
        </label>
        <br />
        <PrimaryButton type="submit">Generate Playlist</PrimaryButton>
      </form>
    </>
  );
}

export default SettingsForm;

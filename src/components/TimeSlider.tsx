/**
 * Dual-input slider used to pick a range of song-lengths.
 *
 * The values returned by the slider have the name "time".
 */
"use client";

import { Slider, SliderValue } from "@nextui-org/react";
import { SetStateAction, useState, Dispatch } from "react";

export default function TimeSlider() {
  // Add type hinting because SliderValue = number | number[], and we're only actually supporting number[]
  // Default 2:00 to 2:15
  const [range, setRange] = useState([120, 135]) as [number[], Dispatch<SetStateAction<SliderValue>>];

  /**
   * Convert a number of seconds to the form "H:MM".
   * Leading zeros are only added to the minutes.
   *
   * @param value Number of seconds.
   * @returns String in the form "H:MM".
   */
  function formatSecondsToMMSS(value: number) {
    return `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`;
  }

  return (
    <>
      <label htmlFor="time" className="m-4 text-center">
        Using songs from your library between <span className="inline-block">{range.map(formatSecondsToMMSS).join(" and ")}.</span>
      </label>
      <Slider
        name="time"
        minValue={60}
        maxValue={180}
        value={range}
        onChange={setRange}
        marks={[
          {
            value: 60,
            label: "1:00",
          },
          {
            value: 90,
            label: "1:30",
          },
          {
            value: 120,
            label: "2:00",
          },
          {
            value: 150,
            label: "2:30",
          },
          {
            value: 180,
            label: "3:00",
          },
        ]}
      />
    </>
  );
}
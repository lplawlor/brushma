"use client";

import { ScaleLoader } from "react-spinners";
import colors from "tailwindcss/colors";

function LoadingPage({ lines }: { lines: string[] }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <ScaleLoader
        height={70}
        width={8}
        radius={9999}
        color={colors.red["400"]}
        speedMultiplier={0.5}
        className="mb-6"
      />
      {lines.map((line, index) => {
        return (
          <p key={index.toString()} className="text-xl font-light">
            {line}
          </p>
        );
      })}
    </div>
  );
}

export default LoadingPage;

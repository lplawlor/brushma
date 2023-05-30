"use client";

import { MouseEventHandler } from "react";

function PrimaryButton({
  children,
  type,
  onClick,
}: {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
  return (
    <button
      className="m-6 rounded-full border-2 border-red-400 bg-transparent px-5 py-2.5 text-center text-xl font-medium text-red-400 hover:bg-red-400 hover:text-white focus:outline-none focus:ring-4 focus:ring-red-300"
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default PrimaryButton;

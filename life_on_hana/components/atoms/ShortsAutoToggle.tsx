import Image from "next/image";
import React, { useState } from "react";
import play from "@/assets/play.svg";
import pause from "@/assets/pause.svg";
import { type TShortsAutoToggleProps } from "@/types/componentTypes";

export default function ShortsAutoToggle({ initialState = "play", onToggle }: TShortsAutoToggleProps) {
  const [selected, setSelected] = useState<"play" | "pause">(initialState);

  const handleToggle = (newState: "play" | "pause") => {
    if (newState !== selected) {
      setSelected(newState);
      onToggle?.(newState);
    }
  };

  return (
    <div className="w-[1.8125rem] h-[.9375rem] absolute cursor-pointer select-none">
      <div className="w-[1.8125rem] h-[.9375rem] left-0 top-0 absolute rounded-[.9375rem] border border-hanapurple" />

      <div
        className={`z-1 w-[.9375rem] h-[.9375rem] relative top-0 bg-hanapurple rounded-[.9375rem] border border-hanapurple transition-all duration-300 ${
          selected === "play" ? "left-0" : "left-[.875rem]"
        }`}
      />

      <div
        className={`absolute left-[.38rem] top-[50%] transform -translate-y-1/2 text-center text-[.625rem] transition-colors duration-300`}
        onClick={() => handleToggle("play")}
      >
        <Image
          className={`transition-opacity duration-300 ${
            selected === "play" ? "opacity-100" : "opacity-0"
          } bg-hanapurple`}
          src={play}
          alt="Play"
          priority
        />
      </div>

      <div
        className={`absolute left-[1.19rem] top-[50%] transform -translate-y-1/2 text-center text-[.625rem] transition-colors duration-300`}
        onClick={() => handleToggle("pause")}
      >
        <Image
          className={`transition-opacity duration-300 ${
            selected === "pause" ? "opacity-100" : "opacity-0"
          } bg-hanapurple`}
          src={pause}
          alt="Pause"
          priority
        />
      </div>
    </div>
  );
}

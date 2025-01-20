"use client";

import arrowLeft from "@/assets/arrow-left.svg";
import arrowRight from "@/assets/arrow-right.svg";
import { type TCarouselSectionProps } from "@/types/componentTypes";
import Image from "next/image";
import React, { useState } from "react";

const getCarouselSectionStyles = (variant: string) => {
  switch (variant) {
    case "column":
      return {
        sectionClass: "h-[8rem]",
        boxStyles: "bg-white w-full h-[8rem]",
        innerStyles: "w-full top-[4rem] left-[.9375rem]",
      };
    case "product":
      return {
        sectionClass: "h-[5rem]",
        boxStyles: "bg-white h-[5rem]",
        innerStyles: "w-full mx-10",
      };
    default:
      return {
        sectionClass: "h-[8rem]",
        boxStyles: "bg-white w-full h-[8rem]",
        innerStyles: "w-full top-[4rem] left-[.9375rem]",
      };
  }
};

export default function CarouselSection({
  variant = "default",
  items,
  onIndexChange,
}: TCarouselSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { sectionClass, boxStyles, innerStyles } =
    getCarouselSectionStyles(variant);

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  return (
    <div className={sectionClass}>
      <div
        className={`flex flex-row justify-between items-center rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] ${boxStyles}`}
      >
        <div className="cursor-pointer pl-5" onClick={handlePrev}>
          <Image src={arrowLeft} alt="Left Arrow" priority />
        </div>
        <div className={`${innerStyles} h-full overflow-hidden`}>
          <div
            className="flex items-center h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 flex-grow-1">
                {item}
              </div>
            ))}
          </div>
        </div>
        <div className="cursor-pointer pr-5" onClick={handleNext}>
          <Image src={arrowRight} alt="Right Arrow" priority />
        </div>
      </div>
    </div>
  );
}

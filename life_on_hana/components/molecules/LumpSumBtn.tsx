"use client";

import { useState } from "react";
import Image from "next/image";
import { type TLumpSumBtnProps } from "@/types/componentTypes";

const getLabel = (variant: TLumpSumBtnProps) => {
  switch (variant) {
    case "hanaSalaryBank":
      return "하나 월급통장";
    case "otherAccounts":
      return "다른 통장";
    case "loanProducts":
      return "대출 상품";
    default:
      return "";
  }
};

const getSrc = (variant: TLumpSumBtnProps) => {
  switch (variant) {
    case "hanaSalaryBank":
      return "/assets/hanaSalaryBank.svg";
    case "otherAccounts":
      return "/assets/otherAccounts.svg";
    case "loanProducts":
      return "/assets/loanProducts.svg";
    default:
      return "";
  }
};

export default function LumpSumBtn({ variant }: { variant: TLumpSumBtnProps }) {
  const [isClicked, setIsClicked] = useState(false);

  const clickEvent = () => setIsClicked(!isClicked);

  const commonClassNames = "flex flex-col justify-center items-center w-[5.1875rem] h-[5.1875rem] rounded-xl";

  return (
    <>
      <button
        onClick={clickEvent}
        style={
          isClicked
            ? {
                backgroundColor: "rgba(77, 0, 181, 0.2)",
                boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(77, 0, 181, 0.25) inset",
              }
            : undefined
        }
        className={`${commonClassNames} ${isClicked ? "shadow-inner" : "bg-hanalightpurple"}`}
      >
        <Image src={getSrc(variant)} alt={getLabel(variant)} width={70} height={70} />
        <div className="font-SCDream5 text-[.625rem]">{getLabel(variant)}</div>
      </button>
    </>
  );
}

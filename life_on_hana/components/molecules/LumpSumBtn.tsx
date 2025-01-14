"use client";

import { useState } from "react";
import Image from "next/image";

type TLumpSumBtnProps = "hanaSalaryBank" | "otherAccounts" | "loanProducts";

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

  return (
    <>
      {isClicked ? (
        <button
          onClick={clickEvent}
          style={{
            backgroundColor: "rgba(77, 0, 181, 0.2)",
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(77, 0, 181, 0.25) inset",
          }}
          className="flex flex-col justify-center items-center w-[5.1875rem] h-[5.1875rem] rounded-xl shadow-inner"
        >
          <Image src={getSrc(variant)} alt={getLabel(variant)} width={50} height={50} />
          <div className="font-SCDream5 text-[.625rem]">{getLabel(variant)}</div>
        </button>
      ) : (
        <button
          onClick={clickEvent}
          className="flex flex-col justify-center items-center w-[5.1875rem] h-[5.1875rem] bg-hanalightpurple rounded-xl shadow-xl"
        >
          <Image src={getSrc(variant)} alt={getLabel(variant)} width={50} height={50} />
          <div className="font-SCDream5 text-[.625rem]">{getLabel(variant)}</div>
        </button>
      )}
    </>
  );
}

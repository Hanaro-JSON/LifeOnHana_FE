import { type TBtnProps } from "@/types/componentTypes";
import Link from "next/link";
import arrowRight from "@/assets/arrow-right-white.svg";
import Image from "next/image";

const getBtnClasses = (variant: string) => {
  switch (variant) {
    // '하나지갑' 버튼들
    case "hanaWallet":
      return "bg-hanalightpurple w-[20.625rem] h-[2.9375rem] text-hanapurple text-[1rem] font-SCDream8";
    // '하나 월급통장' 출금계좌 선택 전
    case "beforeChooseAccount":
      return "bg-hanagray w-[18.125rem] h-[2.75rem] text-[.9375rem] text-white shadow-xl";
    // '휘릭' 전문보기
    case "moveToArticle":
      return "w-[19.1875rem] h-[2.9375rem] bg-hanapurple text-[1.25rem] text-white font-bold";
    // "급하게 목돈이 필요하세요?"
    case "needLumpSum":
      return "bg-hanapurple w-full h-[3.2rem] text-[1rem] text-white";
    default:
      return "bg-hanapurple w-[18.125rem] h-[2.75rem] text-[.9375rem] text-white";
  }
};

export default function Btn({
  type,
  text,
  url,
  variant = "default",
}: TBtnProps) {
  const btnClasses = `${getBtnClasses(variant)} rounded-xl font-SCDream5`;
  return url ? (
    <Link href={url}>
      <button className={btnClasses}>{text}</button>
    </Link>
  ) : variant === "needLumpSum" ? (
    <button
      className={`relative flex items-center justify-center ${btnClasses} rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]`}
      type={type}
    >
      <span className="absolute left-1/2 -translate-x-1/2">{text}</span>
      <div className="ml-auto pr-5">
        <Image
          src={arrowRight}
          alt="Right Arrow"
          className="dynamic-fill white" // 이 방식으로 CSS 색상 적용
        />
      </div>
    </button>
  ) : (
    <button className={btnClasses} type={type}>
      {text}
    </button>
  );
}

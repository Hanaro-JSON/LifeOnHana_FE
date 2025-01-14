import Link from "next/link";

type TBtnProps = {
  text: string;
  url?: string;
  variant?: "default" | "moveToArticle" | "beforeChooseAccount" | "hanaWallet";
};

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
    default:
      return "bg-hanapurple w-[18.125rem] h-[2.75rem] text-[.9375rem] text-white";
  }
};

export default function Btn({ text, url, variant = "default" }: TBtnProps) {
  const btnClasses = `${getBtnClasses(variant)} rounded-xl font-SCDream5`;
  return url ? (
    <Link href={url}>
      <button className={btnClasses}>{text}</button>
    </Link>
  ) : (
    <button className={btnClasses}>{text}</button>
  );
}

import Link from "next/link";

type TBtnProps = {
  text: string;
  url?: string;
  variant?: "default" | "moveToArticle" | "beforeChooseAccount" | "hanaWallet";
};

const getBtnClasses = (variant: string) => {
  switch (variant) {
    // 하나지갑 페이지 안 버튼들
    case "hanaWallet":
      return "bg-hanalightpurple w-[330px] h-[47px] text-hanapurple text-[16px] font-SCDream8";
    // 채우기 전
    case "beforeChooseAccount":
      return "bg-hanagray w-[290px] h-[44px] text-[15px] shadow-xl";
    // 전문보기
    case "moveToArticle":
      return "w-[307px] h-[47px] bg-hanapurple text-[20px] font-bold";
    default:
      return "bg-hanapurple w-[290px] h-[44px] text-[15px]";
  }
};

export default function Btn({ text, url, variant = "default" }: TBtnProps) {
  const btnClasses = `${getBtnClasses(variant)} rounded-xl text-white font-SCDream5`;
  return url ? (
    <Link href={url}>
      <button className={btnClasses}>{text}</button>
    </Link>
  ) : (
    <button className={btnClasses}>{text}</button>
  );
}

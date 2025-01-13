import Link from "next/link";

type TBtnProps = {
  text: string;
  url?: string;
  variant?: "default" | "link" | "beforeChooseAccount";
};

const getBtnClasses = (variant: string) => {
  switch (variant) {
    case "beforeChooseAccount":
      return "bg-hanagray rounded-xl w-[290px] h-[44px] text-white text-[15px] shadow-xl font-SCDream5";
    case "link":
      return "rounded-xl w-[307px] h-[47px] bg-hanapurple text-white text-[20px] font-bold font-SCDream5";
    default:
      return "bg-hanapurple rounded-xl w-[290px] h-[44px] text-white text-[15px] font-SCDream5";
  }
};

export default function Btn({ text, url, variant = "default" }: TBtnProps) {
  const btnClasses = getBtnClasses(variant);
  return url ? (
    <Link href={url}>
      <button className={btnClasses}>{text}</button>
    </Link>
  ) : (
    <button className={btnClasses}>{text}</button>
  );
}

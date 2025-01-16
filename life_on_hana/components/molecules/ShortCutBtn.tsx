import Link from "next/link";
import arrowRight from "../../assets/KeyboardArrowRight.svg";
import Image from "next/image";
import { type TShortCutBtnProps } from "@/types/componentTypes";

const variantConfig = {
  column: {
    text: "좋아요한 칼럼 보러가기",
    class1: "text-[.5rem] w-[5.25rem]",
    class2: "w-[6.1875rem]",
  },
  spend: {
    text: "내 지출내역 구체적으로 보기",
    class1: "text-[.625rem] w-[8rem]",
    class2: "w-[9rem]",
  },
  product: {
    text: "관심 있을 상품 보러가기",
    class1: "text-[.5rem] w-[5.25rem]",
    class2: "w-[6.1875rem]",
  },
  default: {
    text: "좋아요한 칼럼 보러가기",
    class1: "text-[.5rem] w-[5.25rem]",
    class2: "w-[6.1875rem]",
  },
};

export default function ShortCutBtn({ url, variant = "default" }: TShortCutBtnProps) {
  const { text, class1: variantClass1, class2: variantClass2 } = variantConfig[variant];

  return (
    <div className={`${variantClass2} h-[.9375rem] inline-flex items-center justify-center`}>
      <Link href={url} className="flex items-center justify-center">
        <div
          className={`${variantClass1} h-3 text-right text-black font-light font-SCDream3 flex items-center justify-center`}
        >
          <span>{text}</span>
        </div>
        <div className="w-[.9375rem] h-[.9375rem] relative flex items-center justify-center overflow-hidden">
          <Image src={arrowRight} alt="Right Arrow" />
        </div>
      </Link>
    </div>
  );
}

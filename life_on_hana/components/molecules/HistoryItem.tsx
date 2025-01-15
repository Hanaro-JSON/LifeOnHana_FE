import Image from "next/image";
import FOOD from "@/assets/FOOD.svg";
import SNACK from "@/assets/SNACK.svg";
import EDUCATION from "@/assets/EDUCATION.svg";
import HOBBY from "@/assets/HOBBY.svg";
import HEALTH from "@/assets/HEALTH.svg";
import FIXED_EXPENSE from "@/assets/FIXED_EXPENSE.svg";
import TRAVEL from "@/assets/TRAVEL.svg";
import DEPOSIT from "@/assets/DEPOSIT.svg";
import INTEREST from "@/assets/INTEREST.svg";
import ETC from "@/assets/ETC.svg";
import { extractTimeWithRegex } from "@/utils/convertTimeFormat";

type THistoryItemProps = {
  historyId: number;
  category:
    | "FOOD"
    | "SNACK"
    | "EDUCATION"
    | "HOBBY"
    | "HEALTH"
    | "FIXED_EXPENSE"
    | "TRAVEL"
    | "DEPOSIT"
    | "INTEREST"
    | "ETC";
  amount: number;
  description: string;
  historyDatetime: string;
  isExpense: boolean;
};

const getSrc = ({ category }: THistoryItemProps) => {
  switch (category) {
    case "FOOD":
      return FOOD;
    case "SNACK":
      return SNACK;
    case "EDUCATION":
      return EDUCATION;
    case "HOBBY":
      return HOBBY;
    case "HEALTH":
      return HEALTH;
    case "FIXED_EXPENSE":
      return FIXED_EXPENSE;
    case "TRAVEL":
      return TRAVEL;
    case "DEPOSIT":
      return DEPOSIT;
    case "INTEREST":
      return INTEREST;
    case "ETC":
      return ETC;
    default:
      return "";
  }
};

const getLabel = ({ category }: THistoryItemProps) => {
  switch (category) {
    case "FOOD":
      return "식비";
    case "SNACK":
      return "카페∙간식";
    case "EDUCATION":
      return "교육";
    case "HOBBY":
      return "취미∙여가";
    case "HEALTH":
      return "의료∙건강∙피트니스";
    case "FIXED_EXPENSE":
      return "교통∙자동차/주거∙통신/보험∙세금∙기타금융";
    case "TRAVEL":
      return "여행∙숙박";
    case "DEPOSIT":
      return "입금";
    case "INTEREST":
      return "이자";
    case "ETC":
      return "카테고리 없음";
    default:
      return "";
  }
};

export default function HistoryItem({
  variant,
}: {
  variant: THistoryItemProps;
}) {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row gap-3">
          <Image
            src={getSrc(variant)}
            alt={getLabel(variant)}
            width={40}
            height={40}
          />
          <div className="flex flex-col py-2">
            <div className="font-SCDream3 text-[.8025rem]">
              {getLabel(variant)}
            </div>
            <div className="font-SCDream5 text-[.9rem]">
              {variant.description}
            </div>
            <div className="font-SCDream2 text-[.625rem]">
              {extractTimeWithRegex(variant.historyDatetime)}
            </div>
          </div>
        </div>
        <div className="font-SCDream5">
          {variant.isExpense ? "+" : "-"}
          {variant.amount.toLocaleString()} 원
        </div>
      </div>
    </>
  );
}

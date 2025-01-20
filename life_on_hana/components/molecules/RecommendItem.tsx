import { type TRecommendItemProps } from "@/types/componentTypes";
import Section from "@/components/atoms/Section";

export function RecommendItem({
  name,
  description,
  maxAmountFormatted,
  maxInterest_rate,
  productType,
  onClick,
}: TRecommendItemProps) {
  const renderProductDetails = () => {
    switch (productType) {
      case "LOAN":
        return (
<<<<<<< HEAD
          <div className="flex flex-col items-end mt-2 gap-0.5">
            <div className="font-SCDream8 text-[1.1rem]">최대</div>
            <div className="font-SCDream8 text-[1rem] text-hanapurple">
=======
          <div className="flex flex-col items-end">
            <div className="font-SCDream8 text-sm">최대</div>
            <div className="font-SCDream8 text-sm text-[#4D00B5]">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
              {maxAmountFormatted}
            </div>
          </div>
        );
      case "SAVINGS":
        return (
<<<<<<< HEAD
          <div className="flex flex-col items-end mt-2 gap-0.5">
            <div className="font-SCDream3 text-[.9rem]">연(세전,1년)</div>
            <div className="font-SCDream8 text-[1rem] text-hanapurple">
=======
          <div className="flex flex-col items-end">
            <div className="font-SCDream3 text-[.75rem]">연(세전,1년)</div>
            <div className="font-SCDream8 text-[1rem] text-[#4D00B5]">
>>>>>>> a71a48c ([feat] 🐣 homeLikeProducts 페이지 추가)
              최고 ~{maxInterest_rate}%
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-row justify-between" onClick={onClick}>
        <div className="flex flex-col gap-2">
          <div className="font-SCDream8 text-[1.2rem]">{name}</div>
          <div className="font-SCDream3 text-[.9rem]">{description}</div>
        </div>
        <div className="flex flex-col">{renderProductDetails()}</div>
      </div>
    </Section>
  );
}

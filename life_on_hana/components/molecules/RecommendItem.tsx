import { type TRecommendItemProps } from "@/types/componentTypes";
import Section from "../atoms/Section";

export function RecommendItem({ name, description, maxAmount, maxInterest_rate, productType }: TRecommendItemProps) {
  const renderProductDetails = () => {
    switch (productType) {
      case "LOAN":
        return (
          <div className="flex flex-col items-end">
            <div className="font-SCDream8 text-sm">최대</div>
            <div className="font-SCDream8 text-sm text-[#4D00B5]">{maxAmount}</div>
          </div>
        );
      case "SAVINGS":
        return (
          <div className="flex flex-col items-end">
            <div className="font-SCDream3 text-[.75rem]">연(세전,1년)</div>
            <div className="font-SCDream8 text-[1rem] text-[#4D00B5]">최고 ~{maxInterest_rate}%</div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Section>
      <div className="w-full flex flex-row justify-between">
        <div className="flex flex-col gap-2">
          <div className="font-SCDream8 text-[.9375rem]">{name}</div>
          <div className="font-SCDream3 text-[.725rem]">{description}</div>
        </div>
        <div className="flex flex-col">{renderProductDetails()}</div>
      </div>
    </Section>
  );
}

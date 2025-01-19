import React from "react";
import CarouselSection from "../atoms/CarouselSection";
import { type TRecommendCarouselItemProps } from "@/types/componentTypes";

export function RecommendCarouselItem({
  items,
}: {
  items: TRecommendCarouselItemProps[];
}) {
  const renderProductDetails = (item: TRecommendCarouselItemProps) => {
    switch (item.productType) {
      case "LOAN":
        return (
          <div className="flex flex-col items-end">
            <div className="font-SCDream8 text-sm">최대</div>
            <div className="font-SCDream8 text-sm text-[#4D00B5]">
              {item.maxAmount}
            </div>
          </div>
        );
      case "SAVINGS":
        return (
          <div className="flex flex-col items-end">
            <div className="font-SCDream3 text-[.75rem]">연(세전,1년)</div>
            <div className="font-SCDream8 text-[1rem] text-[#4D00B5]">
              최고 ~{item.maxInterest_rate}%
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const carouselItems = items.map((item, index) => (
    <div
      key={index}
      className="w-full h-full items-center flex flex-row justify-between"
    >
      <div className="flex flex-col">
        <div className="font-SCDream8 text-[1rem]">{item.name}</div>
        <div className="font-SCDream3 text-[0.8rem]">{item.description}</div>
      </div>
      <div className="flex flex-col">{renderProductDetails(item)}</div>
    </div>
  ));

  return <CarouselSection variant="product" items={carouselItems} />;
}

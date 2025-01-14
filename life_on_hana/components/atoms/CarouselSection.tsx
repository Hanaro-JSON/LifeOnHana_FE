import arrowLeft from "../../assets/arrow-left.svg";
import arrowRight from "../../assets/arrow-right.svg";
import Image from 'next/image';

type TCarouselSectionProps = {
  variant?: "default" | "column" | "product";
};

const getCarouselSectionStyles = (variant: string) => {
  switch (variant) {
    case "column":
      return {
        sectionClass: "w-[20rem] h-[8rem] relative",
        boxStyles: "bg-white w-[20rem] h-[8rem]", 
        innerStyles: "w-[20rem] top-[4rem] left-[.9375rem]",
      };
    case "product":
      return {
        sectionClass: "w-[20rem] h-[5rem] relative",
        boxStyles: "bg-hanalightpurple w-[20rem] h-[5rem]",
        innerStyles: "w-[20rem] top-[2.4375rem] left-[.875rem]",
      };
    default:
      return {
        sectionClass: "w-[20rem] h-[8rem] relative",
        boxStyles: "bg-white w-[20rem] h-[8rem]",
        innerStyles: "w-[20rem] top-[4rem] left-[.9375rem]",
      };
  }
};

export default function CarouselSection({
  variant = "default",
}: TCarouselSectionProps) {
  const { sectionClass, boxStyles, innerStyles } = getCarouselSectionStyles(variant);

  return (
    <div className={sectionClass}>
      <div className={`absolute left-0 top-0 rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] ${boxStyles}`} />

      <div className={`absolute ${innerStyles}`}>
        {/* 내용 추가 공간 */}
      </div>

      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 cursor-pointer p-2">
        <Image src={arrowLeft} alt="Left Arrow" />
      </div>

      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 cursor-pointer p-2">
        <Image src={arrowRight} alt="Right Arrow" />
      </div>
    </div>
  );
}

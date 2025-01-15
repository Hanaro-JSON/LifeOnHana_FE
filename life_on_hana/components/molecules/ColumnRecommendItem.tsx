import Link from "next/link";

type TColumnRecommendItemProps = {
  variant: string;
  link: string;
  name: string;
};

export default function ColumnRecommendItem({ variant, link, name }: TColumnRecommendItemProps) {
  const getCategory = (variant: string) => {
    switch (variant) {
      case "REAL_ESTATE":
        return "부동산";
      case "INVESTMENT":
        return "투자";
      case "INHERITANCE_GIFT":
        return "상속∙증여";
      case "TRAVEL":
        return "여행";
      case "CULTURE":
        return "문화";
      case "HOBBY":
        return "취미";
      default:
        return "";
    }
  };

  const getSrc = (variant: string) => {
    switch (variant) {
      case "REAL_ESTATE":
        return "/assets/column_recommend_realEstate.svg";
      case "INVESTMENT":
        return "/assets/column_recommend_investment.svg";
      case "INHERITANCE_GIFT":
        return "/assets/column_recommend_inheritanceGift.svg";
      case "TRAVEL":
        return "/assets/column_recommend_travel.svg";
      case "CULTURE":
        return "/assets/column_recommend_culture.svg";
      case "HOBBY":
        return "/assets/column_recommend_hobby.svg";
      default:
        return "";
    }
  };

  return (
    <>
      <Link href={link}>
        <button
          className="bg-cover bg-center w-[9.5625rem] h-[6.25rem] flex flex-col items-start justify-start p-2"
          style={{ backgroundImage: `url(${getSrc(variant)})` }}
          title={name}
        >
          <div className="text-hanapurple font-SCDream6 text-[.75rem] mb-1">{getCategory(variant)}</div>
          <div className="line-clamp font-SCDream5 text-[.9375rem] flex justify-start text-left">{name}</div>
        </button>
      </Link>
      <style jsx>{`
        .line-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </>
  );
}

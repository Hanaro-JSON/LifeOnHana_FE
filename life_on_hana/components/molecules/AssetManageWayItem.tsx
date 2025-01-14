import Image from "next/image";
import Link from "next/link";

type TAssetManageWayItemProps =
  | "adjust"
  | "rebalancing"
  | "managing"
  | "product"
  | "invest"
  | "trip"
  | "culture"
  | "realEstate";

const getSrc = (variant: TAssetManageWayItemProps) => {
  switch (variant) {
    case "adjust":
      return "/assets/adjust.svg";
    case "rebalancing":
      return "/assets/rebalancing.svg";
    case "managing":
      return "/assets/managing.svg";
    case "product":
      return "/assets/product.svg";
    case "invest":
      return "/assets/invest.svg";
    case "trip":
      return "/assets/trip.svg";
    case "culture":
      return "/assets/culture.svg";
    case "realEstate":
      return "/assets/realEstate.svg";
    default:
      return "";
  }
};

const getLabel = (variant: TAssetManageWayItemProps) => {
  switch (variant) {
    case "adjust":
      return "지급 금액 조정";
    case "rebalancing":
      return "자산 리밸런싱";
    case "managing":
      return "고정 지출 관리";
    case "product":
      return "대출 상품";
    case "invest":
      return "투자";
    case "trip":
      return "여행";
    case "culture":
      return "문화";
    case "realEstate":
      return "부동산";
    default:
      return "";
  }
};

const getLink = (variant: TAssetManageWayItemProps) => {
  switch (variant) {
    case "adjust":
      return "/";
    case "rebalancing":
      return "/";
    case "managing":
      return "/";
    case "product":
      return "/";
    case "invest":
      return "/";
    case "trip":
      return "/";
    case "culture":
      return "/";
    case "realEstate":
      return "/";
    default:
      return "/";
  }
};

export default function AssetManageWayItem({ variant }: { variant: TAssetManageWayItemProps }) {
  return (
    <>
      <Link href={getLink(variant)} className="flex flex-col items-center">
        <div className="w-10 h-10 bg-hanalightpurple rounded-xl flex justify-center items-center mb-1">
          <Image src={getSrc(variant)} alt={getLabel(variant)} width={30} height={30} />
        </div>
        <div className="font-SCDream5 text-[.625rem]">{getLabel(variant)}</div>
      </Link>
    </>
  );
}

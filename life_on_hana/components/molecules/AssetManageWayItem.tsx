import Image from "next/image";
import Link from "next/link";

// type TAssetManageWayItemProps = {
//   variant?: 'adjust' | 'rebalancing' | 'managing' | 'product';
// };

const getSrc = (variant: string) => {
  switch (variant) {
    // '지금 금액 조정'
    case "adjust":
      return "/assets/adjust.svg";
    // '자산 리밸런싱'
    case "rebalancing":
      return "/assets/rebalancing.svg";
    // '고정 지출 관리'
    case "managing":
      return "/assets/managing.svg";
    // '대출 상품'
    case "product":
      return "/assets/product.svg";
    default:
      return "";
  }
};

const getLabel = (variant: string) => {
  switch (variant) {
    // '지금 금액 조정'
    case "adjust":
      return "지급 금액 조정";
    // '자산 리밸런싱'
    case "rebalancing":
      return "자산 리밸런싱";
    // '고정 지출 관리'
    case "managing":
      return "고정 지출 관리";
    // '대출 상품'
    case "product":
      return "대출 상품";
    default:
      return "";
  }
};

export default function AssetManageWayItem({ variant }: { variant: string }) {
  return (
    <>
      <Link href={"/"} className="flex flex-col items-center">
        <div className="w-10 h-10 bg-hanalightpurple rounded-xl flex justify-center items-center mb-1">
          <Image src={getSrc(variant)} alt={getLabel(variant)} width={30} height={30} />
        </div>
        <div className="font-SCDream5 text-[.625rem]">{getLabel(variant)}</div>
      </Link>
    </>
  );
}

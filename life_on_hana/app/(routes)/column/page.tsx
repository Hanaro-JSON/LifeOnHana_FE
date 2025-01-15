import ColumnMainImgItem from "@/components/molecules/ColumnMainImgItem";
import ColumnRecommendItem from "@/components/molecules/ColumnRecommendItem";

export default function Column() {
  return (
    <>
      <div className="relative h-full">
        <ColumnMainImgItem variant="INHERITANCE_GIFT" title="현명하게 가족 분쟁 없이 상속을 준비하는 방법" />
        <ColumnRecommendItem variant="TRAVEL" name="보홀 5일 #비그랜드 #고래상어투어" />
      </div>
    </>
  );
}

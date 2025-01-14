import Image from "next/image";
import openDescriptionItem from "@/assets/openDescriptionItem.svg";

export default function OpenDescriptionItem() {
  const openDescriptionEvent = () => {
    alert("말풍선이 열렸음");
  };

  return (
    <>
      <Image onClick={openDescriptionEvent} src={openDescriptionItem} alt="용어설명말풍선 클릭" className="w-5" />
    </>
  );
}

import Image from "next/image";
import openDescriptionItem from "@/assets/openDescriptionItem.svg";
import { useState } from "react";
import DescriptionDetailItem from "./DescriptionDetailItem";

export default function OpenDescriptionItem() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openDescriptionEvent = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block">
      <Image
        onClick={openDescriptionEvent}
        src={openDescriptionItem}
        alt="용어설명클릭"
        className="w-5 cursor-pointer"
      />
      {isOpen && (
        <div className="absolute z-10 right-5 top-full">
          <DescriptionDetailItem idx={2} />
        </div>
      )}
    </div>
  );
}

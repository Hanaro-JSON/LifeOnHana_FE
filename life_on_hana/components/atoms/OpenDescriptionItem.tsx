import React, { useState } from "react";
import Image from "next/image";
import openDescriptionItem from "@/assets/openDescriptionItem.svg";
import DescriptionDetailItem from "./DescriptionDetailItem";

export default function OpenDescriptionItem({ description }: { description: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);

  const openDescriptionEvent = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    // 버튼 오른쪽 옆(조금 떨어진) 위치로 설정
    setPopupPosition({
      top: rect.top,
      left: rect.left + rect.width,
    });

    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="inline-block">
      {/* 아이콘 */}
      <Image
        onClick={openDescriptionEvent}
        src={openDescriptionItem}
        alt="용어설명클릭"
        className="w-5 cursor-pointer"
      />

      {/* 팝업 */}
      <span className="flex">
      {isOpen && popupPosition && (
        <div
          className="sticky"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 9999,
          }}
        >
          <DescriptionDetailItem description={description} closePopup={closePopup} />
        </div>
      )}
    </span>
    </div>
  );
}

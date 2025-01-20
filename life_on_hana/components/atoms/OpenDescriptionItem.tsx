import React, { useState } from "react";
import Image from "next/image";
import openDescriptionItem from "@/assets/openDescriptionItem.svg";
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 4018117 ([fix] 🐣 columnDetail 페이지 수정)
import DescriptionDetailItem from "./DescriptionDetailItem";
=======
import { useState } from "react";
import DescriptionDetailItem from "@/components/atoms/DescriptionDetailItem";
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)

export default function OpenDescriptionItem({ description }: { description: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{ top: number; left: number } | null>(null);

  const openDescriptionEvent = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

<<<<<<< HEAD
    const isLeft = rect.left > window.innerWidth / 2;

    setPopupPosition({
      top: rect.top - event.currentTarget.offsetParent!.getBoundingClientRect().top + rect.height,
      left: isLeft
        ? rect.left - event.currentTarget.offsetParent!.getBoundingClientRect().left - 150 // 왼쪽 방향
        : rect.left - event.currentTarget.offsetParent!.getBoundingClientRect().left + rect.width, // 오른쪽 방향
=======
    // 버튼 오른쪽 옆(조금 떨어진) 위치로 설정
    setPopupPosition({
      top: rect.top,
      left: rect.left + rect.width,
>>>>>>> 4018117 ([fix] 🐣 columnDetail 페이지 수정)
    });

    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
<<<<<<< HEAD
    <div className="relative inline-block">
<<<<<<< HEAD
      {/* 아이콘 */}
      <div className="flex">
        <Image
          onClick={openDescriptionEvent}
          src={openDescriptionItem}
          alt="용어 설명 아이콘"
          className="w-5 h-5 cursor-pointer"
        />
      </div>

      {/* 팝업 */}
      {isOpen && popupPosition && (
        <div
          className="absolute"
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 9999,
          }}
        >
          <DescriptionDetailItem description={description} closePopup={closePopup} />
=======
=======
    <div className="inline-block">
      {/* 아이콘 */}
>>>>>>> 4018117 ([fix] 🐣 columnDetail 페이지 수정)
      <Image
        onClick={openDescriptionEvent}
        src={openDescriptionItem}
        alt="용어설명클릭"
        className="w-5 cursor-pointer"
        priority
      />
<<<<<<< HEAD
      {isOpen && (
        <div className="absolute z-10 right-5 top-full">
          <DescriptionDetailItem idx={2} />
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======

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
>>>>>>> 4018117 ([fix] 🐣 columnDetail 페이지 수정)
        </div>
      )}
    </span>
    </div>
  );
}

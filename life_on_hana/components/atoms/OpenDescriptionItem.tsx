import React, { useState } from 'react';
import Image from 'next/image';
import openDescriptionItem from '@/assets/openDescriptionItem.svg';
import DescriptionDetailItem from './DescriptionDetailItem';

export default function OpenDescriptionItem({
  description,
}: {
  description: string;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [popupPosition, setPopupPosition] = useState<{
    top: number;
    left: number;
  } | null>(null);

  const openDescriptionEvent = (event: React.MouseEvent<HTMLImageElement>) => {
    if (isOpen) {
      setIsOpen(false);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    const isLeft = rect.left > window.innerWidth / 2;

    setPopupPosition({
      top:
        rect.top -
        event.currentTarget.offsetParent!.getBoundingClientRect().top +
        rect.height,
      left: isLeft
        ? rect.left -
          event.currentTarget.offsetParent!.getBoundingClientRect().left -
          150 // 왼쪽 방향
        : rect.left -
          event.currentTarget.offsetParent!.getBoundingClientRect().left +
          rect.width, // 오른쪽 방향
    });

    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className='relative inline-block'>
      {/* 아이콘 */}
      <div className='flex'>
        <Image
          onClick={openDescriptionEvent}
          src={openDescriptionItem}
          alt='용어 설명 아이콘'
          className='w-5 h-5 cursor-pointer'
        />
      </div>

      {/* 팝업 */}
      {isOpen && popupPosition && (
        <div
          className='absolute'
          style={{
            top: popupPosition.top,
            left: popupPosition.left,
            zIndex: 9999,
          }}
        >
          <DescriptionDetailItem
            description={description}
            closePopup={closePopup}
          />
        </div>
      )}
    </div>
  );
}

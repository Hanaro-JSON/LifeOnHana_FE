import React from 'react';

export default function DescriptionDetailItem({
  description,
}: {
  description: string;
  closePopup: () => void;
}) {
  return (
    <div
      className='w-[12.5rem] max-h-[6.25rem] bg-white border-2 border-hanapurple rounded-lg p-2 shadow-lg'
      onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
    >
      {/* 설명 내용 */}
      <div className=' max-h-[5rem] text-[.9rem] text-start overflow-scroll'>
        {description}
      </div>
    </div>
  );
}

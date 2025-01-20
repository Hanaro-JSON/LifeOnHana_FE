import React from "react";

export default function DescriptionDetailItem({
  description,
}: {
  description: string;
  closePopup: () => void;
}) {
  return (
<<<<<<< HEAD
    <div
      className="w-[12.5rem] max-h-[6.25rem] bg-white border-2 border-hanapurple rounded-lg p-2 shadow-lg"
      onClick={(e) => e.stopPropagation()} // 이벤트 전파 방지
    >
      {/* 설명 내용 */}
      <div className=" max-h-[5rem] text-[.9rem] text-start overflow-scroll">
        {description}
      </div>
    </div>
=======
    <>
      {isOpen && (
        <div className="fixed flex items-center justify-center" onClick={closeBalloon}>
          <div
            className="flex justify-between items-center relative max-w-[12.5rem] max-h-[6.25rem] bg-white border-2 border-hanapurple rounded-lg p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[90%] max-h-[5rem] text-[.6875rem] text-start overflow-scroll">{descriptions(idx)}</div>
            <button className="w-[5%]flex justify-center items-center text-xs" onClick={closeBalloon}>
              <Image src={exitBtn} alt="Close Button" className="w-3 h-3 cursor-pointer" priority />
            </button>
          </div>
        </div>
      )}
    </>
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
  );
}

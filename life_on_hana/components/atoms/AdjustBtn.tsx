import { type TAdjustBtnProps } from "@/types/componentTypes";
import { useEffect, useRef } from "react";

export default function AdjustBtn({
  id,
  isOpen,
  typeCeilTxt = "말",
  typeBottomTxt = "속도",
  first = "0.5x",
  second = "1x",
  third = "2x",
  mX = 80,
  mY = 90,
  onToggle,
}: TAdjustBtnProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        onToggle("");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen, onToggle]);

  return (
    <div
      ref={wrapperRef}
      onClick={() => onToggle(id)}
      className="relative inline-block"
      style={{
        left: `${mX}%`,
        top: `${mY}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* 글씨 크기 버튼 */}
      <button
        className={`${
          isOpen ? "bg-white text-purple-600 border shadow-purple-100" : "bg-purple-600 text-white"
        } rounded-full size-16 font-semibold shadow-md`}
      >
        {typeCeilTxt} <br />
        {typeBottomTxt}
      </button>

      {/* 선택 바 */}
      {isOpen && (
        <div className="h-16 -z-20 absolute -left-[13rem] -top-0 transform bg-white rounded-2xl shadow-lg p-4 w-64">
          <div className="flex items-center justify-between">
            <input
              type="range"
              min="1"
              max="3"
              defaultValue="2"
              className="w-[80%] h-2 bg-gradient-to-r from-purple-600 to-purple-200 rounded-sm custom-range"
            />
          </div>
          <div className="w-[80%] flex justify-between text-center bg-white text-sm mt-2 font-bold">
            <p className="bg-white">{first}</p>
            <p className="bg-white">{second}</p>
            <p className="bg-white">{third}</p>
          </div>
        </div>
      )}
    </div>
  );
}

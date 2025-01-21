import Image from "next/image";
import searchBtn from "@/assets/searchBtn.svg";
import removeAllBtn from "@/assets/removeAllBtn.svg";
import { useState } from "react";
import { type TSearchInput } from "@/types/componentTypes";

export default function SearchInput({
  placeholder,
  value = "",
  onChange,
}: TSearchInput) {
  const [inputValue, setInputValue] = useState(value);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange?.(newValue); // 부모 컴포넌트로 검색값 전달
  };

  const removeAllValue = () => {
    setInputValue("");
    onChange?.(""); // 검색값 초기화
  };

  return (
    <div className="relative flex items-center w-full h-[3rem]">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        className="h-full font-SCDream3 text-[1rem] w-full rounded-2xl border border-hanapurple bg-white px-3 py-2 focus:ring-2 focus:ring-inset focus:ring-hanapurple focus:outline-none"
        placeholder={placeholder}
      />

      {inputValue ? (
        <button onClick={removeAllValue} className="absolute right-[.9375rem]">
          <Image src={removeAllBtn} alt="삭제" priority />
        </button>
      ) : (
        <Image src={searchBtn} alt="검색" className="absolute right-[.9375rem]" priority />
      )}
    </div>
  );
}

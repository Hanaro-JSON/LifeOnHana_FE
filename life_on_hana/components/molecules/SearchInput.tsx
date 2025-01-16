import Image from "next/image";
import searchBtn from "@/assets/searchBtn.svg";
import removeAllBtn from "@/assets/removeAllBtn.svg";
import { useState } from "react";
import { type TSearchInput } from "@/types/componentTypes";

export default function SearchInput({ placeholder, value = "" }: TSearchInput) {
  const [inputValue, setInputValue] = useState(value);

  const removeAllValue = () => {
    setInputValue("");
  };

  return (
    <div className="relative flex items-center w-full h-[2.125rem]">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="font-SCDream3 text-[.625rem] w-full rounded-2xl border border-hanapurple bg-white px-3 py-2 focus:ring-2 focus:ring-inset focus:ring-hanapurple focus:outline-none"
        placeholder={placeholder}
      />

      {inputValue ? (
        <button onClick={removeAllValue} className="absolute right-[.9375rem]">
          <Image src={removeAllBtn} alt="삭제" />
        </button>
      ) : (
        <Image src={searchBtn} alt="검색" className="absolute right-[.9375rem]" />
      )}
    </div>
  );
}

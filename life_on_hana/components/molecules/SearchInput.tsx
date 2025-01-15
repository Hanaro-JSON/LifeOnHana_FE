import Image from "next/image";
import searchBtn from "@/assets/searchBtn.svg";
import removeAllBtn from "@/assets/removeAllBtn.svg";
import { useRef, useState } from "react";

type TSearchInput = {
  placeholder: string;
  value?: string;
};

export default function SearchInput({ placeholder, value = "" }: TSearchInput) {
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState(value);

  const removeAllValue = () => {
    setInputValue("");
  };

  return (
    <>
      <div className="relative flex items-center w-[22.6875rem] h-[2.125rem]">
        <input
          type="text"
          value={inputValue}
          ref={inputRef}
          onChange={(e) => setInputValue(e.target.value)}
          className="font-SCDream3 text-[.625rem] w-full rounded-2xl border border-hanapurple bg-white px-3 py-2"
          placeholder={placeholder}
        />

        {inputValue ? (
          <button onClick={removeAllValue} className="absolute right-[.9375rem]">
            <Image src={removeAllBtn} alt="삭제" />
          </button>
        ) : (
          <button className="absolute right-[.9375rem]">
            <Image src={searchBtn} alt="검색" />
          </button>
        )}
      </div>
    </>
  );
}

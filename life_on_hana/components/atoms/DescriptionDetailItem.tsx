import Image from "next/image";
import exitBtn from "@/assets/exitBtn.svg";

import { useState } from "react";

export default function DescriptionDetailItem() {
  const [isOpen, setIsOpen] = useState(true);

  const closeBalloon = () => setIsOpen(false);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50" onClick={closeBalloon}>
          <div
            className="flex justify-between items-center relative max-w-[250px] max-h-[6.25rem] bg-white border-2 border-hanapurple rounded-lg p-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-[90%] max-h-[5rem] text-[.6875rem] text-start overflow-scroll">
              “간절욱조조반도(艮絶旭肇早半島)-간절곶에 해가 떠야 한반도에 새벽이 온다”. 울주 간절곶 표지석에는 이런
              문장이 적혀있다. 1902년 군수 김우식이 &quot;울산읍지&quot;에 이렇게 썼다. 간절곶은 우리나라 육지에서 가장
              먼저 해가 떠오르는 곳이다.
            </div>
            <button className="w-[10%]flex justify-center items-center text-sm" onClick={closeBalloon}>
              <Image src={exitBtn} alt="Close Button" className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
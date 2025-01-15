"use client";

import Image from "next/image";
import whilick from "@/assets/whilick.svg";
import whilick_clicked from "@/assets/whilick_clicked.svg";
import home from "@/assets/home.svg";
import home_clicked from "@/assets/home_clicked.svg";
import column from "@/assets/column.svg";
import column_clicked from "@/assets/column_clicked.svg";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

export default function Nav() {
  const router = useSelectedLayoutSegments();
  const segment = router[1];

  const lableClassNames = `font-SCDream3 text-[.625rem] text-hanagray mt-1`;
  const clickedLableClassNames = `font-SCDream3 text-[.625rem] text-white mt-1`;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 w-full z-50 h-[5.5625rem] rounded-t-[1.875rem] flex justify-around items-center bg-hanapurple">
        <Link href={"/whilick"} className="flex flex-col justify-center items-center">
          <Image src={segment === "whilick" ? whilick_clicked : whilick} alt="휘릭" width={24} height={24} />
          <span className={segment === "whilick" ? clickedLableClassNames : lableClassNames}>휘릭</span>
        </Link>
        <Link href={"/home"} className="flex flex-col justify-center items-center">
          <Image src={segment === "home" ? home_clicked : home} alt="홈" width={24} height={24} />
          <span className={segment === "home" ? clickedLableClassNames : lableClassNames}>홈</span>
        </Link>
        <Link href={"/column"} className="flex flex-col justify-center items-center">
          <Image src={segment === "column" ? column_clicked : column} alt="칼럼" width={24} height={24} />
          <span className={segment === "column" ? clickedLableClassNames : lableClassNames}>칼럼</span>
        </Link>
      </div>
    </>
  );
}

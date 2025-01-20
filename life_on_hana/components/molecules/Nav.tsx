"use client";

import { type TNavItemProps } from "@/types/componentTypes";
import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

const navItem: TNavItemProps[] = [
  {
    route: "whilick",
    label: "휘릭",
    icon: { default: "/assets/whilick_gray.svg", clicked: "/assets/whilick_white.svg" },
  },
  {
    route: "home",
    label: "홈",
    icon: { default: "/assets/home.svg", clicked: "/assets/home_clicked.svg" },
  },
  {
    route: "column",
    label: "칼럼",
    icon: { default: "/assets/column.svg", clicked: "/assets/column_clicked.svg" },
  },
];

export default function Nav() {
  const router = useSelectedLayoutSegments();
  const segment = router[1];

  const lableClassNames = `font-SCDream3 text-[.625rem] text-hanagray mt-1`;
  const clickedLableClassNames = `font-SCDream3 text-[.625rem] text-white mt-1`;

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 w-screen z-50 h-[5.5625rem] rounded-t-[1.875rem] flex justify-around items-center bg-hanapurple">
        {navItem.map(({ route, label, icon }: TNavItemProps) => {
          return (
            <Link key={route} href={`/${route}`} className="flex flex-col justify-center items-center">
              <Image
                src={segment === route ? icon.clicked : icon.default}
                alt={label}
                width={24}
                height={24}
                style={{ width: "auto", height: "auto" }}
<<<<<<< HEAD
                priority
=======
>>>>>>> 692efb1 ([fix] 🐿️ Image 로그 과정 중 발생하는 경고 해결)
              />
              <span className={segment === route ? clickedLableClassNames : lableClassNames}>{label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}

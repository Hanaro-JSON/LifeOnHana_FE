"use client";

import Image from "next/image";
import Link from "next/link";
import { useSelectedLayoutSegments } from "next/navigation";

type TNavItemProps = {
  route: string;
  label: string;
  icon: { default: string; clicked: string };
};

const navItem: TNavItemProps[] = [
  {
    route: "whilick",
    label: "휘릭",
    icon: { default: "/assets/whilick.svg", clicked: "/assets/whilick_clicked.svg" },
  },
  {
    route: "home",
    label: "휘릭",
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
      <div className="fixed bottom-0 left-0 right-0 w-full z-50 h-[5.5625rem] rounded-t-[1.875rem] flex justify-around items-center bg-hanapurple">
        {navItem.map(({ route, label, icon }: TNavItemProps) => {
          return (
            <Link key={route} href={`/${route}`} className="flex flex-col justify-center items-center">
              <Image src={segment === route ? icon.clicked : icon.default} alt={label} width={24} height={24} />
              <span className={segment === route ? clickedLableClassNames : lableClassNames}>{label}</span>
            </Link>
          );
        })}
      </div>
    </>
  );
}
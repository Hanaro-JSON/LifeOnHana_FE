"use client";

import Image from "next/image";
import Section from "@/components/atoms/Section";
import Link from "next/link";
import arrowRight from "@/assets/arrow-right.svg";
import { type TMainSectionProps } from "@/types/componentTypes";
import { useState, useEffect } from "react";

const variants = [
  {
    label: "/assets/mainSectionTitleA.svg",
    src: "/assets/mainSectionImgA.svg",
  },
  {
    label: "/assets/mainSectionTitleB.svg",
    src: "/assets/mainSectionImgB.svg",
  },
  {
    label: "/assets/mainSectionTitleC.svg",
    src: "/assets/mainSectionImgC.svg",
  },
  {
    label: "/assets/mainSectionTitleD.svg",
    src: "/assets/mainSectionImgD.svg",
  },
  {
    label: "/assets/mainSectionTitleE.svg",
    src: "/assets/mainSectionImgE.svg",
  },
];

export default function MainSection({ name, walletAmount }: TMainSectionProps) {
  const [randomItem, setRandomItem] = useState(variants[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * variants.length);
    setRandomItem(variants[randomIndex]);
  }, []);
  return (
    <>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
      <Section height="16rem">
        <div className="px-5">
          <div className="w-full flex flex-col items-center">
            <div className="flex justify-center text-center mb-2">
              <Image
                src={randomItem.label}
                alt="제목"
                className="w-[80%]"
                width={300}
                height={300}
              />
            </div>
            <div className="w-full flex justify-between items-center">
              <div>
                <div className="font-SCDream3 text-[.75rem]">{name}님이</div>
                <div className="font-SCDream3 text-[1.0625rem]">
                  이번 달 받은&nbsp;
                  <span className="text-hanagreen font-SCDream8">하나</span>
                  월급
                </div>
                <div className="font-SCDream8 text-[1.4375rem]">
                  {walletAmount}만원
                </div>
              </div>
              <Image
                src={randomItem.src}
                alt="mainSectionImg"
                width={100}
                height={100}
              />
<<<<<<< HEAD
            </div>
=======
      <Section height="13.9375rem">
        <div className="w-full flex flex-col">
          <div className="flex justify-center text-center mb-2">
            <Image src={randomItem.label} alt="제목" className="w-[80%]" width={300} height={300} priority />
          </div>
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="font-SCDream3 text-[.75rem]">{name}님이</div>
              <div className="font-SCDream3 text-[1.0625rem]">
                이번 달 받은 <span className="text-hanagreen font-SCDream8">하나</span> 월급
              </div>
              <div className="font-SCDream8 text-[1.4375rem]">{walletAmount}만원</div>
            </div>
            <Image
              src={randomItem.src}
              alt="mainSectionImg"
              width={100}
              height={100}
              style={{ width: "auto", height: "auto" }}
              priority
            />
>>>>>>> e1a68cb ([fix] 🐿️ Image 로그 과정 중 발생하는 경고 해결)
          </div>
<<<<<<< HEAD
=======
            </div>
          </div>
<<<<<<< HEAD
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
<<<<<<< HEAD
>>>>>>> 2448682 ([style] 🐿️ import 방식 통일)
          <div className="mt-3">
            <Link href={"/wallet"}>
              <button className="font-SCDream3 text-[.75rem] flex items-center ">
                <span className="text-hanapurple">월급&nbsp;</span>설정하러 가기
                <Image src={arrowRight} alt="Right Arrow" className="ml-2" />
              </button>
            </Link>
          </div>
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 2448682 ([style] 🐿️ import 방식 통일)
=======

          <Link href={"/wallet"}>
            <button className="font-SCDream3 text-[.75rem] flex items-center ">
              <span className="text-hanapurple">월급&nbsp;</span>설정하러 가기
              <Image src={arrowRight} alt="Right Arrow" className="ml-2" priority />
            </button>
          </Link>
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
<<<<<<< HEAD
=======
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
>>>>>>> 2448682 ([style] 🐿️ import 방식 통일)
        </div>
      </Section>
    </>
  );
}

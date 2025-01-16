import Image from "next/image";
import Section from "../atoms/Section";
import Link from "next/link";
import arrowRight from "../../assets/arrow-right.svg";

type TMainSectionProps = {
  name: string;
  walletAmount: number;
};

const variants = [
  { label: "/assets/mainSectionTitleA.svg", src: "/assets/mainSectionImgA.svg" },
  { label: "/assets/mainSectionTitleB.svg", src: "/assets/mainSectionImgB.svg" },
  { label: "/assets/mainSectionTitleC.svg", src: "/assets/mainSectionImgC.svg" },
  { label: "/assets/mainSectionTitleD.svg", src: "/assets/mainSectionImgD.svg" },
  { label: "/assets/mainSectionTitleE.svg", src: "/assets/mainSectionImgE.svg" },
];

export default function MainSection({ name, walletAmount }: TMainSectionProps) {
  const randomIndex = Math.floor(Math.random() * variants.length);
  const randomItem = variants[randomIndex];

  return (
    <>
      <Section height="13.9375rem">
        <div className="w-full flex flex-col">
          <div className="flex justify-center text-center mb-2">
            <Image src={randomItem.label} alt="제목" className="w-[80%]" width={300} height={300} />
          </div>
          <div className="w-full flex justify-between items-center">
            <div>
              <div className="font-SCDream3 text-[.75rem]">{name}님이</div>
              <div className="font-SCDream3 text-[1.0625rem]">
                이번 달 받은 <span className="text-hanagreen font-SCDream8">하나</span> 월급
              </div>
              <div className="font-SCDream8 text-[1.4375rem]">{walletAmount}만원</div>
            </div>
            <Image src={randomItem.src} alt="mainSectionImg" width={100} height={100} />
          </div>

          <Link href={"/wallet"}>
            <button className="font-SCDream3 text-[.75rem] flex items-center ">
              <span className="text-hanapurple">월급&nbsp;</span>설정하러 가기
              <Image src={arrowRight} alt="Right Arrow" className="ml-2" />
            </button>
          </Link>
        </div>
      </Section>
    </>
  );
}

import Image from "next/image";
import Section from "../atoms/Section";
import Link from "next/link";

type TMainSectionProps = {
  name: string;
  walletAmount: number;
};

export default function MainSection({ name, walletAmount }: TMainSectionProps) {
  type TMainSection = "versionA" | "versionB" | "versionC" | "versionD" | "versionE";

  const getLabel = (variant: TMainSection) => {
    switch (variant) {
      case "versionA":
        return "하나은행을 통해";
      case "versionB":
        return "노후에도 월급처럼 매일 찾아오는 안정, 하나은행과 함께";
      case "versionC":
        return "급하게 목돈이 필요할 때 하나 월급통장을 이용해보세요";
      case "versionD":
        return "하나은행과 함께 풍요로운 은퇴생활을 누려보세요";
      case "versionE":
        return "월급처럼 들어오는 든든한 생활비, 하나은행과 함께하세요";
      default:
        return "";
    }
  };

  const getSrc = (variant: TMainSection) => {
    switch (variant) {
      case "versionA":
        return "/assets/mainSectionImgA.svg";
      case "versionB":
        return "/assets/mainSectionImgB.svg";
      case "versionC":
        return "/assets/mainSectionImgC.svg";
      case "versionD":
        return "/assets/mainSectionImgD.svg";
      case "versionE":
        return "/assets/mainSectionImgE.svg";
      default:
        return "";
    }
  };

  return (
    <>
      <Section height="13.9375rem">
        <div className="w-full border border-green-500 flex flex-col">
          <div className="border border-purple-500 flex justify-center font-SCDream5 text-[1.25rem]">
            {getLabel("versionA")}
          </div>
          <div className="border border-rose-500 w-full flex justify-between items-center">
            <div>
              <div className="font-SCDream3 text-[.75rem]">{name}님이</div>
              <div className="font-SCDream3 text-[1.0625rem]">이번 달 받은 하나 월급</div>
              <div className="font-SCDream8 text-[1.4375rem]">{walletAmount}만원</div>
            </div>
            <Image src={getSrc("versionA")} alt="mainSectionImg" width={90} height={90} />
          </div>

          <Link href={"/wallet"}>
            <button className="font-SCDream3 text-[.75rem]">월급 설정하러 가기 : </button>
          </Link>
        </div>
      </Section>
    </>
  );
}

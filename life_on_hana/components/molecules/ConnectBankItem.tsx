import { useState } from "react";
import Image from "next/image";
import MydataCheckNo from "../../assets/MydataCheckNo.svg";
import MydataCheckYes from "../../assets/MydataCheckYes.svg";
import HanaBankLogo from "../../assets/HanaBankLogo.svg";
import NonghyupBankLogo from "../../assets/NonghyupBankLogo.svg";
import ShinhanBankLogo from "../../assets/ShinhanBankLogo.svg";
import WooriBankLogo from "../../assets/WooriBankLogo.svg";
import TossBankLogo from "../../assets/TossBankLogo.svg";
import NaverBankLogo from "../../assets/NaverBankLogo.svg";
import KakaoBankLogo from "../../assets/KakaoBankLogo.svg";
import { type TConnectBankItemProps } from "@/types/componentTypes";

export default function ConnectBankItem({ bankName, initialIsMydataChecked = false, onToggle }: TConnectBankItemProps) {
  const [isMydataChecked, setIsMydataChecked] = useState<boolean>(initialIsMydataChecked);

  const toggleMydata = () => {
    const newCheckedState = !isMydataChecked;
    setIsMydataChecked(newCheckedState);
    onToggle(newCheckedState);
  };

  const bankLogoMap: Record<string, string> = {
    HANA: HanaBankLogo,
    NH: NonghyupBankLogo,
    SHINHAN: ShinhanBankLogo,
    WOORI: WooriBankLogo,
    TOSS: TossBankLogo,
    NAVER: NaverBankLogo,
    KAKAO: KakaoBankLogo,
  };

  const bankNameMap: Record<string, string> = {
    HANA: "하나은행",
    NH: "농협은행",
    SHINHAN: "신한은행",
    WOORI: "우리은행",
    TOSS: "토스뱅크",
    NAVER: "네이버뱅크",
    KAKAO: "카카오뱅크",
  };

  const bankLogo = bankLogoMap[bankName];
  const displayBankName = bankNameMap[bankName];

  return (
    <div className="w-full h-[3.75rem] flex items-center justify-between relative">
      <div className="flex items-center">
        <Image className="w-5 h-[.95rem]" src={bankLogo} alt={`${bankName} Logo`} width={20} height={15} />
        <div className="ml-2 text-black text-[.9375rem] font-SCDream3">{displayBankName}</div>
      </div>

      <div className="w-[.9375rem] h-[.9375rem]">
        <Image
          src={isMydataChecked ? MydataCheckYes : MydataCheckNo}
          alt={isMydataChecked ? "Mydata Checked" : "Mydata Not Checked"}
          width={20}
          height={20}
          onClick={toggleMydata}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

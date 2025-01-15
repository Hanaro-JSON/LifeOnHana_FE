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

type TConnectBankItemProps = {
  bankName: string;
  initialIsMydataChecked?: boolean;
};

export default function ConnectBankItem({
  bankName,
  initialIsMydataChecked = false,
}: TConnectBankItemProps) {
  const [isMydataChecked, setIsMydataChecked] = useState<boolean>(initialIsMydataChecked);

  const toggleMydata = () => {
    setIsMydataChecked(!isMydataChecked);
  };

  const bankLogoMap: Record<string, string> = {
    "하나은행": HanaBankLogo,
    "농협은행": NonghyupBankLogo,
    "신한은행": ShinhanBankLogo,
    "우리은행": WooriBankLogo,
    "토스": TossBankLogo,
    "네이버": NaverBankLogo,
    "카카오": KakaoBankLogo,
  };

  const bankLogo = bankLogoMap[bankName];

  return (
    <div className="w-[24.5625rem] h-[3.75rem] flex items-center justify-between relative">
      <div className="flex items-center ml-5">
        <Image
          className="w-5 h-[.95rem]"
          src={bankLogo}
          alt={`${bankName} Logo`}
          width={20}
          height={15}
        />
        <div className="ml-2 text-black text-[.9375rem] font-SCDream3">
          {bankName}
        </div>
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

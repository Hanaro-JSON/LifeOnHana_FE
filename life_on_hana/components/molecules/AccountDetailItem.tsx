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
  bank: string;
  accountNumber: string;
  accountName: string;
  balance: number;
};

export default function AccountDetailItem({
  bank,
  accountNumber,
  accountName,
  balance,
}: TConnectBankItemProps) {
  const [isMydataChecked, setIsMydataChecked] = useState<boolean>(false);

  const toggleMydata = () => {
    setIsMydataChecked(!isMydataChecked);
  };

  const bankLogoMap: Record<string, string> = {
    "Hana": HanaBankLogo,
    "NH": NonghyupBankLogo,
    "Shinhan": ShinhanBankLogo,
    "Woori": WooriBankLogo,
    "Toss": TossBankLogo,
    "Naver": NaverBankLogo,
    "Kakao": KakaoBankLogo,
  };

  const bankLogo = bankLogoMap[bank];

  return (
    <div className="w-[24.5625rem] h-[5rem] flex flex-col justify-between relative p-2 border-b">
      <div className="flex items-center mb-2">
        <Image
          className="w-5 h-[.95rem]"
          src={bankLogo}
          alt={`${bank} Logo`}
          width={20}
          height={15}
        />
        <div className="ml-2 text-black text-[.9375rem] font-SCDream3">
          {accountName}
        </div>
      </div>
    <div className="text-[.625rem] text-black font-SCDream3 ml-7">{accountNumber}</div>
        <div className="flex justify-between">
        
        <div className="text-[.625rem] text-black font-SCDream3 mt-1 ml-7">
            {"출금 가능"}
        </div>
        <div className="text-[.625rem] text-black font-SCDream8 mt-1">
            {balance.toLocaleString()} 원
        </div>
      </div>

      <div className="absolute top-4 right-2 w-[.9375rem] h-[.9375rem]">
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
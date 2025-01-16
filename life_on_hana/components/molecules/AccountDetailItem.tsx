import { useState } from "react";
import Image from "next/image";
import AccountCheckNo from "../../assets/MydataCheckNo.svg";
import AccountCheckYes from "../../assets/MydataCheckYes.svg";
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
  const [isAccountChecked, setIsAccountChecked] = useState<boolean>(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");

  const toggleAccount = () => {
    setIsAccountChecked(!isAccountChecked);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWithdrawalAmount(e.target.value);
  };

  const bankLogoMap: Record<string, string> = {
    "HANA": HanaBankLogo,
    "NH": NonghyupBankLogo,
    "SHINHAN": ShinhanBankLogo,
    "WOORI": WooriBankLogo,
    "TOSS": TossBankLogo,
    "NAVER": NaverBankLogo,
    "KAKAO": KakaoBankLogo,
  };

  const bankLogo = bankLogoMap[bank];

  return (
    <div
      className="w-[24.5625rem] flex flex-col justify-between relative p-2 border-b"
    >
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
      {isAccountChecked && (
        <div className="mt-4">
          <div className="text-[.875rem] text-black font-SCDream3">
            {"출금금액"}
          </div>
          <div className="flex items-center justify-start">
            <input
              type="text" 
              value={withdrawalAmount}
              onChange={handleAmountChange}
              placeholder={`${balance.toLocaleString()}`}
              className="mt-2 w-[95%] h-[2rem] p-2 border border-hanapurple rounded-md text-right text-[.875rem] font-SCDream8 focus:outline-none focus:border-hanapurple focus:border-2"
            />
            <div className="ml-2 text-black text-[.875rem] font-SCDream3 mt-2">
              원
            </div>
          </div>
        </div>
      )}
      <div className="absolute top-4 right-2 w-[.9375rem] h-[.9375rem]">
        <Image
          src={isAccountChecked ? AccountCheckYes : AccountCheckNo}
          alt={isAccountChecked ? "Account Checked" : "Account Not Checked"}
          width={20}
          height={20}
          onClick={toggleAccount}
          className="cursor-pointer"
        />
      </div>
    </div>
  );
}

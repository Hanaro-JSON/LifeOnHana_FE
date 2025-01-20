import { useState, useEffect } from "react";
import Image from "next/image";
import AccountCheckNo from "@/assets/MydataCheckNo.svg";
import AccountCheckYes from "@/assets/MydataCheckYes.svg";
import HanaBankLogo from "@/assets/HanaBankLogo.svg";
import NonghyupBankLogo from "@/assets/NonghyupBankLogo.svg";
import ShinhanBankLogo from "@/assets/ShinhanBankLogo.svg";
import WooriBankLogo from "@/assets/WooriBankLogo.svg";
import TossBankLogo from "@/assets/TossBankLogo.svg";
import NaverBankLogo from "@/assets/NaverBankLogo.svg";
import KakaoBankLogo from "@/assets/KakaoBankLogo.svg";
import { type TAccountDetailItemProps } from "@/types/componentTypes";

export default function AccountDetailItem({
  bank,
  accountNumber,
  accountName,
  balance,
  isAccountChecked = false,
  onSelect,
  onAmountChange,
}: TAccountDetailItemProps) {
  const [checked, setChecked] = useState<boolean>(isAccountChecked);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    setChecked(isAccountChecked);
  }, [isAccountChecked]);

  const toggleAccount = () => {
    const newVal = !checked;
    setChecked(newVal);
    onSelect?.(newVal);
  };

  const formatNumber = (value: string) => {
    if (!value || isNaN(Number(value.replaceAll(",", "")))) return "";
    return Number(value.replaceAll(",", "")).toLocaleString("en-US");
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const rawValue = e.target.value.replace(/[,.원]/g, "");
  const formattedValue = formatNumber(rawValue);

  const inputAmount = Number(rawValue);

  if (inputAmount === 0) {
    setErrorMessage("0보다 큰 값을 입력하세요.");
    onAmountChange?.(true);
  } else if (inputAmount > balance) {
    setErrorMessage("출금 가능 금액을 초과했습니다.");
    onAmountChange?.(true);
  } else {
    setErrorMessage("");
    onAmountChange?.(false);
  }

  setWithdrawalAmount(formattedValue);
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

  const bankLogo = bankLogoMap[bank] || HanaBankLogo;

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 277776c ([feat] 🐣 homeWalletDeposit 추가)
    <div className="w-[24.5625rem] flex flex-col justify-between relative p-1 border-b">
      <div className="flex items-center mb-1 mt-1">
        <Image
          className="w-7 h-7 -mt-5"
          src={bankLogo}
          alt={`${bank} Logo`}
          width={20}
          height={15}
        />
        <div className="flex flex-col ml-2">
          <div className="text-[1.1rem] font-SCDream3">{accountName}</div>
          <div className="text-[1rem] font-SCDream3">{accountNumber}</div>
        </div>
<<<<<<< HEAD
=======
    <div className="w-[24.5625rem] flex flex-col justify-between relative p-2 border-b">
      <div className="flex items-center mb-2">
        <Image className="w-5 h-[.95rem]" src={bankLogo} alt={`${bank} Logo`} width={20} height={15} priority />
        <div className="ml-2 text-black text-[.9375rem] font-SCDream3">{accountName}</div>
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
>>>>>>> 277776c ([feat] 🐣 homeWalletDeposit 추가)
      </div>
      <div className="flex justify-between mb-3 text-[.8rem] mt-1">
        <div className="font-SCDream3 ml-9">출금 가능</div>
        <div className="font-SCDream8">{balance.toLocaleString()} 원</div>
      </div>

      {/* 금액 입력 영역: 체크되었을 때만 보임 */}
      {checked && (
        <div className="mt-4">
          <div className="text-[1rem] font-SCDream3">출금금액</div>
          {errorMessage && (
            <div className="text-rose-500 text-[.8rem] mt-1">{errorMessage}</div>
          )}
          <div className="flex items-center justify-start mb-4">
            <input
              type="text"
              value={withdrawalAmount}
              onChange={handleAmountChange}
              placeholder={`${balance.toLocaleString()}`}
              className="mt-2 w-[95%] h-[2.3rem] p-2 border border-hanapurple rounded-md text-right text-[1rem] font-SCDream8 focus:outline-none focus:border-hanapurple focus:border-2"
            />
            <div className="ml-2 text-[1rem] font-SCDream5 mt-2">원</div>
          </div>
        </div>
      )}

      {/* 체크 아이콘 */}
      <div className="absolute top-4 right-[0.1rem] w-[1.7rem] h-[1.7rem]">
        <Image
          src={checked ? AccountCheckYes : AccountCheckNo}
          alt={checked ? "Account Checked" : "Account Not Checked"}
          width={20}
          height={20}
          onClick={toggleAccount}
          className="cursor-pointer"
          priority
        />
      </div>
    </div>
  );
}

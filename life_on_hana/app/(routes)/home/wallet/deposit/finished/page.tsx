"use client";

import Image from "next/image";
import Btn from "@/components/atoms/Btn";
import AnimatedCheck from "@/components/animation/AnimatedCheck";
import HanaBankLogo from "@/assets/HanaBankLogo.svg";
import NonghyupBankLogo from "@/assets/NonghyupBankLogo.svg";
import ShinhanBankLogo from "@/assets/ShinhanBankLogo.svg";
import WooriBankLogo from "@/assets/WooriBankLogo.svg";
import TossBankLogo from "@/assets/TossBankLogo.svg";
import NaverBankLogo from "@/assets/NaverBankLogo.svg";
import KakaoBankLogo from "@/assets/KakaoBankLogo.svg";
import { useRouter } from "next/navigation";
import { NavHeader } from "@/components/molecules/NavHeader";

export default function Finished() {
    const router = useRouter();
  const mockTransferResponse = {
    code: 200,
    status: "OK",
    message: "이체가 완료되었습니다.",
    data: {
      totalAmount: 7000000,
      fromAccount: {
        bank: "HANA",
        accountNumber: "11111111111111",
        accountName: "하나월급통장",
      },
      toAccount: {
        bank: "HANA",
        accountNumber: "123123123123123",
        accountName: "하나월셋통장",
        balance: 6999999,
      },
    },
  };

  const { fromAccount, toAccount } = mockTransferResponse.data;

  const transferCount = 1;
  const transferAmount = 1;

  const handleConfirm = () => {
    router.push("/home");
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

  const getBankLogo = (bank: string) => bankLogoMap[bank] || "";

  return (
    <div className="flex flex-col px-3">
      <div className="pt-6">
        <NavHeader location={"하나 월급통장 채우기"} beforePageUrl={"."} />
      </div>

      <div className="flex-1 flex flex-col items-center pt-3">
        <div className="p-4 bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col gap-1 min-h-[52rem] w-[95%]">
          <div className="flex justify-center my-4">
            <AnimatedCheck />
          </div>

          <div className="text-center">
            <div className="font-Hana2bold text-[1.5rem]">
              채우기가 완료되었습니다.
            </div>
            <div className="w-[100%] mx-auto border-b-2 border-b-hanagray my-5"></div>

            <div className="flex justify-between w-full font-SCDream3 text-[1rem] mb-2">
              <span>신청결과</span>
              <span>정상 {transferCount}건</span>
            </div>
            <div className="flex justify-between w-full font-SCDream3 text-[1rem]">
              <span>입금금액</span>
              <span>{transferAmount}원</span>
            </div>
          </div>

          <div className="w-[100%] mx-auto border-b-2 border-b-hanagray my-5"></div>

          <div className="flex justify-between w-full font-SCDream3 text-[1rem]">
            <span>입금계좌</span>
            <span>
              <span className="flex justify-end">{fromAccount.accountName}</span>
              <span className="text-[.6875rem]">{fromAccount.accountNumber}</span>
            </span>
          </div>

          <div className="w-[100%] mx-auto border-b-2 border-b-hanagray my-5"></div>

          <div className="text-[.8rem] font-SCDream1">
            이체결과 오류 혹은 오픈뱅킹 공동시스템으로 인한 지연이 발생할 경우,<br />
            고객센터(0000-1111)로 문의해 주세요.
          </div>

          <div className="w-[100%] mx-auto border-b-2 border-b-hanagray my-5"></div>

          <div className="flex items-center gap-2 ml-2">
            <Image
              className="w-9 h-9"
              src={getBankLogo(toAccount.bank)}
              alt={`${toAccount.bank} Logo`}
              width={50}
              height={50}
            />
            <div>
              <div className="font-SCDream3 text-[1.1rem]">
                {toAccount.accountName}
              </div>
              <div className="text-[0.9rem]">{toAccount.accountNumber}</div>
            </div>
          </div>
          <div className="text-right font-SCDream8 text-[0.9rem] mt-1 mr-2">
            {toAccount.balance.toLocaleString()} 원
          </div>
        </div>
      </div>

      <div className="fixed bottom-5 left-0 w-full flex justify-center mb-32">
        <div className="w-[85%] flex justify-center">
          <Btn text="확인" variant="default" onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}

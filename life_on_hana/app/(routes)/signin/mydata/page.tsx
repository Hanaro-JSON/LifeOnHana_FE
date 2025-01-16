"use client";

import MicroMiniBtn from "@/components/atoms/MicroMiniBtn";
import ConnectBankItem from "@/components/molecules/ConnectBankItem";
import Link from "next/link";

export default function mydata() {
  return (
    <>
      <div className="relative h-full ">
        <div className="pt-[5rem] px-[1.5rem]">
          <div className="font-SCDream3 text-[23px] mb-2">
            <span className="font-Hana2heavy text-hanapurple">LIFE on HANA</span> 가입을 위해
            <br />
            마이데이터 서비스를 <span className="font-SCDream5">가입</span>합니다
          </div>
          <div className="font-SCDream3 text-[12px] text-hanadeepgray mb-20">
            탈퇴 시 마이데이터로 연결된 모든 자산과 개인정보가 삭제(유효한 전송요구도 함께 중단)되며, 서비스 재이용을
            위해서는 다시 전송동의가 필요해요.{" "}
          </div>
          <div className="flex items-center gap-3 font-SCDream5 text-[14px] mb-5">
            연결되는 데이터
            <MicroMiniBtn num={5} />
          </div>
          <div className="flex flex-col items-center">
            <ConnectBankItem bankName="HANA" />
            <ConnectBankItem bankName="NH" />
            <ConnectBankItem bankName="SHINHAN" />
            <ConnectBankItem bankName="WOORI" />
            <ConnectBankItem bankName="TOSS" />
            <ConnectBankItem bankName="NAVER" />
            <ConnectBankItem bankName="KAKAO" />
          </div>
        </div>

        <Link href="/home">
          <button className="fixed w-full bottom-0 h-[100px] flex justify-center pt-5 font-SCDream3 text-[18px] bg-[#731BEC] text-white">
            마이데이터 서비스 연결
          </button>
        </Link>
      </div>
    </>
  );
}

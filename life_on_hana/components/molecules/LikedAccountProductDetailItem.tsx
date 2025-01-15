import React, { useState } from "react";
import Btn from "../atoms/Btn";

type TLikedAccountProductDetailItemProps = {
  name: string;
  description: string;
  link: string;
  savingsInfo: {
    basicInterestRate: number;
    maxInterestRate: number;
  };
};

export default function LikedAccountProductDetailItem({
  name,
  description,
  link,
  savingsInfo,
}: TLikedAccountProductDetailItemProps) {
  const [amount, setAmount] = useState<string>("");
  const [years, setYears] = useState<string>("");
  const [interestRate, setInterestRate] = useState<number>(savingsInfo.basicInterestRate);
  const [calculatedAmount, setCalculatedAmount] = useState<string>("0");

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rate = parseFloat(e.target.value);
    if (rate >= savingsInfo.basicInterestRate && rate <= savingsInfo.maxInterestRate) {
      setInterestRate(rate);
      calculateAmount(amount, years, rate); 
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const amountToNumber = e.target.value;
    setAmount(amountToNumber);
    calculateAmount(amountToNumber, years, interestRate);
  };

  const handleYearsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const yearsToNumber = e.target.value;
    setYears(yearsToNumber);
    calculateAmount(amount, yearsToNumber, interestRate); 
  };

  const calculateAmount = (amount: string, years: string, interestRate: number) => {
    const amountToNumber = parseFloat(amount);
    const yearsToNumber = parseInt(years);
    if (amountToNumber && yearsToNumber && !isNaN(interestRate)) {
      const expectedAmount = (
        amountToNumber * yearsToNumber * (interestRate / 100) + amountToNumber
      ).toFixed(0);
      setCalculatedAmount(expectedAmount);
    } else {
      setCalculatedAmount("0");
    }
  };

  return (
    <div className="w-[20rem] h-[30.9375rem] relative bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col items-start justify-between p-6">
      <div className="text-[1.125rem] font-SCDream8 text-left self-start mb-2">
        {name}
      </div>

      <div className="w-[17.3rem] text-[.8125rem] font-SCDream3 leading-normal text-center overflow-y-auto max-h-[6rem] flex-grow mb-2">
        <p className="text-left">{description}</p>
      </div>

      <div className="text-[.9375rem] font-SCDream8 text-left self-start mb-2">
        나의 예상 혜택
      </div>

      <div className="w-[18rem] h-[6rem] relative mb-3 -ml-2">
        <div className="w-[18rem] h-[6rem] left-0 top-0 absolute bg-[#f4ebfb] rounded-[18px]">
          <div className="p-4 mt-2">
            <div className="flex justify-between">
              <div className="text-black text-[.8125rem] font-SCDream3">
                만기금액(세전)
              </div>
              <div className="text-right text-black text-[.8125rem] font-SCDream5">
                {calculatedAmount ? `${parseInt(calculatedAmount).toLocaleString()}원` : "금액을 입력해주세요"}
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <div className="text-black text-[.8125rem] font-SCDream3">
                적용금리
              </div>
              <div className="text-right text-black text-[.8125rem] font-SCDream5">
                {calculatedAmount === "0" ? `${savingsInfo.basicInterestRate}% ~ ${savingsInfo.maxInterestRate}%` : `연 ${interestRate}%`}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col text-[.8125rem]">
        <div className="flex items-center">
          <input
            type="text"
            value={amount}
            onChange={(e) => handleAmountChange(e)}
            className="min-w-[4rem] w-[auto] max-w-[14rem] p-2 border-b-2 border-hanalightpurple focus:outline-none focus:border-hanapurple text-hanapurple font-SCDream8"
            style={{ width: `${(amount.length + 2)}ch` }} // 숫자가 늘어나면 자동으로 input의 width 길어짐
            placeholder="금액"
            maxLength={12}
          />
          <span className="ml-2">원을</span>
        </div>

        <div className="flex items-center">
          <input
            type="text"
            value={years}
            onChange={handleYearsChange}
            className="w-[4rem] p-2 border-b-2 border-hanalightpurple focus:outline-none focus:border-hanapurple text-hanapurple font-SCDream8"
            placeholder="년"
            maxLength={3}
          />
          <span className="ml-2">년 동안</span>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            value={interestRate}
            onChange={handleInterestRateChange}
            className="w-[4rem] p-2 border-b-2 border-hanalightpurple focus:outline-none focus:border-hanapurple text-hanapurple font-SCDream8"
            placeholder="금리"
            min={savingsInfo.basicInterestRate} 
            max={savingsInfo.maxInterestRate}   
            step="0.1"     
          />
          <span className="">로 저축하기</span>
        </div>
      </div>

      <div className="mt-4 -ml-2">
        <Btn text={"상품정보 자세히보기"} url={link} />
      </div>
    </div>
  );
}

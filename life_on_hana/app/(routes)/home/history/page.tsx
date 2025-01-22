'use client';

import { NavHeader } from '@/components/molecules/NavHeader';
import { THistory, type THistoryMonthly } from '@/types/dataTypes';
import { useState } from 'react';
import Image from 'next/image';
import monthLeft from '@/assets/month-left.svg';
import monthRight from '@/assets/month-right.svg';
import shopingBag from '@/assets/shopingBag.svg';
import Section from '@/components/atoms/Section';
import { VerticalBarGraph } from '@/components/molecules/VerticalBarGraph';
import HistoryItem from '@/components/molecules/HistoryItem';
import { THistoryItemCategoryProps } from '@/types/componentTypes';

const mockData: THistoryMonthly = {
  averageExpense: 250000,
  currentBalance: 150000,
  monthlyExpenses: [
    {
      month: '202401',
      totalExpense: 250000,
    },
    {
      month: '202312',
      totalExpense: 250000,
    },
    {
      month: '202311',
      totalExpense: 270000,
    },
    {
      month: '202310',
      totalExpense: 250000,
    },
    {
      month: '202309',
      totalExpense: 230000,
    },
  ],
};

const historyMockData: THistory = {
  yearMonth: '202401',
  totalIncome: 5000000,
  totalExpense: 1500000,
  histories: [
    {
      historyId: 1,
      category: 'FOOD',
      amount: 15000,
      description: '점심식사',
      historyDateTime: '2024-01-13T12:30:00',
      isFixed: false,
      isExpense: true,
    },
    {
      historyId: 2,
      category: 'DEPOSIT',
      amount: 50000,
      description: '지갑 이자',
      historyDateTime: '2024-01-13T09:00:00',
      isFixed: false,
      isExpense: false,
    },
    {
      historyId: 3,
      category: 'FOOD',
      amount: 15000,
      description: '점심식사',
      historyDateTime: '2024-01-14T12:30:00',
      isFixed: false,
      isExpense: true,
    },
    {
      historyId: 4,
      category: 'DEPOSIT',
      amount: 50000,
      description: '지갑 이자',
      historyDateTime: '2024-01-15T09:00:00',
      isFixed: false,
      isExpense: false,
    },
  ],
  page: 1,
  size: 20,
  totalPages: 5,
  totalElements: 100,
};

export default function History() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [monthlyData, setMonthlyData] = useState<THistoryMonthly>(mockData);

  const [year, setYear] = useState<number>(() => new Date().getFullYear());
  const [month, setMonth] = useState<number>(() => new Date().getMonth() + 1);

  let lastPrintedDate = '';
  const minusDate = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };
  const plusDate = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className='p-6 space-y-4 mb-16'>
      <NavHeader location={'이번달 입출금 내역'} beforePageUrl={'/home'} />
      <div className='w-full h-full flex flex-col items-center gap-4'>
        <div className='w-full flex flex-row gap-x-4 justify-start items-center'>
          <div className='flex flex-row gap-x-4 font-SCDream5'>
            <Image src={monthLeft} alt={'monthLeft'} onClick={minusDate} />
            {year}년 {month}월
            <Image src={monthRight} alt={'monthRight'} onClick={plusDate} />
          </div>
          <div className='font-SCDream8 text-xl'>
            {monthlyData.currentBalance.toLocaleString()}원
          </div>
        </div>
        <Section height='20rem'>
          <div className='w-full flex flex-col items-center gap-y-2'>
            <div className='w-[90%] flex flex-row justify-between'>
              <div className='flex flex-col gap-y-2'>
                <div className='font-SCDream5 text-lg'>
                  한 달에 평균 {monthlyData.averageExpense / 10000}만원을 써요
                </div>
                <div className='font-SCDream3'>
                  하나지갑에 {monthlyData.currentBalance.toLocaleString()}원
                  남았어요
                </div>
              </div>
              <Image src={shopingBag} alt='shopingBag' />
            </div>
            <div className='w-[90%]'>
              <VerticalBarGraph items={mockData.monthlyExpenses} />
            </div>
          </div>
        </Section>
        <div className='w-full'>
          {historyMockData.histories.map((h, idx) => {
            let currentDate = h.historyDateTime.split('T')[0]; // 날짜만 추출
            currentDate =
              Number(currentDate.split('-')[1]) +
              '월' +
              Number(currentDate.split('-')[2]) +
              ' 일';
            let dateHeader = null;

            if (currentDate !== lastPrintedDate) {
              dateHeader = (
                <div className='font-SCDream3 text-[0.7rem] mt-3'>
                  {currentDate}
                </div>
              );
              lastPrintedDate = currentDate;
            }
            return (
              <div key={idx}>
                {dateHeader}
                <HistoryItem
                  historyId={h.historyId}
                  category={h.category as THistoryItemCategoryProps}
                  amount={h.amount}
                  description={h.description}
                  historyDatetime={h.historyDateTime}
                  isExpense={h.isExpense}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

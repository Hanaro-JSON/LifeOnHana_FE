'use client';

import { NavHeader } from '@/components/molecules/NavHeader';
import { type THistory, type THistoryMonthly } from '@/types/dataTypes';
import { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import monthLeft from '@/assets/month-left.svg';
import monthRight from '@/assets/month-right.svg';
import shopingBag from '@/assets/shopingBag.svg';
import Section from '@/components/atoms/Section';
import { VerticalBarGraph } from '@/components/molecules/VerticalBarGraph';
import HistoryItem from '@/components/molecules/HistoryItem';
import { type THistoryItemCategoryProps } from '@/types/componentTypes';
import { fetchHistory, fetchHistoryMonthly } from '@/api';
import LoadingIcon from '@/components/atoms/LoadingIcon';
import { formatCurrency } from '@/utils/formatCurrency';

const mockData: THistoryMonthly = {
  averageExpense: 250000,
  currentBalance: 150000,
  monthlyExpenses: [
    { month: '2024-01', totalExpense: 0 },
    { month: '2023-12', totalExpense: 0 },
    { month: '2023-11', totalExpense: 0 },
    { month: '2023-10', totalExpense: 0 },
    { month: '2023-09', totalExpense: 0 },
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
  data: undefined,
};

export default function History() {
  const [monthlyData, setMonthlyData] = useState<THistoryMonthly>(mockData);
  const [historyData, setHistoryData] = useState<THistory>(historyMockData);
  const [year, setYear] = useState<number>(() => new Date().getFullYear());
  const [month, setMonth] = useState<number>(() => new Date().getMonth() + 1);
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [hasNext, setHasNext] = useState(true); // 다음 페이지 여부
  const [isFetching, setIsFetching] = useState(false); // 데이터 로드 중 여부

  useEffect(() => {
    const getHistoryMonthly = async () => {
      setMonthlyData(await fetchHistoryMonthly());
    };
    getHistoryMonthly();
  }, []);

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

  // 스크롤을 내려서 데이터를 로드하는 함수
  useCallback(() => {
    if (isFetching || !hasNext) return;
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      // 스크롤이 맨 아래에 도달하면 페이지를 증가시키고 데이터를 요청
      setPage((prev) => prev + 1);
    }
  }, [isFetching, hasNext]);
  useEffect(() => {
    // year나 month가 변경될 때마다 histories를 초기화하고 page를 1로 설정
    setHistoryData((prevData) => ({
      ...prevData,
      histories: [],
    }));
    setPage(1); // 페이지를 1로 초기화
    setHasNext(true); // 새로운 달의 데이터를 가져오기 위해 리셋
  }, [year, month]);

  useEffect(() => {
    const getHistory = async () => {
      if (!hasNext || isFetching) return;

      setIsFetching(true);

      const tempY = year.toString().padStart(4, '0');
      const tempM = month.toString().padStart(2, '0');

      try {
        const fetchData = await fetchHistory({
          yearMonth: `${tempY}-${tempM}`,
          page: page,
          size: 20,
        });

        setHistoryData((prevData) => {
          const existingIds = new Set(
            prevData.histories.map((h) => h.historyId)
          );
          const newHistories = fetchData.histories.filter(
            (h) => !existingIds.has(h.historyId)
          );

          return {
            ...fetchData,
            histories: [...prevData.histories, ...newHistories],
          };
        });

        setHasNext(fetchData.page < fetchData.totalPages);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setIsFetching(false);
      }
    };

    getHistory();
  }, [year, month, page, hasNext, isFetching]);

  // 스크롤 이벤트 등록
  useEffect(() => {
    const handleScroll = () => {
      if (isFetching || !hasNext) return;
      const { scrollTop, scrollHeight, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight - 100) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, hasNext]);

  let lastPrintedDate = '';

  return (
    <div className='p-6 space-y-8 mb-28'>
      <div className='fixed top-0 left-0 pt-6 px-6 w-full bg-background z-50'>
        <NavHeader location={'하나 지갑 내역'} beforePageUrl={'/home'} />
      </div>

      <div
        className='w-full h-full flex flex-col items-center gap-4'
        style={{ marginTop: '4rem' }}
      >
        <div className='w-full flex flex-row gap-x-4 justify-start items-center'>
          <div className='flex flex-row gap-x-4 font-SCDream5 text-[1.25rem]'>
            <Image src={monthLeft} alt={'monthLeft'} onClick={minusDate} />
            {year}년 {month}월
            <Image src={monthRight} alt={'monthRight'} onClick={plusDate} />
          </div>
          <div className='font-SCDream8 text-[1.375rem]'>
            {historyData.totalExpense.toLocaleString()}원
          </div>
        </div>

        <Section height='22rem'>
          <div className='w-full flex flex-col items-center gap-y-2'>
            <div className='w-[95%] flex justify-between'>
              <div className='flex flex-col gap-y-2'>
                <div className='font-SCDream5 text-lg'>
                  한 달에 평균 {''}
                  {formatCurrency(
                    Math.floor(monthlyData.averageExpense / 10000) * 10000
                  )}
                  을 써요
                </div>

                <div className='font-SCDream3 -mt-1'>
                  현재 {monthlyData.currentBalance.toLocaleString()}원 남았어요
                </div>
              </div>
              <div className='-mr-6'>
                <Image src={shopingBag} alt='shopingBag' />
              </div>
            </div>

            <div className='w-[95%] pt-2'>
              <VerticalBarGraph items={monthlyData.monthlyExpenses} />
            </div>
          </div>
        </Section>

        <div className='w-full'>
          {historyData.histories.map((h, idx) => {
            let currentDate = h.historyDateTime.split('T')[0]; // 날짜만 추출
            currentDate =
              Number(currentDate.split('-')[1]) +
              '월 ' +
              Number(currentDate.split('-')[2]) +
              '일';
            let dateHeader = null;

            if (currentDate !== lastPrintedDate) {
              dateHeader = (
                <div className='font-SCDream4 text-[.9375rem] mt-3'>
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

        {isFetching && (
          <div className='h-full'>
            <LoadingIcon />
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AccountDetailItem from '@/components/molecules/AccountDetailItem';
import Btn from '@/components/atoms/Btn';
import { type TAccountDetailItemProps } from '@/types/componentTypes';
import HanaBankLogo from '@/assets/HanaBankLogo.svg';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavHeader } from '@/components/molecules/NavHeader';
import { fetchAccountData, transferFunds } from '@/api';

export default function Deposit() {
  const router = useRouter();
  const [mainAccount, setMainAccount] = useState<TAccountDetailItemProps>();
  const [otherAccounts, setOtherAccounts] = useState<TAccountDetailItemProps[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<{ [key: number]: string }>({});
  const [isExceeding, setIsExceeding] = useState<boolean>(false);
  const searchParams = useSearchParams();
  const initialAmount = searchParams.get('amount') || '';

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const data = await fetchAccountData();
        setMainAccount(data.mainAccount);
        setOtherAccounts(data.otherAccounts);
      } catch (error) {
        console.error('계좌 목록 불러오기 오류:', error);
      }
    };

    loadAccountData();
  }, []);

  useEffect(() => {
    if (initialAmount) {
      const updatedAmounts = otherAccounts.reduce(
        (acc, _, idx) => ({ ...acc, [idx]: initialAmount }),
        {}
      );
      setAmounts(updatedAmounts); // 모든 계좌에 초기 금액 설정
    }
  }, [initialAmount, otherAccounts]);

  const handleSelectAccount = (index: number, checked: boolean) => {
    setSelectedIndex(checked ? index : null);
  };

  const handleAmountChange = (
    index: number,
    isExceeding: boolean,
    amount?: string
  ) => {
    setIsExceeding(isExceeding);
    if (!isExceeding && amount !== undefined) {
      setAmounts((prev) => ({ ...prev, [index]: amount }));
    }
  };

  const handleComplete = async () => {
    if (selectedIndex === null || !mainAccount) {
      return;
    }

    const amount = parseFloat(amounts[selectedIndex]?.replace(/,/g, '') || '0');

    try {
      const fromAccount = otherAccounts[selectedIndex];
      const response = await transferFunds(
        Number(fromAccount.accountId),
        Number(mainAccount.accountId),
        amount
      );

      router.push(
        `/home/wallet/deposit/finished?transferData=${encodeURIComponent(JSON.stringify(response.data))}`
      );
    } catch (error) {
      console.error('이체 실패:', error);
    }
  };

  const btnVariant =
    selectedIndex !== null &&
    !isExceeding &&
    amounts[selectedIndex] &&
    parseFloat(amounts[selectedIndex]?.replace(/,/g, '') || '0') > 0
      ? 'default'
      : 'beforeChooseAccount';

  return (
    <div className='flex flex-col h-screen p-6'>
      <div className='sticky top-0 z-10'>
        <div className='fixed top-0 left-0 pt-6 px-6 w-full bg-background z-50'>
          <NavHeader location={'하나 월급통장 채우기'} beforePageUrl={'.'} />
        </div>

        <div className='mb-2 px-2' style={{ marginTop: '4rem' }}>
          <div className='text-[1.25rem] font-SCDream5 mb-2'>입금계좌</div>

          {mainAccount && (
            <div className='p-3 bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col gap-1'>
              <div className='h-12 flex gap-2 mt-1 ml-1'>
                <Image
                  className='w-11 h-11'
                  src={HanaBankLogo}
                  alt='Hana Logo'
                  width={50}
                  height={50}
                />
                <div className='ml-1'>
                  <div className='font-SCDream5 text-[1.1rem] mb-1'>
                    {mainAccount.accountName}
                  </div>
                  <div className='font-SCDream3 text-[0.9rem]'>
                    {mainAccount.accountNumber.replace(
                      /(\d{6})(\d{2})(\d{5})/,
                      '$1-$2-$3'
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right font-SCDream8 text-[1.25rem] mr-4 mb-2'>
                {Math.trunc(mainAccount.balance).toLocaleString()} 원
              </div>
            </div>
          )}
        </div>
        <div className='mb-2 mt-5 px-2'>
          <div className='text-[1.25rem] font-SCDream5'>출금계좌 선택</div>
        </div>
      </div>

      <div className='flex-1 overflow-y-auto px-2 mb-32'>
        <div className='flex flex-col gap-5 pb-[10vh]'>
          <div className='p-2 bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col gap-1 items-center'>
            {otherAccounts.map((acc, idx) => (
              <AccountDetailItem
                accountId={acc.accountId}
                key={idx}
                bank={acc.bank}
                accountNumber={acc.accountNumber}
                accountName={acc.accountName}
                balance={acc.balance}
                isAccountChecked={selectedIndex === idx}
                onSelect={(checked) => handleSelectAccount(idx, checked)}
                onAmountChange={(exceeding, amount) =>
                  handleAmountChange(idx, exceeding, amount)
                }
                defaultAmount={initialAmount}
              />
            ))}
          </div>
        </div>
      </div>

      <div className='fixed bottom-5 left-0 w-full flex justify-center mb-32'>
        <div className='w-[85%] flex justify-center'>
          <Btn
            text='채우기 완료'
            variant={btnVariant}
            onClick={handleComplete}
          />
        </div>
      </div>

      <style jsx global>{`
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none; /* Internet Explorer 10+ */
        }
      `}</style>
    </div>
  );
}

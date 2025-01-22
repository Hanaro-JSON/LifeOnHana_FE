'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AccountDetailItem from '@/components/molecules/AccountDetailItem';
import Btn from '@/components/atoms/Btn';
import { type TAccountDetailItemProps } from '@/types/componentTypes';
import HanaBankLogo from '@/assets/HanaBankLogo.svg';
import { useRouter } from 'next/navigation';
import { NavHeader } from '@/components/molecules/NavHeader';
import { fetchAccountData } from '@/api';

export default function Deposit() {
  const router = useRouter();
  const [mainAccount, setMainAccount] = useState<TAccountDetailItemProps>();
  const [otherAccounts, setOtherAccounts] = useState<TAccountDetailItemProps[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isExceeding, setIsExceeding] = useState<boolean>(false);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>('');

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
    fetchAccountData();
  }, []);

  const handleSelectAccount = (index: number, checked: boolean) => {
    setSelectedIndex(checked ? index : null);
  };

  const handleComplete = () => {
    if (isExceeding) {
      alert('출금 금액을 조절해주세요.');
      return;
    }
    if (
      !withdrawalAmount ||
      parseInt(withdrawalAmount.replace(/,/g, ''), 10) <= 0
    ) {
      alert('출금 금액을 입력하세요!');
      return;
    }
    if (selectedIndex === null) {
      alert('출금 계좌를 먼저 선택하세요!');
      return;
    }
    router.push('deposit/finished');
  };

  const btnVariant =
    selectedIndex !== null &&
    !isExceeding &&
    withdrawalAmount &&
    parseInt(withdrawalAmount.replace(/,/g, ''), 10) > 0
      ? 'default'
      : 'beforeChooseAccount';

  return (
    <div className='flex flex-col h-screen px-3'>
      <div className='sticky top-0 z-10'>
        <div className='pt-6'>
          <NavHeader location={'하나 월급통장 채우기'} beforePageUrl={'..'} />
        </div>

        <div className='mb-2 px-2'>
          <div className='text-[1.25rem] font-SCDream5 mb-2'>입금계좌</div>

          {mainAccount && (
            <div className='p-4 bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col gap-1'>
              <div className='h-8 flex gap-2 mt-1 ml-1'>
                <Image
                  className='w-11 h-11'
                  src={HanaBankLogo}
                  alt='Hana Logo'
                  width={50}
                  height={50}
                />
                <div className='ml-1'>
                  <div className='font-SCDream5 text-[1rem] mb-1'>
                    {mainAccount.accountName}
                  </div>
                  <div className='font-SCDream3 text-[.8125rem]'>
                    {mainAccount.accountNumber.replace(
                      /(\d{6})(\d{2})(\d{5})/,
                      '$1-$2-$3'
                    )}
                  </div>
                </div>
              </div>
              <div className='text-right font-SCDream5 text-[1rem] mr-4 mb-2'>
                {mainAccount.balance.toLocaleString()} 원
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
                key={idx}
                bank={acc.bank}
                accountNumber={acc.accountNumber}
                accountName={acc.accountName}
                balance={acc.balance}
                isAccountChecked={selectedIndex === idx}
                onSelect={(checked) => handleSelectAccount(idx, checked)}
                onAmountChange={(exceeding) => {
                  setIsExceeding(exceeding);
                  if (!exceeding) {
                    setWithdrawalAmount(acc.balance.toString());
                  }
                }}
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

      {/* y축 스크롤 안보이게 */}
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

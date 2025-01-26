'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import AccountDetailItem from '@/components/molecules/AccountDetailItem';
import Btn from '@/components/atoms/Btn';
import { type TAccountDetailItemProps } from '@/types/componentTypes';
import HanaBankLogo from '@/assets/HanaBankLogo.svg';
import { NavHeader } from '@/components/molecules/NavHeader';
import { fetchAccountData, fetchWallet, fetchLumpsum } from '@/api';
import { useRouter, useSearchParams } from 'next/navigation';

export default function OtherAccount() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otherAccounts, setOtherAccounts] = useState<TAccountDetailItemProps[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<{ [key: number]: string }>({});
  const [isExceeding, setIsExceeding] = useState<boolean>(false);
  const [walletAmount, setWalletAmount] = useState<number>(0);

  const initialAmount = searchParams.get('amount') || '';
  const initialReason = searchParams.get('reason') || '';
  const initialReasonDetail = searchParams.get('reasonDetail') || '';

  useEffect(() => {
    const getWallet = async () => {
      try {
        const fetchData = await fetchWallet();
        setWalletAmount(fetchData.walletAmount);
      } catch (error) {
        console.error('Error fetching:', error);
      }
    };
    getWallet();
  }, []);

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const data = await fetchAccountData();
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
    if (selectedIndex === null || !amounts[selectedIndex]) {
      alert('계좌와 금액을 선택해주세요.');
      return;
    }

    const account = otherAccounts[selectedIndex];
    const amount = parseFloat(amounts[selectedIndex].replace(/,/g, '')) || 0;

    try {
      const requestData = {
        amount,
        source: 'OTHER', // 없으면 호출 안됨
        reason: initialReason, // 없으면 호출 안됨
        reasonDetail: initialReasonDetail, // 상세 이유
        accountId: Number(account.accountId),
      };
      const response = await fetchLumpsum(requestData);

      if (response.code === 200) {
        const { balance } = response.data; // 응답에서 balance 추출
        router.push(
          `/home/lumpsum/otherAccount/otherAccountFinished?transferData=${encodeURIComponent(
            JSON.stringify({
              fromAccount: account,
              toAccount: {
                bank: 'HANA',
                accountName: '하나 지갑',
              },
              amount,
              balance,
            })
          )}`
        );
      } else {
        alert(response.message || '이체 요청이 실패했습니다.');
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      alert('요청 처리 중 오류가 발생했습니다.');
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
    <div className='flex flex-col h-screen px-6 pt-6'>
      <div className='sticky z-10'>
        <NavHeader
          location={'타계좌에서 하나 지갑으로 입금하기'}
          beforePageUrl={'..'}
        />

        <div className='mb-2 px-2'>
          <div className='text-[1.25rem] font-SCDream5 mb-2'>입금계좌</div>

          <div className='p-4 bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col gap-1'>
            <div className='h-8 flex gap-2 mt-1 ml-1'>
              <Image
                className='w-9 h-9'
                src={HanaBankLogo}
                alt='Hana Logo'
                width={50}
                height={50}
              />
              <div className='ml-1'>
                <div className='font-SCDream5 text-[1.1rem] mb-1'>
                  하나 지갑
                </div>
              </div>
            </div>
            <div className='text-right font-SCDream8 text-[1rem] mr-4 mb-2'>
              {walletAmount.toLocaleString()} 원
            </div>
          </div>
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
    </div>
  );
}

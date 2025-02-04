'use client';

import { useEffect, useState } from 'react';
import AccountDetailItem from '@/components/molecules/AccountDetailItem';
import Btn from '@/components/atoms/Btn';
import { type TAccountDetailItemProps } from '@/types/componentTypes';
import { NavHeader } from '@/components/molecules/NavHeader';
import { fetchAccountData, fetchLumpsum } from '@/api';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function OtherAccount() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otherAccounts, setOtherAccounts] = useState<TAccountDetailItemProps[]>(
    []
  );
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [amounts, setAmounts] = useState<{ [key: number]: string }>({});
  const [isExceeding, setIsExceeding] = useState<boolean>(false);

  const initialAmount = searchParams.get('amount') || '';
  const initialReason = searchParams.get('reason') || '';
  const initialReasonDetail = searchParams.get('reasonDetail') || '';

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
      setAmounts(updatedAmounts);
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
      toast({
        title: '계좌와 금액을 선택해주세요.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
      return;
    }

    const account = otherAccounts[selectedIndex];
    const amount = parseFloat(amounts[selectedIndex].replace(/,/g, '')) || 0;

    try {
      const requestData = {
        amount,
        source: 'OTHER',
        reason: initialReason,
        reasonDetail: initialReasonDetail,
        accountId: Number(account.accountId),
      };
      const response = await fetchLumpsum(requestData);

      if (response.code === 200) {
        const { balance } = response.data;
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
        toast({
          title: '이체 요청이 실패했습니다.',
          className:
            'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
        });
      }
    } catch (error) {
      console.error('API 요청 오류:', error);
      toast({
        title: '요청 처리 중 오류가 발생했습니다.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
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
          beforePageUrl={'.'}
        />
      </div>

      <div className='mb-2 mt-5 px-2'>
        <div className='text-[1.25rem] font-SCDream5 mb-4'>출금계좌 선택</div>
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

      <div className='fixed bottom-3 left-0 w-full flex justify-center mb-32'>
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

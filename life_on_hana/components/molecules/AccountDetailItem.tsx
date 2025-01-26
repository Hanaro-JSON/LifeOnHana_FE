import { useState, useEffect, ChangeEvent } from 'react';
import Image from 'next/image';
import AccountCheckNo from '@/assets/MydataCheckNo.svg';
import AccountCheckYes from '@/assets/MydataCheckYes.svg';
import HanaBankLogo from '@/assets/HanaBankLogo.svg';
import NonghyupBankLogo from '@/assets/NonghyupBankLogo.svg';
import ShinhanBankLogo from '@/assets/ShinhanBankLogo.svg';
import WooriBankLogo from '@/assets/WooriBankLogo.svg';
import TossBankLogo from '@/assets/TossBankLogo.svg';
import NaverBankLogo from '@/assets/NaverBankLogo.svg';
import KakaoBankLogo from '@/assets/KakaoBankLogo.svg';
import KBBankLogo from '@/assets/KBBankLogo.svg';
import { type TAccountDetailItemProps } from '@/types/componentTypes';

export default function AccountDetailItem({
  // accountId,
  bank,
  accountNumber,
  accountName,
  balance,
  isAccountChecked = false,
  onSelect,
  onAmountChange,
  defaultAmount,
}: TAccountDetailItemProps) {
  const [checked, setChecked] = useState<boolean>(isAccountChecked);
  const [withdrawalAmount, setWithdrawalAmount] = useState<string>(
    defaultAmount || ''
    // ''
  );
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    setChecked(isAccountChecked);
  }, [isAccountChecked]);

  const toggleAccount = () => {
    const newVal = !checked;
    setChecked(newVal);
    onSelect?.(newVal);
  };

  const formatNumber = (value: string) => {
    if (!value) return '';
    const numericValue = value.replace(/\D/g, '');
    return Number(numericValue).toLocaleString('en-US');
  };

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, '');
    const formattedValue = formatNumber(rawValue);

    setWithdrawalAmount(formattedValue);

    const numericAmount = parseInt(rawValue, 10);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setErrorMessage('0보다 큰 값을 입력하세요.');
      onAmountChange?.(true, formattedValue);
      return;
    }

    if (numericAmount > balance) {
      setErrorMessage('출금 가능 금액을 초과했습니다.');
      onAmountChange?.(true, formattedValue);
    } else {
      setErrorMessage('');
      onAmountChange?.(false, formattedValue);
    }
  };

  const bankLogoMap: Record<string, string> = {
    HANA: HanaBankLogo,
    NH: NonghyupBankLogo,
    SHINHAN: ShinhanBankLogo,
    WOORI: WooriBankLogo,
    TOSS: TossBankLogo,
    NAVER: NaverBankLogo,
    KAKAO: KakaoBankLogo,
    KB: KBBankLogo,
  };

  const accountFormatMap: Record<string, (account: string) => string> = {
    HANA: (account) => account.replace(/(\d{6})(\d{2})(\d{5})/, '$1-$2-$3'),
    NH: (account) => account.replace(/(\d{3})(\d{6})(\d{3})/, '$1-$2-$3'),
    SHINHAN: (account) => account.replace(/(\d{3})(\d{3})(\d{6})/, '$1-$2-$3'),
    WOORI: (account) => account.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3'),
    TOSS: (account) => account.replace(/(\d{3})(\d{3})(\d{6})/, '$1-$2-$3'),
    NAVER: (account) => account.replace(/(\d{3})(\d{6})(\d{3})/, '$1-$2-$3'),
    KAKAO: (account) => account.replace(/(\d{4})(\d{4})(\d{4})/, '$1-$2-$3'),
    KB: (account) =>
      account.length === 12
        ? account.replace(/(\d{3})(\d{3})(\d{6})/, '$1-$2-$3')
        : account.replace(/(\d{3})(\d{2})(\d{6})/, '$1-$2-$3'),
  };

  const formattedAccountNumber =
    accountFormatMap[bank]?.(accountNumber) || accountNumber;

  const bankLogo = bankLogoMap[bank] || HanaBankLogo;

  return (
    <div className='w-[24.5625rem] flex flex-col justify-between relative p-1 border-b'>
      <div className='flex items-center mb-1 mt-1'>
        <Image
          className='w-7 h-7 -mt-5'
          src={bankLogo}
          alt={`${bank} Logo`}
          width={20}
          height={15}
        />
        <div className='flex flex-col ml-2'>
          <div className='text-[1.25rem] font-SCDream4'>{accountName}</div>
          <div className='text-[1.0625rem] font-SCDream3'>
            {formattedAccountNumber}
          </div>
        </div>
      </div>
      <div className='flex justify-between mb-2 text-[.9rem]'>
        <div className='font-SCDream3 ml-9'></div>
        <div className='font-SCDream8 text-[1.25rem]'>
          {balance.toLocaleString()} 원
        </div>
      </div>

      {checked && (
        <div className='mt-4'>
          <div className='text-[1rem] font-SCDream3'>출금금액</div>
          {errorMessage && (
            <div className='text-rose-500 text-[.9rem] mt-1'>
              {errorMessage}
            </div>
          )}
          <div className='flex items-center justify-start mb-4'>
            <input
              type='text'
              defaultValue={defaultAmount}
              onChange={handleAmountChange}
              placeholder={`${balance.toLocaleString()}`}
              className='mt-2 w-[95%] h-[2.3rem] p-2 border border-hanapurple rounded-md text-right text-[1.25rem] font-SCDream8 focus:outline-none focus:border-hanapurple focus:border-2'
            />
            <div className='ml-2 text-[1.1rem] font-SCDream5 mt-2'>원</div>
          </div>
        </div>
      )}

      <div className='absolute top-3 right-[0.1rem] w-[1.7rem] h-[1.7rem]'>
        <Image
          src={checked ? AccountCheckYes : AccountCheckNo}
          alt={checked ? 'Account Checked' : 'Account Not Checked'}
          width={20}
          height={20}
          onClick={toggleAccount}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
}

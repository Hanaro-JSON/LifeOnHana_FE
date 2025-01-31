// import { useState } from 'react';
import Image from 'next/image';
import MydataCheckNo from '@/assets/MydataCheckNo.svg';
import MydataCheckYes from '@/assets/MydataCheckYes.svg';
import HanaBankLogo from '@/assets/HanaBankLogo.svg';
import NonghyupBankLogo from '@/assets/NonghyupBankLogo.svg';
import ShinhanBankLogo from '@/assets/ShinhanBankLogo.svg';
import WooriBankLogo from '@/assets/WooriBankLogo.svg';
import TossBankLogo from '@/assets/TossBankLogo.svg';
import NaverBankLogo from '@/assets/NaverBankLogo.svg';
import KakaoBankLogo from '@/assets/KakaoBankLogo.svg';
import KBBankLogo from '@/assets/KBBankLogo.svg';
import { type TConnectBankItemProps } from '@/types/componentTypes';

export default function ConnectBankItem({
  bankName,
  onToggle,
  checked = false,
}: TConnectBankItemProps) {
  const toggleMydata = () => {
    onToggle(!checked);
  };

  const bankLogoMap: Record<string, string> = {
    HANA: HanaBankLogo,
    NH: NonghyupBankLogo,
    SHINHAN: ShinhanBankLogo,
    KB: KBBankLogo,
    WOORI: WooriBankLogo,
    TOSS: TossBankLogo,
    NAVER: NaverBankLogo,
    KAKAO: KakaoBankLogo,
  };

  const bankNameMap: Record<string, string> = {
    HANA: '하나은행',
    NH: '농협은행',
    SHINHAN: '신한은행',
    KB: '국민은행',
    WOORI: '우리은행',
    TOSS: '토스뱅크',
    NAVER: '네이버뱅크',
    KAKAO: '카카오뱅크',
  };

  const bankLogo = bankLogoMap[bankName];
  const displayBankName = bankNameMap[bankName];

  return (
    <div
      onClick={toggleMydata}
      className='w-full h-[3.75rem] flex items-center justify-between relative cursor-pointer'
    >
      <div className='flex items-center'>
        <Image src={bankLogo} alt={`${bankName} Logo`} width={16} height={16} />
        <div className='ml-2 text-black text-[1.125rem] font-SCDream3'>
          {displayBankName}
        </div>
      </div>

      <Image
        src={checked ? MydataCheckYes : MydataCheckNo}
        alt={checked ? 'Mydata Checked' : 'Mydata Not Checked'}
        width={16}
        height={16}
        className='cursor-pointer'
      />
    </div>
  );
}

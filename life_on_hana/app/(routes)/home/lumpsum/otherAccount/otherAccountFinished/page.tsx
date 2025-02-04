'use client';

import Image from 'next/image';
import Btn from '@/components/atoms/Btn';
import { useRouter, useSearchParams } from 'next/navigation';
import { NavHeader } from '@/components/molecules/NavHeader';
import AnimatedCheck from '@/components/animation/AnimatedCheck';
import HanaBankLogo from '@/assets/HanaBankLogo.svg';
import NonghyupBankLogo from '@/assets/NonghyupBankLogo.svg';
import ShinhanBankLogo from '@/assets/ShinhanBankLogo.svg';
import WooriBankLogo from '@/assets/WooriBankLogo.svg';
import TossBankLogo from '@/assets/TossBankLogo.svg';
import NaverBankLogo from '@/assets/NaverBankLogo.svg';
import KakaoBankLogo from '@/assets/KakaoBankLogo.svg';
import KBBankLogo from '@/assets/KBBankLogo.svg';

export default function OtherAccountFinished() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL로 전달된 데이터 파싱
  const transferData = (() => {
    try {
      const rawData = searchParams.get('transferData');
      return rawData ? JSON.parse(decodeURIComponent(rawData)) : null;
    } catch (error) {
      console.error('데이터 파싱 오류:', error);
      return null;
    }
  })();

  if (!transferData) {
    router.push('/'); // 데이터가 없으면 기본 페이지로 이동
    return null;
  }

  const { fromAccount, toAccount, amount, balance } = transferData;

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

  const getBankLogo = (bank: string) => bankLogoMap[bank] || '';

  const formatAccountNumber = (bank: string, accountNumber: string) =>
    accountFormatMap[bank]?.(accountNumber) || accountNumber;

  const handleConfirm = () => {
    router.push('/home'); // 확인 버튼 클릭 시 홈으로 이동
  };

  return (
    <div className='flex flex-col h-screen px-6 pt-6'>
      <div className='sticky z-10'>
        <NavHeader
          location={'타계좌에서 하나 지갑으로 입금하기'}
          beforePageUrl={'.'}
        />
      </div>

      <div className='flex-1 flex flex-col items-center pt-3'>
        <div className='p-4 bg-white rounded-[.9375rem] shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)] flex flex-col gap-1 min-h-[52rem] w-[95%]'>
          <div className='flex justify-center my-2'>
            <AnimatedCheck />
          </div>

          <div className='text-center'>
            <div className='font-Hana2bold text-[1.5rem]'>
              채우기가 완료되었습니다.
            </div>
            <div className='w-[100%] mx-auto border-b-2 border-b-hanagray my-5'></div>

            <div className='flex justify-between w-full font-SCDream3 text-[1.1rem] mb-2'>
              <span>신청결과</span>
              <span>정상 출금</span>
            </div>
            <div className='flex justify-between w-full font-SCDream3 text-[1.1rem]'>
              <span>입금금액</span>
              <span>{amount.toLocaleString()} 원</span>
            </div>
          </div>

          <div className='w-[100%] mx-auto border-b-2 border-b-hanagray my-5'></div>

          <div className='flex justify-between w-full font-SCDream3 text-[1.1rem]'>
            <span>입금계좌</span>
            <span>
              <div className='flex items-center'>
                {/* <Image
                      className='w-10 h-10'
                      src={getBankLogo(toAccount.bank)}
                      alt={`${toAccount.bank} Logo`}
                      width={60}
                      height={60}
                    /> */}
                <div>
                  <div className='font-SCDream3 text-[1rem] text-right'>
                    {toAccount.accountName}
                  </div>
                  {/* <div className='text-[0.9rem]'>하나지갑이라 계좌번호x</div> */}
                </div>
              </div>
              <div className='text-right mt-1 mr-2'>
                <span className='font-SCDream4 text-[1rem]'>
                  {/* 잔액 {toAccount.balance.toLocaleString()} 원 */}
                </span>
              </div>
            </span>
          </div>

          <div className='w-[100%] mx-auto border-b-2 border-b-hanagray my-5'></div>

          <div className='text-[.8rem] font-SCDream2'>
            이체결과 오류 혹은 오픈뱅킹 공동시스템으로 인한 지연이 발생할 경우,
            고객센터(0000-1111)로 문의해 주세요.
          </div>

          <div className='mt-4 font-SCDream3 text-[1.1rem]'>출금계좌</div>
          <div className='w-[100%] mx-auto border-b-2 border-b-hanagray my-2'></div>

          <div className='flex items-center gap-2 ml-2'>
            <Image
              className='w-9 h-9 mb-2'
              src={getBankLogo(fromAccount.bank)}
              alt={`${fromAccount.bank} Logo`}
              width={50}
              height={50}
            />
            <div>
              <div className='font-SCDream3 text-[1.1rem]'>
                {fromAccount.accountName}
              </div>
              <div className='text-[1rem]'>
                {formatAccountNumber(
                  fromAccount.bank,
                  fromAccount.accountNumber
                )}
              </div>
            </div>
          </div>
          <div className='text-right font-SCDream4 text-[1rem] mt-1 mr-2'>
            {balance.toLocaleString()} 원
          </div>
        </div>
      </div>

      <div className='fixed bottom-5 left-0 w-full flex justify-center mb-24'>
        <div className='w-[85%] flex justify-center'>
          <Btn text='확인' variant='default' onClick={handleConfirm} />
        </div>
      </div>
    </div>
  );
}

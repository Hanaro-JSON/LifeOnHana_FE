import Image from 'next/image';
import signoutbtn from '@/assets/signoutBtn.svg';
export function LogoHeader({ isMain }: { isMain: boolean }) {
  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='w-full flex items-center font-Hana2heavy text-[1.5625rem] text-hanapurple'>
        LIFE on HANA
      </div>
      {isMain === true ? (
        <Image src={signoutbtn} alt='signoutbtn' width={18} height={18} />
      ) : (
        <></>
      )}
    </div>
  );
}

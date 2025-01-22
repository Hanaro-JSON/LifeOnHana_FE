import Image from 'next/image';
import signoutbtn from '@/assets/signoutBtn.svg';
import { mySignOut } from '@/actions/myauth';

export function LogoHeader({ isMain }: { isMain: boolean }) {
  const handleSignout = () => {
    mySignOut();
  };

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='w-full flex items-center font-Hana2heavy text-[1.5625rem] text-hanapurple'>
        LIFE on HANA
      </div>
      {isMain === true && (
        <button onClick={handleSignout}>
          <Image src={signoutbtn} alt='signoutbtn' width={18} height={18} />
        </button>
      )}
    </div>
  );
}

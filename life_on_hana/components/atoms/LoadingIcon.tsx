import Image from 'next/image';
import loadingIcon from '@/assets/loadingIcon.svg';

export default function LoadingIcon() {
  return (
    <div className='fixed inset-0 bg-gray-500 bg-opacity-20 z-40 flex justify-center items-center'>
      <Image
        src={loadingIcon}
        alt='로딩중'
        style={{ width: 50, height: 'auto' }}
        priority
        className='z-50 absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%] spin-animation'
      />
    </div>
  );
}

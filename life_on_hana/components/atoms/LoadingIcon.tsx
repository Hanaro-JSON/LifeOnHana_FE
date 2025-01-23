import Image from 'next/image';
import loadingIcon from '@/assets/loadingIcon.svg';
import { type TLoadingIconProps } from '@/types/componentTypes';

export default function LoadingIcon({
  bgColor = 'gray-500',
}: TLoadingIconProps) {
  return (
    <div
      className={`fixed inset-0 bg-${bgColor} bg-opacity-20 z-40 flex justify-center items-center`}
    >
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

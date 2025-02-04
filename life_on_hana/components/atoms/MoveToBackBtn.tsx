import Image from 'next/image';
import moveToBackBtn from '@/assets/moveToBackBtn.svg';
import { useRouter } from 'next/navigation';

export default function MoveToBackBtn() {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.back()}
        src={moveToBackBtn}
        alt='이전페이지로 이동'
        priority
        className='fixed bottom-[8%] right-[5%] w-[3.125rem] mb-5 cursor-pointer'
      />
    </>
  );
}

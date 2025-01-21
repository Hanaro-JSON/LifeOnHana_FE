import Image from 'next/image';
import moveToTopBtn from '@/assets/moveToTopBtn.svg';

export default function MoveToTopBtn() {
  const handleScroll = () => {
    // 우선 특정 컨테이너(.overflow-y-auto)를 대상으로 스크롤 시도
    const scrollableContainer = document.querySelector('.overflow-y-auto');

    if (scrollableContainer) {
      scrollableContainer.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    } else {
      // 특정 컨테이너가 없으면 전역 스크롤(window)로 처리
      if (!window.scrollY) return;

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    }
  };

  return (
    <>
      <Image
        onClick={handleScroll}
        src={moveToTopBtn}
        alt='Logo'
        className='fixed bottom-[14%] right-[5%] w-[3.125rem] mb-5 cursor-pointer'
      />
    </>
  );
}

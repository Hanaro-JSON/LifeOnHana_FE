import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function WhilickItemLoading() {
  return (
    <>
      <div className='snap-start w-full min-h-screen scroll-snap-align-start px-[1.5rem] relative bg-gradient-to-b from-hanalightpurple to-[#B399C8] flex flex-col items-center justify-center'>
        <div className='z-50 absolute top-24 flex flex-col space-y-6 items-center'>
          {/* 칼럼 제목 */}
          <div className='px-[1.5rem]'>
            <div className='w-full rounded-lg'>
              <Skeleton
                style={{ width: 'calc(100vw - 3rem)' }}
                height={50}
                baseColor='#F4EBFB'
                highlightColor='#e7ddee'
              />
            </div>
          </div>

          {/* 칼럼 요약내용 */}
          <div className='gap-5 px-[1.5rem] flex flex-col items-center w-full'>
            <div className='w-full max-w-[100rem] p-2 rounded-lg'>
              <Skeleton
                style={{ width: 'calc(100vw - 3rem)' }}
                height={150}
                baseColor='#F4EBFB'
                highlightColor='#e7ddee'
              />
            </div>
          </div>
        </div>

        {/* 전문 보기 버튼 */}
        <div className='absolute bottom-36'>
          <div className='w-full p-2 rounded-lg'>
            <Skeleton
              width={300}
              height={50}
              baseColor='#F4EBFB'
              highlightColor='#e7ddee'
            />
          </div>
        </div>

        {/* 하단 스크롤 */}
        <div className='absolute bottom-28 z-50'>
          <svg
            width='20'
            height='20'
            viewBox='0 0 45 33'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M45 3.26318L39.7125 0L22.5 10.5995L5.2875 0L0 3.26318L22.5 17.1491L45 3.26318Z'
              fill='white'
              className='whilick-down-1'
            ></path>
            <path
              d='M45 18.5132L39.7125 15.25L22.5 25.8495L5.2875 15.25L0 18.5132L22.5 32.3991L45 18.5132Z'
              fill='white'
              className='whilick-down-2'
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}

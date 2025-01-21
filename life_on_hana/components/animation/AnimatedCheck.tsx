'use client';

import { motion } from 'framer-motion';

export default function AnimatedCheck() {
  const circleVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  // const glowVariants = {
  //   hidden: { scale: 0, opacity: 0 },
  //   visible: {
  //     scale: [1.2, 1.5],
  //     opacity: [0.8, 0],
  //     transition: { duration: 1.2, ease: "easeOut" },
  //   },
  // };

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.5 }, // 시작을 원 그리기 이후로 설정
    },
  };

  return (
    <div className='relative flex justify-center items-center'>
      {/* 글로우 효과 */}
      {/* <motion.div
        className="absolute rounded-full"
        style={{
          width: "120px",
          height: "120px",
          backgroundColor: "rgba(77, 0, 181, 0.3)",
          filter: "blur(10px)",
        }}
        variants={glowVariants}
        initial="hidden"
        animate="visible"
      /> */}

      {/* 원과 체크 마크 */}
      <motion.svg
        width='110'
        height='110'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        initial='hidden'
        animate='visible'
      >
        {/* 원 테두리가 12시 방향부터 시계반대방향으로 그려짐 */}
        <motion.circle
          cx='30'
          cy='30'
          r='23'
          stroke='#4D00B5'
          strokeWidth='4'
          strokeLinecap='round' // 라인의 끝을 둥글게
          strokeDasharray='150 150' // 대시 배열로 빈 공간 없앰
          strokeDashoffset='150' // 시계 반대 방향
          style={{
            transform: 'rotate(90deg)', // 원의 시작점 조정
            transformOrigin: 'center', // 중심을 기준으로 회전
          }}
          variants={circleVariants}
        />
        {/* 체크 마크 (왼쪽에서 오른쪽으로 그려짐) */}
        <motion.path
          d='M20 32L27 39L43 23' // 좌측에서 우측으로 진행
          fill='none'
          stroke='#4D00B5'
          strokeWidth='4'
          strokeLinecap='round'
          strokeLinejoin='round'
          variants={checkVariants}
        />
      </motion.svg>
    </div>
  );
}

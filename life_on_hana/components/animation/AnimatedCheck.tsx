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

  const checkVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.5 },
    },
  };

  return (
    <div className='relative flex justify-center items-center'>
      <motion.svg
        width='110'
        height='110'
        viewBox='0 0 60 60'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
        initial='hidden'
        animate='visible'
      >
        <motion.circle
          cx='30'
          cy='30'
          r='23'
          stroke='#4D00B5'
          strokeWidth='4'
          strokeLinecap='round'
          strokeDasharray='150 150'
          strokeDashoffset='150'
          style={{
            transform: 'rotate(90deg)',
            transformOrigin: 'center',
          }}
          variants={circleVariants}
        />
        <motion.path
          d='M20 32L27 39L43 23'
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

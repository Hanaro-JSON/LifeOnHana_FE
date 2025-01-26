'use client';

import Image from 'next/image';
import Section from '../atoms/Section';
import Link from 'next/link';
import arrowRight from '@/assets/arrow-right.svg';
import { type TMainSectionProps } from '@/types/componentTypes';
import { useState, useEffect } from 'react';

const variants = [
  {
    label: '/assets/mainSectionTitleA.svg',
    src: '/assets/mainSectionImgA.svg',
  },
  {
    label: '/assets/mainSectionTitleB.svg',
    src: '/assets/mainSectionImgB.svg',
  },
  {
    label: '/assets/mainSectionTitleC.svg',
    src: '/assets/mainSectionImgC.svg',
  },
  {
    label: '/assets/mainSectionTitleD.svg',
    src: '/assets/mainSectionImgD.svg',
  },
  {
    label: '/assets/mainSectionTitleE.svg',
    src: '/assets/mainSectionImgE.svg',
  },
];

export default function MainSection({ name, walletAmount }: TMainSectionProps) {
  const [randomItem, setRandomItem] = useState(variants[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * variants.length);
    setRandomItem(variants[randomIndex]);
  }, []);

  return (
    <>
      <Section height='18rem'>
        <div className=' my-3 relative'>
          <div className='w-full flex flex-col items-center'>
            <Image
              src={randomItem.label}
              alt='제목'
              className='w-[80%] mb-7'
              width={300}
              height={300}
              style={{ width: 'auto', height: 'auto' }}
            />
            <div className='w-full flex items-center justify-start relative'>
              <div>
                <div className='font-SCDream3 text-[1.25rem]'>{name}님이</div>
                <div className='font-SCDream3 text-[1.4375rem]'>
                  이번 달 받은&nbsp;
                  <span className='text-hanagreen font-SCDream8'>하나</span>
                  월급
                </div>
                <div className='font-SCDream8 text-[1.75rem]'>
                  {walletAmount}만원
                </div>
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <Link href={'/home/wallet'}>
              <button className='font-SCDream3 text-[1rem] flex items-center '>
                <span className='text-hanapurple'>월급&nbsp;</span>설정하러 가기
                <Image
                  src={arrowRight}
                  alt='Right Arrow'
                  className='ml-2'
                  style={{ width: 'auto', height: 'auto' }}
                />
              </button>
            </Link>
          </div>
          <Image
            src={randomItem.src}
            alt='mainSectionImg'
            width={100}
            height={100}
            priority
            className='absolute bottom-5 right-0'
          />
        </div>
      </Section>
    </>
  );
}

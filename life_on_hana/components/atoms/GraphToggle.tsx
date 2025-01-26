import { type TGraphToggleProps } from '@/types/componentTypes';
import React, { useState } from 'react';

export default function GraphToggle({
  initialState = 'bar',
  onToggle,
}: TGraphToggleProps) {
  const [selected, setSelected] = useState<'bar' | 'circle'>(initialState);

  const handleToggle = (newState: 'bar' | 'circle') => {
    if (newState !== selected) {
      setSelected(newState);
      onToggle?.(newState);
    }
  };

  return (
    <div className='w-[5.0625rem] h-[2.0625rem] relative cursor-pointer select-none'>
      <div className='w-[5.0625rem] h-[2.0625rem] rounded-[1.40625rem] border border-hanapurple absolute' />

      <div
        className={`absolute h-[2.0625rem] rounded-[1.40625rem] transition-all duration-300 ${
          selected === 'bar'
            ? 'w-[2.925rem] left-0'
            : 'w-[2.25rem] left-[2.8125rem]'
        } bg-hanapurple`}
      />

      <div
        className={`absolute left-[.5625rem] top-[50%] transform -translate-y-1/2 text-center text-[.9375rem] font-SCDream3 z-10 transition-colors duration-300 ${
          selected === 'bar' ? 'text-white' : 'text-hanapurple'
        }`}
        style={{ background: 'transparent' }}
        onClick={() => handleToggle('bar')}
      >
        막대
      </div>

      <div
        className={`absolute left-[3.45rem] top-[50%] transform -translate-y-1/2 text-center text-[.9375rem] font-SCDream3 z-10 transition-colors duration-300 ${
          selected === 'circle' ? 'text-white' : 'text-hanapurple'
        }`}
        style={{ background: 'transparent' }}
        onClick={() => handleToggle('circle')}
      >
        원
      </div>
    </div>
  );
}

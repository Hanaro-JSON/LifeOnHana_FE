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
    <div className='w-[3.375rem] h-[1.375rem] relative cursor-pointer select-none'>
      <div className='w-[3.375rem] h-[1.375rem] rounded-[.9375rem] border border-hanapurple absolute' />

      <div
        className={`absolute h-[1.375rem] rounded-[.9375rem] transition-all duration-300 ${
          selected === 'bar'
            ? 'w-[1.95rem] left-0'
            : 'w-[1.5rem] left-[1.875rem]'
        } bg-hanapurple`}
      />

      <div
        className={`absolute left-[.375rem] top-[50%] transform -translate-y-1/2 text-center text-[.625rem] font-SCDream3 z-10 transition-colors duration-300 ${
          selected === 'bar' ? 'text-white' : 'text-hanapurple'
        }`}
        style={{ background: 'transparent' }}
        onClick={() => handleToggle('bar')}
      >
        막대
      </div>

      <div
        className={`absolute left-[2.3rem] top-[50%] transform -translate-y-1/2 text-center text-[.625rem] font-SCDream3 z-10 transition-colors duration-300 ${
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

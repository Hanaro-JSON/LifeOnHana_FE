import { type TAdjustBtnProps } from '@/types/componentTypes';
import { useEffect, useRef, useState } from 'react';

export default function AdjustBtn({
  id,
  isOpen: isOpenedBtn,
  typeCeilTxt = '말',
  typeBottomTxt = '속도',
  first = '0.5x',
  second = '1x',
  third = '2x',
  currentValue = '2',
  mX = 80,
  mY = 90,
  onToggle = () => {},
  onChange,
}: TAdjustBtnProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 닫기
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        isOpenedBtn &&
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onToggle('');
      }
    };

    document.addEventListener('click', handleOutsideClick);
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isOpenedBtn, onToggle]);

  const [isOpen, setIsOpen] = useState(false);

  const toggleSelector = () => {
    setIsOpen(!isOpenedBtn);
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (onChange) onChange(value);
  };

  return (
    <div
      ref={wrapperRef}
      onClick={() => onToggle(id)}
      className='relative inline-block'
      style={{
        left: `${mX}%`,
        top: `${mY}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <button
        onClick={toggleSelector}
        className={`${
          isOpen && isOpenedBtn
            ? 'bg-white text-purple-600 border shadow-purple-100'
            : 'bg-purple-600 text-white'
        } rounded-full size-16 font-semibold shadow-md`}
      >
        {typeCeilTxt} <br />
        {typeBottomTxt}
      </button>

      {isOpenedBtn && (
        <div className='h-16 -z-20 absolute -left-[13rem] -top-0 transform bg-white rounded-2xl shadow-lg p-4 w-64'>
          <div className='flex items-center justify-between'>
            <input
              type='range'
              min='1'
              max='3'
              defaultValue={currentValue}
              onChange={handleFontSizeChange}
              className='w-[80%] h-2 bg-gradient-to-r from-purple-600 to-purple-200 rounded-sm custom-range'
            />
          </div>
          <div className='w-[80%] flex justify-between text-center bg-white text-sm mt-2 font-bold'>
            <p className='bg-white'>{first}</p>
            <p className='bg-white'>{second}</p>
            <p className='bg-white'>{third}</p>
          </div>
        </div>
      )}
    </div>
  );
}

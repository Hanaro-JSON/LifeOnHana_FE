import { type TLoginLabelInputProps } from '@/types/componentTypes';
import Image from 'next/image';
import React, { forwardRef, useState } from 'react';
import visible from '@/assets/visible.png';
import invisible from '@/assets/invisible.png';

const LoginLabelInput = forwardRef<HTMLInputElement, TLoginLabelInputProps>(
  ({ label, id, type = 'text', name, placeholder, errorMsg }, ref) => {
    // 비밀번호 숨김 기능
    const [inputState, setInputState] = useState(name === 'pw');
    const changeInputStateEvent = () => {
      if (name !== 'pw') return;
      setInputState((prev) => !prev);
    };

    return (
      <div className='flex flex-col mb-2 w-full'>
        <label className='text-[1.125rem] mb-2' htmlFor={id}>
          {label}
        </label>
        <div className='w-full relative'>
          <input
            ref={ref}
            id={id}
            type={name === 'pw' ? (inputState ? 'password' : 'text') : type}
            name={name}
            placeholder={placeholder}
            className={`w-full bg-[#F4EBFB] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
              errorMsg === name
                ? 'border-[#F74C21] focus:ring-[#F74C21]'
                : 'border-gray-300 focus:ring-[#4D00B5]'
            }`}
          />
          {name === 'pw' && (
            <button
              type='button'
              onClick={changeInputStateEvent}
              className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 flex justify-center items-center'
            >
              <Image
                src={inputState ? visible : invisible}
                alt={inputState ? '보임' : '안보임'}
              />
            </button>
          )}
        </div>
      </div>
    );
  }
);

LoginLabelInput.displayName = 'LoginLabelInput';

export default LoginLabelInput;

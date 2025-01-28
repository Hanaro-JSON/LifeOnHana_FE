'use client';

import Image from 'next/image';
import Btn from '@/components/atoms/Btn';
import logo from '@/assets/logo.svg';
import logoText from '@/assets/logoText.svg';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import LoginLabelInput from '@/components/molecules/LoginLabelInput';
import { useToast } from '@/hooks/use-toast';
import { authenticate } from '@/actions/myauth';

type TDataProps = {
  accessTocken: string;
  refreshToken: string;
  userId: string;
  isFirst: boolean;
};

export default function SigninPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null);
  const passwordInputRef = useRef<HTMLInputElement | null>(null);

  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const result = await authenticate(formData);

    if (result.error) {
      setErrorMsg(result.error);

      // 특정 필드로 포커스 이동
      if (result.error === 'id' && idInputRef.current) {
        idInputRef.current.focus();
      } else if (result.error === 'pw' && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    }

    const authId = idInputRef.current?.value || '';
    const password = passwordInputRef.current?.value || '';

    if (!authId || !password) {
      setErrorMsg('id');
      toast({
        title: '아이디와 비밀번호를 입력해주세요.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-white text-hanapurple w-[90%] text-center rounded-xl p-7',
      });
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/auth/signin`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ authId, password }),
          }
        );

        const data: {
          code: number;
          status: string;
          message: string;
          data: TDataProps;
        } = await response.json();

        // isFirst 아닐 때
        if (data.code === 200 && !data.data.isFirst) {
          localStorage.setItem('user', JSON.stringify(data.data));
          router.replace('/home');
        }
        // isFirst 일 때
        else if (data.code === 200 && data.data.isFirst) {
          localStorage.setItem('user', JSON.stringify(data.data));
          router.replace('/signin/mydata');
        }
        // id 틀림
        if (data.code === 401) {
          setErrorMsg('pw');
        }
        // 전부 틀림
        else if (data.code === 404) {
          setErrorMsg('id');
        }
      } catch (error) {
        console.error('로그인 서버 에러: ', error);
      }
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow flex justify-center items-center'>
        <div className='flex flex-col pb-44 items-center justify-center w-full max-w-md px-4'>
          <div className='flex flex-col items-center mb-6'>
            <Image src={logo} alt='Logo' className='w-32 mb-2' priority />
            <Image src={logoText} alt='LogoText' className='mb-2' priority />
            <div className='font-SCDream5 text-[#A6A6A6] text-xs'>
              소득 크레바스에 맞닥뜨린 당신을 구해줄 든든한 동반자
            </div>
          </div>
          <form
            onSubmit={handleLoginSubmit}
            className='w-full max-w-72 flex flex-col pt-5'
          >
            <div className='mb-10 space-y-4'>
              <LoginLabelInput
                ref={idInputRef}
                label='아이디'
                id='id'
                type='text'
                name='id'
                placeholder='아이디'
                errorMsg={errorMsg === 'id' ? 'id' : undefined}
              />
              <LoginLabelInput
                ref={passwordInputRef}
                label='비밀번호'
                id='password'
                type='password'
                name='pw'
                placeholder='비밀번호'
                errorMsg={errorMsg === 'pw' ? 'pw' : undefined}
              />
            </div>

            <Btn text='로그인' type='submit' />
          </form>
        </div>
      </div>
    </div>
  );
}

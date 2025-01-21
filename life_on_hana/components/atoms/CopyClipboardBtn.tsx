import { useEffect, useState } from 'react';
import Image from 'next/image';
import CopyClipboardBtnImg from '@/assets/CopyClipboardBtnImg.svg';
import { useToast } from '@/hooks/use-toast';

export default function CopyClipboardBtn() {
  const [currentUrl, setCurrentUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    if (currentUrl) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast({
            title: '클립보드에 복사했습니다.',
            className:
              'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-hanapurple text-white w-[90%] text-center opacity-80 rounded-xl p-4',
          });
        })
        .catch((err) => {
          console.error('주소 복사 실패:', err);
          toast({
            title: '클립보드에 복사를 실패했습니다.',
            className:
              'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-hanapurple text-white w-[90%] text-center opacity-80 rounded-xl p-4',
          });
        });
    } else {
      toast({
        title: '클립보드에 복사를 실패했습니다.',
        className:
          'flex justify-center fixed top-[80%] left-[50%] transform -translate-x-[50%] bg-hanapurple text-white w-[90%] text-center opacity-80 rounded-xl p-4',
      });
    }
  };

  return (
    <div>
      <Image
        src={CopyClipboardBtnImg}
        alt='주소 복사 버튼'
        width={24}
        height={24}
        className='mb-3 cursor-pointer'
        onClick={handleCopy}
      />
    </div>
  );
}

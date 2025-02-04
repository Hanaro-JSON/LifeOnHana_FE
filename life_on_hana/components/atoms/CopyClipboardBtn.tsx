import { useEffect, useState } from 'react';
import Image from 'next/image';
import CopyClipboardBtnImg from '@/assets/CopyClipboardBtnImg.svg';
import { useToast } from '@/hooks/use-toast';

export default function CopyClipboardBtn({
  articleId,
}: {
  articleId?: number;
}) {
  const [currentUrl, setCurrentUrl] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(
        articleId
          ? `${window.location.origin}/column/${articleId}`
          : window.location.href
      );
    }
  }, [articleId]);

  const handleCopy = () => {
    if (currentUrl) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast({
            title: '클립보드에 복사했습니다',
            className: 'toast-default',
          });
        })
        .catch((err) => {
          console.error('주소 복사 실패:', err);
          toast({
            title: '클립보드에 복사를 실패했습니다',
            className: 'toast-danger',
          });
        });
    } else {
      toast({
        title: '클립보드에 복사를 실패했습니다',
        className: 'toast-danger',
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

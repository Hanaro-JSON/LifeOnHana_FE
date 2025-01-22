import Image from 'next/image';
import signoutbtn from '@/assets/signoutBtn.svg';
import { mySignOut } from '@/actions/myauth';
import { NEXT_PUBLIC_API_TOKEN } from '@/api';
import { useRouter } from 'next/navigation';

export function LogoHeader({ isMain }: { isMain: boolean }) {
  const router = useRouter();
  const handleSignout = async () => {
    // next-auth
    mySignOut();

    // 일반 로그아웃
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_WEBSOCKET_URL}/api/auth/signout`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${NEXT_PUBLIC_API_TOKEN}`,
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        console.error('API error:', response.status);
        return;
      }

      const data: {
        code: number;
        status: string;
        message: string;
        data: null;
      } = await response.json();

      if (data.code === 200) {
        localStorage.removeItem('user');
        router.replace('/');
      } else if (data.code === 400) {
        console.error(data.message);
      }
    } catch (error) {
      console.error('API error:', error);
    }
  };

  return (
    <div className='flex flex-row justify-between items-center'>
      <div className='w-full flex items-center font-Hana2heavy text-[1.5625rem] text-hanapurple'>
        LIFE on HANA
      </div>
      {isMain === true && (
        <button onClick={handleSignout}>
          <Image src={signoutbtn} alt='signoutbtn' width={18} height={18} />
        </button>
      )}
    </div>
  );
}

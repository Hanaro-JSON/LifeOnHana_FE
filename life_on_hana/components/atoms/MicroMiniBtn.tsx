import { type TMicroMiniBtnProps } from '@/types/componentTypes';

export default function MicroMiniBtn({
  num,
  text,
  onClick,
}: TMicroMiniBtnProps) {
  if (num) {
    return (
      <>
        <div className='flex justify-center items-center border border-hanapurple bg-hanalightpurple text-hanapurple rounded-xl w-[2rem] h-[1.25rem] text-[.9375rem] pt-1'>
          {num}
        </div>
      </>
    );
  } else {
    return (
      <button
        onClick={onClick}
        className='font-SCDream3 text-hanapurple flex justify-center items-center bg-hanalightpurple rounded-xl text-[.9375rem] px-2 py-1'
      >
        {text}
      </button>
    );
  }
}

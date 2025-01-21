export default function MicroMiniBtn({ num }: { num: number }) {
  return (
    <>
      <div className='flex justify-center items-center border border-hanapurple bg-hanalightpurple rounded-xl w-[2rem] h-[1.25rem] text-xs'>
        {num}
      </div>
    </>
  );
}

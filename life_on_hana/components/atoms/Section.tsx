import { type TSectionProps } from '@/types/componentTypes';

export default function Section({
  hasShadow = true,
  children,
  height = '',
  bgColor = 'white',
  shadowColor = '',
}: TSectionProps) {
  const shadowClass = hasShadow
    ? shadowColor === ''
      ? 'shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]'
      : `shadow-[0px_4px_3px_${shadowColor}]`
    : '';

  return (
    <div className='w-full relative h-fit' style={{ height }}>
      <div
        className={`w-full left-0 top-0 bg-${bgColor} rounded-[.9375rem] p-6 flex items-center justify-center ${shadowClass}`}
        style={{ height }}
      >
        {children}
      </div>
    </div>
  );
}

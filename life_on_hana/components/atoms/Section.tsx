import { type TSectionProps } from "@/types/componentTypes";

export default function Section({
  hasShadow = true,
  children,
  height = "7.4375rem",
}: TSectionProps) {
  const shadowClass = hasShadow
    ? "shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]"
    : "";

  return (
    <div className="w-full relative" style={{ height }}>
      <div
        className={`w-full left-0 top-0 absolute bg-white rounded-[.9375rem] p-6 flex items-center ${shadowClass}`}
        style={{ height }}
      >
        {children}
      </div>
    </div>
  );
}

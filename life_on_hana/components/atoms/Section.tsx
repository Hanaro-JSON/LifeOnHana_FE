import { type TSectionProps } from "@/types/componentTypes";

export default function Section({
  hasShadow = true,
  children,
  height = "7.4375rem",
<<<<<<< HEAD
  bgColor = "white",
  shadowColor = "",
}: TSectionProps) {
  const shadowClass = hasShadow
    ? shadowColor === ""
      ? "shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]"
      : `shadow-[0px_4px_3px_${shadowColor}]`
=======
}: TSectionProps) {
  const shadowClass = hasShadow
    ? "shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]"
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
    : "";

  return (
    <div className="w-full relative" style={{ height }}>
      <div
<<<<<<< HEAD
<<<<<<< HEAD
        className={`w-full left-0 top-0 bg-${bgColor} rounded-[.9375rem] p-6 flex items-center justify-center ${shadowClass}`}
=======
        className={`w-full left-0 top-0 absolute bg-white rounded-[.9375rem] p-6 flex items-center ${shadowClass}`}
>>>>>>> fab1a52 ([feat] 🐳 추천 상품 제외 home 퍼블 완료)
=======
        className={`w-full left-0 top-0 absolute bg-white rounded-[.9375rem] p-6 flex items-center justify-center ${shadowClass}`}
>>>>>>> 6ab8194 ([feat] 🐳 home api 연결 전 작업 완료)
        style={{ height }}
      >
        {children}
      </div>
    </div>
  );
}

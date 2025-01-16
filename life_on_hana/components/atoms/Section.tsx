import React, { ReactNode } from "react";

type TSectionProps = {
  hasShadow?: boolean;
  children?: ReactNode; // children을 받을 수 있도록 ReactNode 타입 추가
};

export default function Section({ hasShadow = true, children }: TSectionProps) {
  const shadowClass = hasShadow ? "shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]" : "";

  return (
    <div className="w-full h-[7.4375rem] relative ">
      <div
        className={`border-4 border-rose-600 w-full h-[7.4375rem] left-0 top-0 absolute bg-white rounded-[.9375rem] p-6 flex items-center ${shadowClass}`}
      >
        {children}
      </div>
    </div>
  );
}

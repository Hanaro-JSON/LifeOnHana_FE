<<<<<<< HEAD
type TSectionProps = {
    shadow?: boolean;
};

export default function Section({ shadow = true }: TSectionProps) {
    const shadowClass = shadow ? "shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]" : "";
=======
import React from "react";

type TSectionProps = {
    hasShadow?: boolean;
};

export default function Section({ hasShadow = true }: TSectionProps) {
    const shadowClass = hasShadow ? "shadow-[0rem_.25rem_.25rem_0rem_rgba(0,0,0,0.25)]" : "";
>>>>>>> 2fcc33b ([feat] 🐣 Section 추가)

    return (
    <div className="w-[22.6875rem] h-[8.4375rem] relative">
        <div className={`w-[22.6875rem] h-[8.4375rem] left-0 top-0 absolute bg-white rounded-[.9375rem] ${shadowClass}`} />
    </div>
    );
}

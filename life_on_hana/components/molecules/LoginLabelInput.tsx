import React, { forwardRef } from "react";

type TLoginLabelInputProps = {
  label: string;
  id: string;
  type: "text" | "password"; // 표준 HTML 속성에 맞춤
  name: string;
  placeholder: string;
  errorMsg?: string;
};

const LoginLabelInput = forwardRef<HTMLInputElement, TLoginLabelInputProps>(
  ({ label, id, type, name, placeholder, errorMsg }, ref) => {
    return (
      <div className="flex flex-col mb-2">
        <label className="text-xs mb-2" htmlFor={id}>
          {label}
        </label>
        <input
          ref={ref}
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`bg-[#F4EBFB] px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
            errorMsg === name
              ? "border-[#F74C21] focus:ring-[#F74C21]"
              : "border-gray-300 focus:ring-[#4D00B5]"
          }`}
        />
      </div>
    );
  }
);

LoginLabelInput.displayName = "LoginLabelInput";

export default LoginLabelInput;

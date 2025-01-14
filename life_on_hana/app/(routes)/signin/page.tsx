"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import logoDetail from "@/assets/logoDetail.png";
import logoText from "@/assets/logoText.png";
import { authenticate } from "@/actions/myauth";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

function SigninCard() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const idInputRef = useRef<HTMLInputElement | null>(null); // ID 입력 필드 참조
  const passwordInputRef = useRef<HTMLInputElement | null>(null); // PW 입력 필드 참조

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setErrorMsg(null);

    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const result = await authenticate(formData);

    if (result.error) {
      setErrorMsg(result.error);

      // 특정 필드로 포커스 이동
      if (result.error === "id" && idInputRef.current) {
        idInputRef.current.focus();
      } else if (result.error === "pw" && passwordInputRef.current) {
        passwordInputRef.current.focus();
      }
    } else if (result.redirectUrl) {
      router.replace(result.redirectUrl);
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-col pb-44 items-center justify-center w-full max-w-md px-4">
          <div className="flex flex-col items-center mb-6">
            <Image src={logo} alt="Logo" className="w-20 mb-2" />
            <Image src={logoText} alt="LogoText" className="mb-2" />
            <Image src={logoDetail} alt="LogoDetail" className="mb-2" />
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-64 flex flex-col pt-5">
            <label className="text-xs mb-1" htmlFor="id">
              아이디
            </label>
            <input
              ref={idInputRef} // ID 필드를 ref로 연결
              id="id"
              type="text"
              name="id"
              placeholder="아이디"
              className={`bg-white mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errorMsg === "id"
                  ? "border-red-500 focus:ring-red-500 focus:bg-red-50"
                  : "border-gray-300 focus:ring-purple-500 focus:bg-purple-50"
              }`}
            />
            <label className="text-xs mb-1" htmlFor="password">
              비밀번호
            </label>
            <input
              ref={passwordInputRef} // PW 필드를 ref로 연결
              id="password"
              type="password"
              name="pw"
              placeholder="비밀번호"
              className={`bg-white mb-4 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                errorMsg === "pw"
                  ? "border-red-500 focus:ring-red-500 focus:bg-red-50"
                  : "border-gray-300 focus:ring-purple-500 focus:bg-purple-50"
              }`}
            />
            <Button
              type="submit"
              className="w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition"
            >
              로그인
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninCard;

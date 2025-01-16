"use client";

import Image from "next/image";
import Btn from "@/components/atoms/Btn";
import logo from "@/assets/logo.svg";
import logoText from "@/assets/logoText.svg";
import { authenticate } from "@/actions/myauth";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import LoginLabelInput from "@/components/molecules/LoginLabelInput";

function SigninPage() {
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
    }
    // is_first 여부에 따라 "/signin/mydata" , "/home" 으로 분리할 것
    else {
      router.replace("/signin/mydata");
    }
  };

  return (
    <div className="bg-gray-100 flex flex-col min-h-screen">
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-col pb-44 items-center justify-center w-full max-w-md px-4">
          <div className="flex flex-col items-center mb-6">
            <Image src={logo} alt="Logo" className="w-32 mb-2" />
            <Image src={logoText} alt="LogoText" className="mb-2" />
            <div className="font-SCDream5 text-[#A6A6A6] text-xs">
              소득 크레바스에 맞닥뜨린 당신을 구해줄 든든한 동반자
            </div>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-72 flex flex-col pt-5">
            <div className="mb-10 space-y-4">
              <LoginLabelInput
                ref={idInputRef}
                label="아이디"
                id="id"
                type="text"
                name="id"
                placeholder="아이디"
                errorMsg={errorMsg === "id" ? "id" : undefined}
              />
              <LoginLabelInput
                ref={passwordInputRef}
                label="비밀번호"
                id="password"
                type="password"
                name="pw"
                placeholder="비밀번호"
                errorMsg={errorMsg === "pw" ? "pw" : undefined}
              />
            </div>

            <Btn text="로그인" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;

"use client";
import { LoginHeader } from "@/components/LoginHeader";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";
import logoDetail from "@/assets/logoDetail.png";
import logoText from "@/assets/logoText.png";

function SigninCard() {
  return (
    <div className="bg-gray-100">
      <LoginHeader />
      <div className="flex h-screen pb-44 justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full max-w-md px-4">
          <div className="flex flex-col items-center mb-6">
            <Image src={logo} alt="Logo" className="w-20 mb-2" />
            <Image src={logoText} alt="LogoText" className="mb-2" />
            <Image src={logoDetail} alt="LogoDetail" className="mb-2" />
          </div>
          <form className="w-full max-w-64 flex flex-col pt-5">
            <label className="text-xs mb-1" htmlFor="id">
              아이디
            </label>
            <input
              id="id"
              type="text"
              placeholder="아이디"
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <label className="text-xs mb-1" htmlFor="password">
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호"
              className="mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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

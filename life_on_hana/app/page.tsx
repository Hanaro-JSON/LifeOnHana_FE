import Image from "next/image";

export default function RootPage() {
  return (
    <>
      <div className="relative bg-hanapurple min-h-screen flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <Image src="/assets/logo_white.svg" alt="로고" width={90} height={90} />
          <Image src="/assets/logoText_white.svg" alt="LogoText" className="mt-2 mb-2" width={1000} height={1000} />
          <div className="font-SCDream5 text-[.8125rem] text-white">
            소득 크레바스에 맞닥뜨린 당신을 구해줄 든든한 동반자
          </div>
        </div>
        <Image src="/assets/logo_json.svg" alt="팀로고" width={100} height={100} className="absolute bottom-10" />
      </div>
    </>
  );
}

import hanaMark from "@/assets/hanaMark.png";
import Image from "next/image";

export function LoginHeader() {
  return (
    <div className="h-14 pt-4">
      <hr className="border-0 border-t-[4px] border-[#26B2A7] pb-4" />
      <div className="flex flex-col justify-center items-center">
        <Image src={hanaMark} alt="Logo" className="w-10 mb-2" />
      </div>
    </div>
  );
}

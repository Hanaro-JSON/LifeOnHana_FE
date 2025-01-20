import Image from "next/image";
import arrowLeft from "@/assets/arrow-left.svg";
import Link from "next/link";
export function NavHeader({
  location,
  beforePageUrl,
}: {
  location: string;
  beforePageUrl: string;
}) {
  return (
<<<<<<< HEAD
    <div className="flex flex-row items-center mb-6">
=======
    <div className="flex flex-row items-center">
>>>>>>> 80c83aa ([feat] 🐳 NavHeader component 생성)
      <Link href={beforePageUrl}>
        <Image src={arrowLeft} alt="before" width={10} height={10} />
      </Link>
      <div className="w-full justify-center flex items-center font-Hana2bold text-[1.5625rem]">
        {location}
      </div>
    </div>
  );
}

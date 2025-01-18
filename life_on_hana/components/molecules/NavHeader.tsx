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
    <div className="flex flex-row items-center">
      <Link href={beforePageUrl}>
        <Image src={arrowLeft} alt="before" width={10} height={10} />
      </Link>
      <div className="w-full justify-center flex items-center font-Hana2bold text-[1.5625rem]">
        {location}
      </div>
    </div>
  );
}

import Image from "next/image";
import moveToBackBtn from "@/assets/moveToBackBtn.svg";
import { useRouter } from "next/navigation";

export default function MoveToBackBtn() {
  const router = useRouter();

  return (
    <>
      <Image
        onClick={() => router.back()}
        src={moveToBackBtn}
        alt="이전페이지로 이동"
        className="fixed bottom-[2%] right-[5%] w-[3.125rem] mb-5 cursor-pointer"
      />
    </>
  );
}

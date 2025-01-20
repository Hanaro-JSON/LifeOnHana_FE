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
<<<<<<< HEAD
<<<<<<< HEAD
        className="fixed bottom-[8%] right-[5%] w-[3.125rem] mb-5 cursor-pointer"
=======
        className="fixed bottom-[2%] right-[5%] w-[3.125rem] mb-5 cursor-pointer"
        priority
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
        className="fixed bottom-[8%] right-[5%] w-[3.125rem] mb-5 cursor-pointer"
>>>>>>> 0b1551a ([feat] 🐣 columnDetail 페이지 추가)
      />
    </>
  );
}

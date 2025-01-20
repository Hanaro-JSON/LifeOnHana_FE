import { useState } from "react";
import HeartNo from "@/assets/HeartNo.svg";
import HeartYes from "@/assets/HeartYes.svg";
import Image from "next/image";
import { type TIsLikeProps } from "@/types/componentTypes";

export default function IsLike({ likeCount, isLiked: initialIsLiked = false }: TIsLikeProps) {
  const [isLiked, setIsLiked] = useState<boolean>(initialIsLiked);
  const [count, setCount] = useState<number>(likeCount);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setCount(isLiked ? count - 1 : count + 1);
  };

  return (
    <>
      <div className="flex flex-col items-center">
        <div className="relative flex justify-center items-center">
          <Image
            src={isLiked ? HeartYes : HeartNo}
            alt={isLiked ? "Liked" : "Not Liked"}
<<<<<<< HEAD
<<<<<<< HEAD
            width={30}
            height={30}
=======
            width={24}
            height={24}
>>>>>>> d257b51 ([fix] 🐣 column관련 목록과 자세히 보기 동적으로 수정)
=======
            width={30}
            height={30}
>>>>>>> f6439c0 ([feat] 🐿️ Whilick 페이지 생성)
            onClick={toggleLike}
            className="cursor-pointer"
            priority
          />
        </div>
<<<<<<< HEAD
<<<<<<< HEAD
        <div className="mt-1 text-[1rem] text-hanapurple font-SCDream3">{count}</div>
=======
        <div className="mt-1 text-[.7rem] text-hanapurple font-SCDream3">{count}</div>
>>>>>>> d257b51 ([fix] 🐣 column관련 목록과 자세히 보기 동적으로 수정)
=======
        <div className="mt-1 text-[1rem] text-hanapurple font-SCDream3">{count}</div>
>>>>>>> f6439c0 ([feat] 🐿️ Whilick 페이지 생성)
      </div>
    </>
  );
}

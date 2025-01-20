import { useState } from "react";
import HeartNo from "../../assets/HeartNo.svg";
import HeartYes from "../../assets/HeartYes.svg";
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
            width={30}
            height={30}
            onClick={toggleLike}
            className="cursor-pointer"
          />
        </div>
        <div className="mt-1 text-[1rem] text-hanapurple font-SCDream3">{count}</div>
      </div>
    </>
  );
}

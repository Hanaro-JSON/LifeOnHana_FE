import Image from "next/image";
import HeartNo from "@/assets/HeartNo.svg";
import HeartYes from "@/assets/HeartYes.svg";
import { formatDate } from "@/utils/formatDate";
import { type TArticleItemProps } from "@/types/componentTypes";
import { useState } from "react";

export default function ArticleItem({ title, category, published_at, thumbnail_s3_key, is_liked }: TArticleItemProps) {
  const [liked, setLiked] = useState(is_liked);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
    <div className="w-full h-full relative">
      
      <div className="flex gap-4">
<Image
  className="w-[28%] h-[5.2rem] left-[.1rem] top-0 rounded-[.625rem] object-cover"
  src={thumbnail_s3_key}
  alt="Image"
  width={60}
  height={50}
/>
<div className="flex flex-col justify-between w-[70%]">
  <div className="font-SCDream5 text-[1.05rem]">
    {title}
  </div>
  <div className="text-[0.9rem] font-SCDream3">
    {category} / {formatDate(published_at)}
  </div>
</div>

      </div>
      
      
      <div className="absolute right-[1rem] bottom-1" onClick={handleLikeToggle}>
        <Image
          src={liked ? HeartYes : HeartNo}
          alt={liked ? "Liked" : "Not Liked"}
          width={22} 
          height={22}
        />
      </div>
      
      <div className="w-full h-px left-0 bottom-0 mt-1 bg-[#d9d9d9]" />
      
      
<<<<<<< HEAD
=======
    <div className="w-full h-[5rem] relative">
      <div>
        <Image
          className="w-[4.75rem] h-[3.75rem] left-[.1rem] top-0 absolute rounded-[.625rem]"
          src={thumbnail_s3_key}
          alt="Image"
          width={76}
          height={60}
        />
      </div>

      <div className="w-52 left-[6.625rem] top-0 absolute text-black text-sm font-SCDream5">{title}</div>

      <div className="left-[6.625rem] top-[3rem] absolute text-black text-[.625rem] font-SCDream3">
        {category} / {formatDate(published_at)}
      </div>

      <div className="absolute right-[1rem] top-[2rem]" onClick={handleLikeToggle}>
        <Image src={liked ? HeartYes : HeartNo} alt={liked ? "Liked" : "Not Liked"} width={20} height={20} priority />
      </div>

      <div className="w-full h-px left-0 top-[4.3125rem] absolute bg-[#d9d9d9]" />
>>>>>>> 3d64a77 ([style] 🐿️ import 방식 통일)
=======
>>>>>>> c4a3107 ([fix] 🐣 column페이지 크기 및 컴포넌트 조절)
    </div>
  );
}

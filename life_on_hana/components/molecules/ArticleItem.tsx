import Image from "next/image";
import HeartNo from "../../assets/HeartNo.svg";
import HeartYes from "../../assets/HeartYes.svg";
import { formatDate } from "@/utils/formatDate";
import { type TArticleItemProps } from "@/types/componentTypes";
import { useState } from "react";

export default function ArticleItem({ title, category, published_at, thumbnail_s3_key, is_liked }: TArticleItemProps) {
  const [liked, setLiked] = useState(is_liked);

  const handleLikeToggle = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  return (
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
      
      
    </div>
  );
}
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


      <div className="w-52 left-[6.625rem] top-0 absolute text-black text-sm font-SCDream5">
        {title}
      </div>
      
      <div className="left-[6.625rem] top-[3rem] absolute text-black text-[.625rem] font-SCDream3">
        {category} / {formatDate(published_at)}
      </div>
      
      
      <div className="absolute right-[1rem] top-[2rem]" onClick={handleLikeToggle}>
        <Image
          src={liked ? HeartYes : HeartNo}
          alt={liked ? "Liked" : "Not Liked"}
          width={20} 
          height={20}
        />
      </div>
      
      <div className="w-full h-px left-0 top-[4.3125rem] absolute bg-[#d9d9d9]" />
      
      
    </div>
  );
}

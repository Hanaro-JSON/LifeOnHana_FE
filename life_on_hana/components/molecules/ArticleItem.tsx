import Image from "next/image";
import HeartNo from "../../assets/HeartNo.svg";
import HeartYes from "../../assets/HeartYes.svg";
import { formatDate } from "@/utils/formatDate";
import { type TArticleItemProps } from "@/types/componentTypes";

export default function ArticleItem({ title, category, published_at, thumbnail_s3_key, is_liked }: TArticleItemProps) {
  return (
    <div className="w-[21.4375rem] h-[4.375rem] relative">
      <div className="w-5 h-5 left-[19.625rem] top-[2.5rem] absolute" />

      <div className="w-52 left-[6.625rem] top-0 absolute text-black text-sm font-SCDream5">{title}</div>

      <Image
        className="w-[4.75rem] h-[3.75rem] left-[.8125rem] top-0 absolute rounded-[.625rem]"
        src={thumbnail_s3_key}
        alt="Article Image"
        width={76}
        height={60}
      />

      <div className="absolute left-[19.625rem] top-[2.5rem]">
        <Image src={is_liked ? HeartYes : HeartNo} alt={is_liked ? "Liked" : "Not Liked"} width={20} height={20} />
      </div>

      <div className="w-[21.4375rem] h-px left-0 top-[4.3125rem] absolute bg-[#d9d9d9]" />

      <div className="left-[6.625rem] top-[3rem] absolute text-black text-[.625rem] font-SCDream3">
        {category} / {formatDate(published_at)}
      </div>
    </div>
  );
}

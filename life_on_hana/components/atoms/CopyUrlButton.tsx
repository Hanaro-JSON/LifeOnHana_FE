import { useEffect, useState } from "react";
import Image from "next/image";
import CopyClipboardBtnImg from "@/assets/CopyClipboardBtnImg.svg";
import { useToast } from "@/hooks/use-toast";
export default function CopyUrlButton() {
  const [currentUrl, setCurrentUrl] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);
  const handleCopy = () => {
    if (currentUrl) {
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          toast({
            title: "클립보드에 복사했습니다.",
          });
        })
        .catch((err) => {
          console.error("주소 복사 실패:", err);
          toast({
            title: "클립보드에 복사를 실패했습니다.",
          });
        });
    } else {
      toast({
        title: "클립보드에 복사를 실패했습니다.",
      });
    }
  };

  return (
    <div>
      <Image
        src={CopyClipboardBtnImg}
        alt="주소 복사 버튼"
        width={20}
        height={20}
        className="mb-2 cursor-pointer"
        onClick={handleCopy}
      />
    </div>
  );
}

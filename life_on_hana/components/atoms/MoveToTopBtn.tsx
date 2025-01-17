import Image from "next/image";
import moveToTopBtn from "@/assets/moveToTopBtn.svg";

export default function MoveToTopBtn() {
  const handleScroll = () => {
    // 현재 위치가 이미 최상단일 경우 return
    if (!window.scrollY) return;

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Image
        onClick={handleScroll}
        src={moveToTopBtn}
        alt="Logo"
        className="fixed bottom-[14%] right-[5%] w-[3.125rem] mb-5 cursor-pointer"
      />
    </>
  );
}

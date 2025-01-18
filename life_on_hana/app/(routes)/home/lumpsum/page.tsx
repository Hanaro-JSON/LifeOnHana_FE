import { NavHeader } from "@/components/molecules/NavHeader";

export default function lumpsum() {
  return (
    <div className="p-6">
      <NavHeader location={"목돈 가져오기"} beforePageUrl={"/home"} />
    </div>
  );
}

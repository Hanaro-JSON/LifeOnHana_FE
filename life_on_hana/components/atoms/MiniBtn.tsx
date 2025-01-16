import { type TMiniBtnProps } from "@/types/componentTypes";

const getMiniBtnClasses = (variant: string) => {
  switch (variant) {
    case "cancel":
      return "bg-white text-hanapurple border-2 border-hanalightpurple";
    case "default":
      return "bg-hanalightpurple text-hanapurple";
  }
};

export default function MiniBtn({ text, variant = "default" }: TMiniBtnProps) {
  const miniBtnClasses = `${getMiniBtnClasses(
    variant
  )} rounded-[.9375rem] font-SCDream3 px-3 py-1 flex items-center justify-center`;

  return (
    <>
      <button className={miniBtnClasses}>{text}</button>
    </>
  );
}

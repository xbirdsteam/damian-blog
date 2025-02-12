import { MileStoneLineIcon } from "../icons/MileStoneLineIcon";

interface MileStoneItemProps {
  year: string;
  title: string;
  content: string;
}

export default function MileStoneItem({
  year,
  title,
  content,
}: MileStoneItemProps) {
  return (
    <div className="flex relative">
      <div className="w-[1px] bg-white relative left-[10px] top-[10px]" />
      <div className="flex gap-4 items-start pb-10">
        <div className="flex relative top-[10px]">
          <div className="relative w-max flex flex-col items-center">
            <div className="size-5 border-4 border-white rounded-full bg-neutral-primary-text" />
          </div>
          <p className="shrink-0 relative top-[10px]">
            <MileStoneLineIcon />
          </p>
        </div>
        <div className="flex flex-col">
          {year.split(",").map((y, i) => (
            <p
              key={i}
              className="text-white text-display-b-42 leading-none relative"
            >
              {y.trim()}
            </p>
          ))}
        </div>

        <div className="text-white flex-1 relative top-[20px] space-y-[10px]">
          <MileStoneLineIcon />

          <p className="text-title-b-18">{title}</p>
          <p className="text-subheader-r-16 whitespace-pre-wrap">{content}</p>
        </div>
      </div>
    </div>
  );
}

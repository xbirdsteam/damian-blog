import { MileStoneLineIcon } from "../icons/MileStoneLineIcon";

export default function MileStoneItem() {
  return (
    <div className="flex gap-4 items-start">
      <div className="flex">
        <div className="relative w-max flex flex-col items-center">
          <div className="size-5 border-4 border-white rounded-full" />
          <div className="w-[1px] h-[228px] bg-white" />
        </div>
        <p className="shrink-0 relative top-[10px]">
          <MileStoneLineIcon />
        </p>
      </div>
      <p className="text-white text-display-b-42 leading-none relative -translate-y-1/2 top-[10px]">
        2012
      </p>

      <div className="text-white flex-1 relative top-[10px] space-y-[10px]">
        <MileStoneLineIcon />

        <p className="text-title-b-18">A Personal and Professional Shift</p>
        <p className="text-subheader-r-16">
          After years of honing my skills in traditional kitchens—learning to
          adapt to the fast-paced dynamics of professional gastronomy—I made a
          personal transition to vegetarianism. This change had a profound
          impact, not only on my lifestyle but also on the direction of my
          career. It planted the seed for a deeper exploration into the role of
          food in shaping our values and systems.
        </p>
      </div>
    </div>
  );
}

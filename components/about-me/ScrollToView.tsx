import { MouseIcon } from "../icons/MouseIcon";

export default function ScrollToView() {
  return (
    <div className="absolute bottom-[10px] left-[20px] flex justify-center py-[6px] px-3 gap-[6px] rounded-[50px] bg-[rgba(255,255,255,0.16)] cursor-pointer transition-opacity">
      <MouseIcon />
      <span className="text-white text-subheader-r-16">
        Scroll to view more
      </span>
    </div>
  );
}

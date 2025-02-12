import { cn } from "@/lib/utils";

interface IProps {
  step: number;
  isActive?: boolean;
  isDone?: boolean;
}

export default function FormStepLabel({ step, isActive, isDone }: IProps) {
  return (
    <div
      className={cn(
        "size-[30px] text-subheader-m-16 border rounded-full flex justify-center items-center z-10 relative cursor-pointer",
        isActive
          ? "bg-neutral-primary-text text-white border-white"
          : "bg-neutral-text-secondary text-neutral-text-disable border-neutral-text-secondary",
        isDone && "text-neutral-primary-text bg-white border-white"
      )}
    >
      {step}
    </div>
  );
}

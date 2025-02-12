import { ArrowLeftWhiteIcon } from "@/components/icons/ArrowLeftWhiteIcon";
import { Button } from "@/components/ui/button";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";
import FormStepLabel from "./FormStepLabel";
import { useRouter } from "next/navigation";

export default function FormNavigation() {
  const { currentStep } = useConsultancyFormStore();
  const router = useRouter();
  return (
    <div className="h-[58px] bg-neutral-primary-text">
      {/* Navigation Content */}
      <div className="container mx-auto flex h-full items-center">
        <Button
          onClick={() => router.back()}
          className="text-subheader-m-16 text-white font-medium p-0 gap-3"
        >
          <ArrowLeftWhiteIcon />
          <span className="hidden mlg:inline">Back</span>
        </Button>
        <div className="relative hidden mlg:flex flex-1 justify-center">
          <div className="relative flex gap-[30px] items-center">
            <FormStepLabel step={1} isDone={currentStep === 1} />
            <FormStepLabel step={2} isActive={currentStep === 2} />
            <FormStepLabel step={3} isActive={currentStep === 3} />
            <FormStepLabel step={4} isActive={currentStep === 4} />
            <FormStepLabel step={5} isActive={currentStep === 5} />
            <FormStepLabel step={6} isActive={currentStep === 6} />
            <div className="absolute w-full h-[1px] top-1/2 left-0 bg-neutral-text-secondary z-0" />
          </div>
        </div>
      </div>
    </div>
  );
}

import { ConsultancyStep } from "@/types/consultancy";
import { create } from "zustand";

interface FormData {
  [key: string]: string;
}

interface ConsultancyFormStore {
  currentStep: number;
  doneStep: number;
  consultancySteps: ConsultancyStep[];
  formData: {
    [key: number]: FormData;
  };
  setCurrentStep: (step: number) => void;
  setDoneStep: (step: number) => void;
  setConsultancySteps: (steps: ConsultancyStep[]) => void;
  setStepFormData: (step: number, data: FormData) => void;
  updateStepFormValue: (step: number, field: string, value: string) => void;
  isStepComplete: (step: number) => boolean;
}

export const useConsultancyFormStore = create<ConsultancyFormStore>(
  (set, get) => ({
    currentStep: 1,
    doneStep: 1,
    consultancySteps: [],
    formData: {},
    setCurrentStep: (step) => set({ currentStep: step }),
    setDoneStep: (step) => set({ doneStep: step }),
    setConsultancySteps: (steps) => set({ consultancySteps: steps }),
    setStepFormData: (step, data) =>
      set((state) => ({
        formData: {
          ...state.formData,
          [step]: data,
        },
      })),
    updateStepFormValue: (step, field, value) =>
      set((state) => ({
        formData: {
          ...state.formData,
          [step]: {
            ...state.formData[step],
            [field]: value,
          },
        },
      })),
    isStepComplete: (step) => {
      const stepData = get().formData[step] || {};
      return Object.values(stepData).every((value) => value?.trim() !== "");
    },
  })
);

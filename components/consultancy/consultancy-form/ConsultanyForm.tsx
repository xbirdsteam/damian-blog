/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  getConsultancySteps,
  getConsultancySuccessSteps,
  getReceiverEmail,
} from "@/actions/consultancy";
import { Button } from "@/components/ui/button";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import FormNavigation from "./FormNavigation";
import FormStepFive from "./FormStepFive";
import FormStepFour from "./FormStepFour";
import FormStepOne from "./FormStepOne";
import FormStepSix from "./FormStepSix";
import FormStepThree from "./FormStepThree";
import FormStepTwo from "./FormStepTwo";
import SuccessfullSubmit from "./SuccessfullSubmit";
import { isValidPhoneNumber } from "libphonenumber-js";

export default function ConsultanyForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    consultancySteps,
    setConsultancySteps,
    currentStep,
    setCurrentStep,
    formData,
  } = useConsultancyFormStore();

  const { data: successSteps } = useQuery({
    queryKey: ["consultancySuccessSteps"],
    queryFn: getConsultancySuccessSteps,
    staleTime: 1000 * 60 * 60 * 24,
  });

  const { data: steps } = useQuery({
    queryKey: ["consultancySteps"],
    queryFn: getConsultancySteps,
    staleTime: 1000 * 60 * 60 * 24,
  });

  useEffect(() => {
    if (steps) {
      setConsultancySteps(steps);
    }
  }, [steps, setConsultancySteps]);

  const validateStep = (step: number) => {
    const stepData = formData[step] || {};
    const formStep = consultancySteps.find(
      (stepItem) => stepItem.step_number === step
    );
    switch (step) {
      case 1:
        // Check if stepData has exactly 6 fields and is not empty
        if (Object.keys(stepData).length === 0 || Object.keys(stepData).length !== 6) return false;
        // Check if email is valid
        if (
          stepData["Email address"] &&
          !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData["Email address"])
        ) {
          return false;
        }
        // Check if all values in stepData are non-empty strings
        return Object.values(stepData).every((value) => value?.trim());

      case 2:
        // radio_group1, radio_group2, and textarea are required
        return (
          stepData[formStep?.fields.radio_group1.label] &&
          stepData[formStep?.fields.radio_group2.label] &&
          stepData[formStep?.fields.textarea.label]?.trim()
        );

      case 3:
        // At least one checkbox and textarea are required
        return (
          stepData[formStep?.fields.checkbox.label] &&
          stepData[formStep?.fields.textarea.label]?.trim()
        );

      case 4:
        // Both radio groups are required
        return (
          stepData[formStep?.fields.radio_group1.label] &&
          stepData[formStep?.fields.radio_group2.label]
        );

      case 5:
        // All fields are required
        return (
          stepData[formStep?.fields.radio_group1.label] &&
          stepData[formStep?.fields.radio_group2.label] &&
          stepData[formStep?.fields.textarea1.label]?.trim() &&
          stepData[formStep?.fields.textarea2.label]?.trim()
        );

      case 6:
        // Additional information is optional
        return true;

      default:
        return false;
    }
  };

  const formatStepData = (stepData: any, stepFields: any) => {
    const formattedStepData = { ...stepData };

    // Handle radio groups
    ["radio_group1", "radio_group2"].forEach((radioKey) => {
      if (stepFields[radioKey]) {
        const label = stepFields[radioKey].label;
        if (stepData[label] === "Other") {
          formattedStepData[label] = stepData[`${label}_another`] || "Other";
        }
        // Remove the _another field
        delete formattedStepData[`${label}_another`];
      }
    });

    // Handle checkboxes
    if (stepFields.checkbox) {
      const checkboxLabel = stepFields.checkbox.label;
      const selectedOptions = (stepData[checkboxLabel] || "")
        .split(",")
        .map((option: string) => {
          if (option === "Other") {
            return stepData[`${checkboxLabel}_another`] || "Other";
          }
          return option;
        })
        .filter(Boolean)
        .join(",");

      formattedStepData[checkboxLabel] = selectedOptions;
      // Remove the _another field
      delete formattedStepData[`${checkboxLabel}_another`];
    }

    return formattedStepData;
  };

  const validateStepOneField = (stepData: any) => {
    // Get all keys from stepData
    const keys = Object.keys(stepData);
    
    // Check email fields
    const emailField = keys.find(key => key.endsWith('_email'));
    if (emailField && !(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(stepData[emailField]))) {
      toast.error("Please enter a valid email address");
      return false;
    }

    // Check phone fields
    const phoneField = keys.find(key => key.endsWith('_tel'));
    if (phoneField && !isValidPhoneNumber(stepData[phoneField])) {
      toast.error("Please enter a valid phone number");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Check all steps
    const incompleteSteps: number[] = [];
    for (let step = 1; step <= 6; step++) {
      if (!validateStep(step)) {
        incompleteSteps.push(step);
      }
    }

    if (incompleteSteps.length > 0) {
      toast.error("Please complete all required fields", {
        description: `Incomplete steps: ${incompleteSteps.join(", ")}`,
        action: {
          label: "Go to step",
          onClick: () => setCurrentStep(incompleteSteps[0]),
        },
      });
      return;
    }

    try {
      const formattedData = { ...formData };

      // Format data for all steps
      for (let step = 1; step <= 6; step++) {
        const stepFields = consultancySteps[step - 1]?.fields;
        if (stepFields && formattedData[step]) {
          formattedData[step] = formatStepData(formattedData[step], stepFields);
        }
      }
      const receiver_email = await getReceiverEmail();

      if (!receiver_email) {
        toast.error("Receiver email not found");
        return;
      }
      // Send email with formatted data
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          formData: formattedData,
          receiver_email,
          template: "consultancy",
          successSteps,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      toast.success("Form submitted successfully!");
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section>
        <FormNavigation />
        <article className="bg-neutral-background py-[60px]">
          <div className="container mx-auto bg-white p-6 mlg:p-20 space-y-10">
            <SuccessfullSubmit successSteps={successSteps || []} />
          </div>
        </article>
      </section>
    );
  }

  return (
    <section>
      <FormNavigation />
      <article className="bg-neutral-background py-[60px]">
        <div className="container mx-auto bg-white p-6 mlg:p-20 space-y-10">
          {currentStep === 1 && <FormStepOne data={consultancySteps[0]} />}
          {currentStep === 2 && <FormStepTwo data={consultancySteps[1]} />}
          {currentStep === 3 && <FormStepThree data={consultancySteps[2]} />}
          {currentStep === 4 && <FormStepFour data={consultancySteps[3]} />}
          {currentStep === 5 && <FormStepFive data={consultancySteps[4]} />}
          {currentStep === 6 && <FormStepSix data={consultancySteps[5]} />}
          <div className="flex justify-center gap-[14px]">
            {currentStep > 1 && (
              <Button
                variant="outline"
                className="w-[200px]"
                onClick={() => setCurrentStep(currentStep - 1)}
                disabled={isSubmitting}
              >
                Previous
              </Button>
            )}
            {currentStep < 6 ? (
              <Button
                className="text-white w-[200px]"
                onClick={() => {
                  const stepData = formData[currentStep] || {};
                  
                  if (currentStep === 1 && !validateStepOneField(stepData)) {
                    return;
                  }

                  if (validateStep(currentStep)) {
                    setCurrentStep(currentStep + 1);
                  } else {
                    toast.error("Please complete all required fields");
                  }
                }}
                disabled={isSubmitting}
              >
                Next step
              </Button>
            ) : (
              <Button
                className="text-white w-[200px]"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            )}
          </div>
        </div>
      </article>
    </section>
  );
}

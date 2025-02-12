import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ConsultancyStepBaseField, OptionsData } from "@/types/consultancy";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";
import { useState } from "react";

interface StepThreeFields {
  checkbox: OptionsData;
  textarea: {
    label: string;
  };
}

interface IProps {
  data: ConsultancyStepBaseField & {
    fields: StepThreeFields;
  };
}

export default function FormStepThree({ data }: IProps) {
  const { formData, updateStepFormValue } = useConsultancyFormStore();
  const [otherInput, setOtherInput] = useState("");

  if (!data?.fields) return null;
  const currentStepData = formData[data.step_number] || {};

  const handleChange = (name: string, value: string) => {
    updateStepFormValue(data.step_number, name, value);
  };

  const handleCheckboxChange = (option: string, checked: boolean) => {
    const currentSelected = (currentStepData[data.fields.checkbox.label] || "")
      .split(",")
      .filter(Boolean);
    let newSelected;

    if (checked) {
      if (option === "Other") {
        newSelected = [...currentSelected, option];
        // Add the current other input if it exists
        if (otherInput) {
          updateStepFormValue(
            data.step_number,
            `${data.fields.checkbox.label}_another`,
            otherInput
          );
        }
      } else {
        newSelected = [...currentSelected, option];
      }
    } else {
      newSelected = currentSelected.filter((item) => item !== option);
      if (option === "Other") {
        // Clear the other input value
        setOtherInput("");
        updateStepFormValue(
          data.step_number,
          `${data.fields.checkbox.label}_another`,
          ""
        );
      }
    }

    handleChange(data.fields.checkbox.label, newSelected.join(","));
  };

  const handleOtherChange = (value: string) => {
    setOtherInput(value);
    const currentSelected = (currentStepData[data.fields.checkbox.label] || "")
      .split(",")
      .filter(Boolean);

    if (value && !currentSelected.includes("Other")) {
      // Add "Other" to selected options if not already selected
      handleChange(
        data.fields.checkbox.label,
        [...currentSelected, "Other"].join(",")
      );
    }

    // Store the other input value separately
    updateStepFormValue(
      data.step_number,
      `${data.fields.checkbox.label}_another`,
      value
    );
  };

  const selectedOptions = (
    currentStepData[data.fields.checkbox.label] || ""
  ).split(",");

  const isOtherSelected = selectedOptions.includes("Other");

  return (
    <article>
      <div className="space-y-10">
        <p className="text-display-b-42">{data.title}</p>
        <div className="space-y-4">
          <div className="flex flex-col mlg:flex-row mlg:gap-10 gap-10">
            <div className="flex-1 space-y-10">
              <p className="text-heading-b-20">{data.fields.checkbox.label}</p>
              <div className="space-y-1">
                <div className="space-y-4">
                  {data.fields.checkbox.options.map((option, index) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={`r${index + 1}`}
                        checked={selectedOptions.includes(option)}
                        onCheckedChange={(checked) =>
                          handleCheckboxChange(option, checked as boolean)
                        }
                        className="size-6 [&_svg]:!size-4"
                      />
                      <label
                        htmlFor={`r${index + 1}`}
                        className="text-subheader-r-16"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                  <Input
                    placeholder="Type"
                    value={otherInput}
                    onChange={(e) => handleOtherChange(e.target.value)}
                    disabled={!isOtherSelected}
                  />
                </div>
              </div>
            </div>
            <div className="hidden mlg:block w-[1px] bg-neutral-divider" />
            <div className="space-y-4 flex-1 flex flex-col">
              <p className="text-heading-b-20">{data.fields.textarea.label}</p>
              <Textarea
                placeholder="Description"
                className="resize-none flex-1"
                value={currentStepData[data.fields.textarea.label] || ""}
                onChange={(e) =>
                  handleChange(data.fields.textarea.label, e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

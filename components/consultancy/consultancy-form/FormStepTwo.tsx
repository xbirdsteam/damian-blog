import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { ConsultancyStepBaseField, OptionsData } from "@/types/consultancy";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface StepTwoFields {
  radio_group1: OptionsData;
  radio_group2: OptionsData;
  textarea: {
    label: string;
  };
}

interface IProps {
  data: ConsultancyStepBaseField & {
    fields: StepTwoFields;
  };
}

export default function FormStepTwo({ data }: IProps) {
  const { formData, updateStepFormValue } = useConsultancyFormStore();
  const [otherInput1, setOtherInput1] = useState("");
  const [otherInput2, setOtherInput2] = useState("");

  if (!data?.fields) return null;
  const currentStepData = formData[data.step_number] || {};

  const handleChange = (name: string, value: string) => {
    if (value === "Other") {
      updateStepFormValue(data.step_number, name, "Other");
      // Clear the other value when unchecking "Other"
      if (name === data.fields.radio_group1.label) {
        updateStepFormValue(data.step_number, `${name}_another`, otherInput1);
      } else if (name === data.fields.radio_group2.label) {
        updateStepFormValue(data.step_number, `${name}_another`, otherInput2);
      }
    } else {
      // For non-"Other" options, clear the corresponding other input
      if (name === data.fields.radio_group1.label) {
        setOtherInput1("");
        updateStepFormValue(data.step_number, `${name}_another`, "");
      } else if (name === data.fields.radio_group2.label) {
        setOtherInput2("");
        updateStepFormValue(data.step_number, `${name}_another`, "");
      }
      updateStepFormValue(data.step_number, name, value);
    }
  };

  const handleOtherInput1Change = (value: string) => {
    setOtherInput1(value);
    if (currentStepData[data.fields.radio_group1.label] === "Other") {
      updateStepFormValue(
        data.step_number,
        `${data.fields.radio_group1.label}_another`,
        value
      );
    }
  };

  const handleOtherInput2Change = (value: string) => {
    setOtherInput2(value);
    if (currentStepData[data.fields.radio_group2.label] === "Other") {
      updateStepFormValue(
        data.step_number,
        `${data.fields.radio_group2.label}_another`,
        value
      );
    }
  };

  return (
    <article>
      <div className="space-y-10">
        <p className="text-display-b-42">{data.title}</p>
        <div className="space-y-4">
          {/* Desktop View */}
          <div className="hidden mlg:flex gap-10">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <p className="text-heading-b-20">
                  {data.fields.radio_group1.label}
                </p>
                <RadioGroup
                  value={currentStepData[data.fields.radio_group1.label] || ""}
                  onValueChange={(value) =>
                    handleChange(data.fields.radio_group1.label, value)
                  }
                  className="space-y-4"
                >
                  {data.fields.radio_group1.options.map((option, index) => {
                    const isOther = option.toLowerCase() === "other";
                    const isSelected =
                      currentStepData[data.fields.radio_group1.label] ===
                      option;

                    return (
                      <div key={option} className="flex flex-col gap-3">
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value={option} id={`r${index + 1}`} />
                          <label htmlFor={`r${index + 1}`}>{option}</label>
                        </div>
                        {isOther && (
                          <Input
                            placeholder="Type"
                            value={otherInput1}
                            onChange={(e) =>
                              handleOtherInput1Change(e.target.value)
                            }
                            disabled={!isSelected}
                          />
                        )}
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>
              <div className="space-y-1">
                <label
                  className="text-paragraph-b-14 text-neutral-text-secondary"
                  htmlFor="project-description"
                >
                  {data.fields.textarea.label}
                </label>
                <Textarea
                  id="project-description"
                  placeholder="Description"
                  value={currentStepData[data.fields.textarea.label] || ""}
                  onChange={(e) =>
                    handleChange(data.fields.textarea.label, e.target.value)
                  }
                  className="resize-none"
                />
              </div>
            </div>
            <div className="w-[1px] bg-neutral-divider" />
            <div className="space-y-4 flex-1">
              <p className="text-heading-b-20">
                {data.fields.radio_group2.label}
              </p>
              <RadioGroup
                value={currentStepData[data.fields.radio_group2.label] || ""}
                onValueChange={(value) =>
                  handleChange(data.fields.radio_group2.label, value)
                }
                className="space-y-4"
              >
                {data.fields.radio_group2.options.map((option, index) => {
                  const isOther = option.toLowerCase() === "other";
                  const isSelected =
                    currentStepData[data.fields.radio_group2.label] === option;

                  return (
                    <div key={option} className="flex flex-col gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`r2${index + 1}`} />
                        <label htmlFor={`r2${index + 1}`}>{option}</label>
                      </div>
                      {isOther && (
                        <Input
                          placeholder="Type"
                          value={otherInput2}
                          onChange={(e) =>
                            handleOtherInput2Change(e.target.value)
                          }
                          disabled={!isSelected}
                        />
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>

          {/* Mobile View */}
          <div className="mlg:hidden space-y-10">
            <div className="space-y-4">
              <p className="text-heading-b-20">
                {data.fields.radio_group1.label}
              </p>
              <RadioGroup
                value={currentStepData[data.fields.radio_group1.label] || ""}
                onValueChange={(value) =>
                  handleChange(data.fields.radio_group1.label, value)
                }
                className="space-y-4"
              >
                {data.fields.radio_group1.options.map((option, index) => {
                  const isOther = option.toLowerCase() === "other";
                  const isSelected =
                    currentStepData[data.fields.radio_group1.label] === option;

                  return (
                    <div key={option} className="flex flex-col gap-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value={option} id={`rm${index + 1}`} />
                        <label htmlFor={`rm${index + 1}`}>{option}</label>
                      </div>
                      {isOther && (
                        <Input
                          placeholder="Type"
                          value={otherInput1}
                          onChange={(e) =>
                            handleOtherInput1Change(e.target.value)
                          }
                          disabled={!isSelected}
                        />
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </div>

            <div className="space-y-1">
              <label
                className="text-paragraph-b-14 text-neutral-text-secondary"
                htmlFor="project-description-mobile"
              >
                {data.fields.textarea.label}
              </label>
              <Textarea
                id="project-description-mobile"
                placeholder="Description"
                value={currentStepData[data.fields.textarea.label] || ""}
                onChange={(e) =>
                  handleChange(data.fields.textarea.label, e.target.value)
                }
                className="resize-none"
              />
            </div>

            <div className="space-y-4">
              <p className="text-heading-b-20">
                {data.fields.radio_group2.label}
              </p>
              <RadioGroup
                value={currentStepData[data.fields.radio_group2.label] || ""}
                onValueChange={(value) =>
                  handleChange(data.fields.radio_group2.label, value)
                }
                className="space-y-4"
              >
                {data.fields.radio_group2.options.map((option, index) => {
                  const isOther = option.toLowerCase() === "other";
                  const isSelected =
                    currentStepData[data.fields.radio_group2.label] === option;

                  return (
                    <div key={option} className="flex flex-col gap-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={option} id={`rm2${index + 1}`} />
                        <label htmlFor={`rm2${index + 1}`}>{option}</label>
                      </div>
                      {isOther && (
                        <Input
                          placeholder="Type"
                          value={otherInput2}
                          onChange={(e) =>
                            handleOtherInput2Change(e.target.value)
                          }
                          disabled={!isSelected}
                        />
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

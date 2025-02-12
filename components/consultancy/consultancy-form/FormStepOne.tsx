import { Input } from "@/components/ui/input";
import { ConsultancyStepBaseField } from "@/types/consultancy";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";

interface StepOneFields {
  label: string;
  type: string;
}

interface IProps {
  data: ConsultancyStepBaseField & {
    fields: {
      inputs: StepOneFields[];
    };
  };
}

export default function FormStepOne({ data }: IProps) {
  const { formData, updateStepFormValue } = useConsultancyFormStore();

  if (!data?.fields?.inputs) return null;
  const currentStepData = formData[data.step_number] || {};

  const handleChange = (name: string, value: string) => {
    updateStepFormValue(data.step_number, name, value);
  };

  return (
    <article>
      <div className="space-y-10">
        <p className="text-display-b-42">{data.title}</p>
        {data.description && (
          <p className="text-subheader-r-16">{data.description}</p>
        )}
        <div className="space-y-4">
          <p className="text-heading-b-20">Basic Contact Information</p>
          <div className="grid grid-cols-1 mlg:grid-cols-3 gap-x-3 gap-y-4">
            {data.fields.inputs.map((field, index) => {
              const inputName = field.label;
              return (
                <div key={index} className="space-y-1">
                  <label
                    className="text-paragraph-b-14 text-neutral-text-secondary"
                    htmlFor={inputName}
                  >
                    {field.label}
                  </label>
                  <Input
                    type={field.type}
                    id={inputName}
                    name={inputName}
                    placeholder="Type"
                    value={currentStepData[inputName] || ""}
                    onChange={(e) => handleChange(inputName, e.target.value)}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}

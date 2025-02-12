import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { ConsultancyStepBaseField, OptionsData } from "@/types/consultancy";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";

interface StepFourFields {
  radio_group1: OptionsData;
  radio_group2: OptionsData;
}

interface IProps {
  data: ConsultancyStepBaseField & {
    fields: StepFourFields;
  };
}

export default function FormStepFour({ data }: IProps) {
  const { formData, updateStepFormValue } = useConsultancyFormStore();

  if (!data?.fields) return null;
  const currentStepData = formData[data.step_number] || {};

  const handleChange = (name: string, value: string) => {
    updateStepFormValue(data.step_number, name, value);
  };

  return (
    <article>
      <div className="space-y-10">
        <p className="text-display-b-42">{data.title}</p>
        <div className="space-y-4">
          <div className="flex flex-col mlg:flex-row mlg:gap-10 gap-10">
            <div className="flex-1 space-y-10">
              <div className="space-y-4">
                <p className="text-heading-b-20">
                  {data.fields.radio_group1.label}
                </p>
                <RadioGroup
                  value={currentStepData[data.fields.radio_group1.label]}
                  onValueChange={(value) =>
                    handleChange(data.fields.radio_group1.label, value)
                  }
                  className="space-y-4"
                >
                  {data.fields.radio_group1.options.map((option, index) => (
                    <div key={option} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`r${index + 1}`} />
                      <label htmlFor={`r${index + 1}`}>{option}</label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            <div className="hidden mlg:block w-[1px] bg-neutral-divider" />
            <div className="space-y-4 flex-1">
              <p className="text-heading-b-20">
                {data.fields.radio_group2.label}
              </p>
              <RadioGroup
                value={currentStepData[data.fields.radio_group2.label]}
                onValueChange={(value) =>
                  handleChange(data.fields.radio_group2.label, value)
                }
                className="space-y-4"
              >
                {data.fields.radio_group2.options.map((option, index) => (
                  <div key={option} className="flex items-center space-x-2">
                    <RadioGroupItem value={option} id={`r2${index + 1}`} />
                    <label htmlFor={`r2${index + 1}`}>{option}</label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

import { Textarea } from "@/components/ui/textarea";
import { ConsultancyStepBaseField } from "@/types/consultancy";
import { useConsultancyFormStore } from "@/store/consultancyFormStore";

interface StepSixFields {
  textarea: {
    label: string;
  };
}

interface IProps {
  data: ConsultancyStepBaseField & {
    fields: StepSixFields;
  };
}

export default function FormStepSix({ data }: IProps) {
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
          <label className="text-heading-b-20">
            {data.fields.textarea.label}
          </label>
          <Textarea
            placeholder="Description"
            className="resize-none h-[140px]"
            value={currentStepData[data.fields.textarea.label] || ""}
            onChange={(e) =>
              handleChange(data.fields.textarea.label, e.target.value)
            }
          />
        </div>
      </div>
    </article>
  );
}

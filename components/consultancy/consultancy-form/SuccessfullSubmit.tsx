"use client";

import { TickIcon } from "@/components/icons/TickIcon";
import { Button } from "@/components/ui/button";
import { ConsultancySuccessStep } from "@/types/consultancy";
import Link from "next/link";

interface IProps {
  successSteps: ConsultancySuccessStep[];
}

export default function SuccessfullSubmit({ successSteps }: IProps) {
  return (
    <article>
      <div className="space-y-10">
        <p className="text-display-b-42">Form Successfully Submitted!</p>
        <div className="space-y-10 relative">
          <div className="absolute w-[1px] h-[calc(100%-94px)] top-0 left-[14px] z-0 bg-neutral-border" />

          {successSteps?.map((step, index) => (
            <div key={step.id} className="flex gap-8 relative z-10">
              {index === 0 ? (
                <span className="shrink-0">
                  <TickIcon />
                </span>
              ) : (
                <div className="shrink-0 size-7 bg-white rounded-full flex justify-center items-center">
                  <span className="size-[18px] border-4 border-neutral-text-secondary rounded-full" />
                </div>
              )}
              <p
                className={`flex flex-col gap-3 ${
                  index === 0
                    ? "text-neutral-primary-text"
                    : "text-neutral-text-secondary"
                }`}
              >
                <span className="text-heading-b-24">{step.title}</span>
                <span className="text-subheader-m-16">{step.description}</span>
              </p>
            </div>
          ))}

          <div className="flex justify-center">
            <Button className="w-[200px]">
              <Link href="/">Go Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}

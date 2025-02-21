import { ConsultancyContent } from "@/types/consultancy";
import Image from "next/image";
import Link from "next/link";
import { CheckIcon } from "../icons/CheckIcon";
import { Button } from "../ui/button";

interface IProps {
  data: ConsultancyContent;
}

export default async function Consultancy({ data }: IProps) {
  return (
    <div>
      <section>
        <div className="relative w-full aspect-[2]">
          <Image alt="" fill className="object-cover" src={data.image_url} />
        </div>

        <div className="container mx-auto py-[50px] mlg:py-20 space-y-[30px] mlg:space-y-10">
          <h1 className="text-display-b-36 mlg:text-display-b-56 text-neutral-primary-text">
            {data.title}
          </h1>

          <p className="text-subheader-r-16 text-neutral-primary-text">
            {data.description}
          </p>

          <div className="space-y-4 mlg:space-y-5">
            <p className="text-heading-b-20 mlg:text-heading-b-24 text-neutral-primary-text">
              {data.headParagraph.title}
            </p>
            <p className="text-subheader-r-16 text-neutral-primary-text whitespace-pre-wrap">
              {data.headParagraph.content}
            </p>
          </div>

          {/* Why work with us */}
          <article className="space-y-4 mlg:space-y-5">
            <p className="text-heading-b-20 mlg:text-heading-b-24 text-neutral-primary-text">
              Why Work With Us?
            </p>
            <ul className="space-y-3">
              {data.whyWorkWithUs.map((item) => (
                <li key={item.id} className="flex gap-3 items-center">
                  <CheckIcon />
                  <span className="text-subheader-r-16 text-neutral-primary-text">
                    {item.content}
                  </span>
                </li>
              ))}
            </ul>
          </article>

          {/* Process Steps */}
          <article>
            <p className="text-heading-b-20 mlg:text-heading-b-24 text-neutral-primary-text mb-4 mlg:mb-5">
              Our 3-Step Process
            </p>
            <div>
              {data.processSteps.map((step, index) => (
                <div key={step.id} className="flex">
                  {index !== data.processSteps.length - 1 && (
                    <div className="w-[1px] bg-neutral-primary-text relative top-[7px] left-[7px]" />
                  )}
                  <div className="flex gap-5 items-start">
                    <div className="flex flex-col items-center w-max relative top-[7px]">
                      <div className="size-[14px] border-[3px] bg-white border-neutral-primary-text rounded-full" />
                    </div>
                    <div className="space-y-1 pb-5">
                      <p className="text-title-b-18 text-neutral-primary-text">
                        {step.title}
                      </p>
                      <p className="text-subheader-r-16 text-neutral-primary-text">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>

        {/* Take your project */}
        <article className="bg-neutral-primary-text py-20">
          <div className="container mx-auto flex flex-col mlg:flex-row mlg:items-center mlg:justify-between gap-[30px] mlg:gap-[60px]">
            <div className="space-y-4 mlg:space-y-5 flex-1">
              <h2 className="text-heading-b-24 text-white">
                {data.callToAction.title}
              </h2>
              <p className="text-subheader-r-16 text-white">
                {data.callToAction.description}
              </p>
            </div>

            {/* Button */}
            <Button
              withArrow
              arrowColor="#0D0D0D"
              className="w-max !bg-white !text-neutral-primary-text"
            >
              <Link prefetch href="/consultancy/form">
                Complete the Form
              </Link>
            </Button>
          </div>
        </article>
      </section>
    </div>
  );
}

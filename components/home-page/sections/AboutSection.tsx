import Image from "next/image";
import { HomeData } from "@/types/home";
import { Button } from "../../ui/button";

interface AboutSectionProps {
  data: HomeData;
}

export default function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className="pt-10 py-[50px] bg-neutral-background">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 mlg:grid-cols-2 gap-[30px] mlg:gap-20 mlg:justify-between">
          {/* Left: Image */}
          <div className="relative aspect-[0.66] w-full">
            <Image
              src={data.about_img_url}
              alt="Chef Portrait"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Right: Content */}
          <div className="flex flex-col justify-center space-y-[30px] mlg:space-y-10 mlg:max-w-[472px]">
            <h2 className="text-neutral-primary-text text-[36px] mlg:text-[56px] leading-[120%] font-bold">
              {data.about_title}
            </h2>

            <div className="space-y-4">
              <p className="text-neutral-primary-text text-xl font-bold">
                {data.about_bio}
              </p>

              <p className="text-neutral-primary-text text-base">
                {data.about_description}
              </p>
            </div>

            {data.about_more_url && (
              <Button href={data.about_more_url} withArrow className="w-max">
                View more
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

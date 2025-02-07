import { HomeData } from "@/types/home";
import { Button } from "../../ui/button";

interface RecipeSectionProps {
  data: HomeData;
}

export default function RecipeSection({ data }: RecipeSectionProps) {
  return (
    <section className="relative">
      <div className="pb-[50px] mlg:py-[120px] h-[812px] mlg:h-auto flex flex-col justify-end">
        {/* Background Video */}
        <div className="absolute size-full aspect-[2/1] inset-0">
          <video
            src={data.recipe_video_url}
            className="object-cover size-full"
            autoPlay
            loop
            muted
          />
        </div>

        <div className="container mx-auto">
          {/* Content Box */}
          <div className="relative bg-white/80 p-6 mlg:p-10 mlg:max-w-[472px] space-y-6 mlg:space-y-10">
            <h2 className="text-neutral-primary-text text-[36px] mlg:text-[56px] leading-[120%] font-bold">
              {data.recipe_title}
            </h2>

            <div className="space-y-4">
              <p className="font-bold text-neutral-primary-text text-xl">
                {data.recipe_heading}
              </p>
              <p className="text-neutral-primary-text text-base">
                {data.recipe_description}
              </p>
            </div>

            {data.recipe_more_url && (
              <Button href={data.recipe_more_url} withArrow className="w-max">
                Explore recipes
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

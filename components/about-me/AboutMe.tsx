import { AboutData } from "@/types/about-me";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import MileStoneWrapper from "./MileStoneWrapper";
import WhereIAm from "./WhereIAm";

const getAboutMeData = async (): Promise<AboutData> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("about_me").select("*").single();

  if (error) {
    throw error;
  }
  return data;
};

export default async function AboutMe() {
  const aboutMeData = await getAboutMeData();

  return (
    <section className="bg-neutral-primary-text py-[50px] mlg:py-20 min-h-screen relative">
      <div className="container mx-auto">
        <div className="space-y-[50px] mlg:space-y-[60px]">
          <h1 className="flex flex-col text-display-b-36 mlg:text-display-b-56">
            <span className="text-neutral-text-secondary">About me,</span>{" "}
            <span className="text-white">Hi I&lsquo;m Damian</span>
          </h1>

          {/* Vision and Mission */}
          <article className="grid grid-cols-1 mlg:grid-cols-2 gap-[50px] mlg:gap-[100px]">
            <div>
              <h2 className="text-title-b-18 mlg:text-heading-b-20 text-neutral-text-secondary mb-4">
                MY VISION
              </h2>
              <p className="text-white">{aboutMeData.vision}</p>
            </div>

            <div>
              <h2 className="text-title-b-18 mlg:text-heading-b-20 text-neutral-text-secondary mb-4">
                MY MISSION
              </h2>
              <p className="text-white">{aboutMeData.mission}</p>
            </div>
          </article>

          {/* Milestones */}
          <article className="flex flex-col items-center mlg:flex-row gap-[50px] mlg:gap-[100px]">
            <div className="w-full sm:w-[410px] aspect-[0.82] relative">
              <Image
                src={aboutMeData.image_url ?? ""}
                alt="Milestones"
                fill
                sizes="100%"
                className="object-cover object-top !max-h-[500px]"
              />
            </div>
            {/* Milestones content */}
            <MileStoneWrapper timeLine={aboutMeData.timelines} />
          </article>
        </div>
      </div>
      <WhereIAm
        links={aboutMeData.links || []}
        whereIAm={aboutMeData.where_i_am}
      />
    </section>
  );
}

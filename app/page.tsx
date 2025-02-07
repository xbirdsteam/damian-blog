import { createClient } from "@/utils/supabase/server";
import { HomeData } from "@/types/home";
import HeroSection from "@/components/home-page/sections/HeroSection";
import ExperienceSection from "@/components/home-page/sections/ExperienceSection";
import AboutSection from "@/components/home-page/sections/AboutSection";
import RecipeSection from "@/components/home-page/sections/RecipeSection";
import ContactSection from "@/components/home-page/sections/ContactSection";

async function getHomeData() {
  const supabase = await createClient();
  const { data } = await supabase.from("home").select("*").single();

  return data as HomeData;
}

export default async function Home() {
  const homeData = await getHomeData();
  if (!homeData) return null;
  return (
    <>
      <HeroSection data={homeData} />
      <ExperienceSection />
      <AboutSection data={homeData} />
      <RecipeSection data={homeData} />
      <ContactSection data={homeData} />
    </>
  );
}

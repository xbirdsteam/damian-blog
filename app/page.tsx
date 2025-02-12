import { createClient } from "@/utils/supabase/server";
import { HomeData } from "@/types/home";
import HeroSection from "@/components/home-page/sections/HeroSection";
import ExperienceSection from "@/components/home-page/sections/ExperienceSection";
import AboutSection from "@/components/home-page/sections/AboutSection";
import RecipeSection from "@/components/home-page/sections/RecipeSection";
import ContactSection from "@/components/home-page/sections/ContactSection";
import { Metadata } from "next";

async function getHomeData() {
  const supabase = await createClient();
  const { data } = await supabase.from("home").select("*").single();

  return data as HomeData;
}

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: seoData, error } = await supabase
    .from("seo_config")
    .select("*")
    .eq("slug", "home")
    .single();

  if (error)
    return {
      title: "Damian",
      description: "Damian",
    };

  return {
    title: seoData.meta_title,
    description: seoData.meta_description,
    keywords: seoData.meta_keywords,
    openGraph: {
      images: seoData.og_image,
    },
  };
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

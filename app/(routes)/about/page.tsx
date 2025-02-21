import AboutMe from "@/components/about-me/AboutMe";
import { PageLoading } from "@/components/common/PageLoading";
import { AboutData } from "@/types/about-me";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: seoData, error } = await supabase
    .from("seo_config")
    .select("*")
    .eq("slug", "about")
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
      title: seoData.meta_title,
      description: seoData.meta_description,
      images: seoData.og_image,
    },
    twitter: {
      card: "summary_large_image",
      title: seoData.meta_title,
      description: seoData.meta_description,
      images: seoData.og_twitter_image,
    },
  };
}

const getAboutMeData = async (): Promise<AboutData> => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("about_me").select("*").single();

  if (error) {
    throw error;
  }
  return data;
};

export default async function AboutPage() {
  const aboutMeData = await getAboutMeData();
  if (!aboutMeData) return null;
  return (
    <>
      <PageLoading showAll />
      <AboutMe aboutMeData={aboutMeData} />
    </>
  );
}

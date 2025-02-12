import AboutMe from "@/components/about-me/AboutMe";
import { PageLoading } from "@/components/common/PageLoading";
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
      images: seoData.og_image,
    },
  };
}

export default function AboutPage() {
  return (
    <>
      <PageLoading />
      <AboutMe />
    </>
  );
}

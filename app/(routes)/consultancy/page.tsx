import Consultancy from "@/components/consultancy/Consultancy";
import { createClient } from "@/utils/supabase/server";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: seoData, error } = await supabase
    .from("seo_config")
    .select("*")
    .eq("slug", "consultancy")
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

export default function ConsultancyPage() {
  return <Consultancy />;
}

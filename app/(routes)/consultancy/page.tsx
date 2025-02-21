import { PageLoading } from "@/components/common/PageLoading";
import Consultancy from "@/components/consultancy/Consultancy";
import { ConsultancyContent } from "@/types/consultancy";
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

const getConsultancy = async (): Promise<ConsultancyContent> => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("consultancy")
    .select("*")
    .single();

  if (error) throw error;
  const headParagraph =
    typeof data.head_paragraph === "string"
      ? JSON.parse(data.head_paragraph)
      : data.head_paragraph || { title: "", content: "" };
  return {
    id: data.id,
    title: data.title,
    description: data.description,
    headParagraph: {
      title: headParagraph.title || "",
      content: headParagraph.content || "",
    },
    callToAction: {
      title: data.call_to_action?.title || "",
      description: data.call_to_action?.description || "",
    },
    whyWorkWithUs: data.why_work_with_us || [],
    processSteps: data.process_steps || [],
    image_url: data.image_url,
    created_at: data.created_at,
    updated_at: data.updated_at,
  } as ConsultancyContent;
};

export default async function ConsultancyPage() {
  const data = await getConsultancy();
  if (!data) return null;
  return (
    <>
      <PageLoading />
      <Consultancy data={data} />
    </>
  );
}

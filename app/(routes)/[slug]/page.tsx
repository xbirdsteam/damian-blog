import { BackgroundMove } from "@/components/common/BackgroundMove";
import PostDetailWrapper from "@/components/gastronomy/post-detail/PostDetailWrapper";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = await params;
  const supabase = await createClient();
  const { data: seoData, error } = await supabase
    .from("seo_config")
    .select("*")
    .eq("slug", slug.slug)
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

export default function GastronomyPostDetailPage() {
  return (
    <>
      <BackgroundMove />
      <PostDetailWrapper />
    </>
  );
}

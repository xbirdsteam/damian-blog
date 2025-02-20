import { getPostBySlug } from "@/actions/post";
import { BackgroundMove } from "@/components/common/BackgroundMove";
import PostDetailWrapper from "@/components/gastronomy/post-detail/PostDetailWrapper";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = await params;
  const post = await getPostBySlug(slug.slug);

  if (!post) {
    notFound();
  }

  return {
    title: post.title,
    description: post.short_description,
    keywords: post.short_description,
    openGraph: {
      title: post.title,
      description: post.short_description,
      images: post.post_img,
    },
  };
}

export default function GastronomyPostDetailPage() {
  return <>
  <BackgroundMove />
  <PostDetailWrapper />
  </>
}

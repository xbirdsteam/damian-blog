import { getPostBySlug } from "@/actions/post";
import PostDetailWrapper from "@/components/gastronomy/post-detail/PostDetailWrapper";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const slug = await params;
  const post = await getPostBySlug(slug.slug);
  return {
    title: post?.title,
    description: post?.short_description,
    keywords: post?.short_description,
    openGraph: {
      title: post?.title,
      description: post?.short_description,
      images: post?.post_img,
    },
  };
}

export default function GastronomyPostDetailPage() {
  return <PostDetailWrapper />;
}

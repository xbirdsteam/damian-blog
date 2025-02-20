"use client";
import { getPostBySlug } from "@/actions/post";
import { useParams } from "next/navigation";
import PostContentRender from "@/components/common/PostContentRender";
import { useQuery } from "@tanstack/react-query";
import PostDetailFooter from "./PostDetailFooter";
import PostComment from "./PostComment";
import { Loading } from "@/components/common/Loading";

export default function PostDetailContent() {
  const { slug } = useParams();

  const { data: post, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => getPostBySlug(slug as string),
    enabled: !!slug,
  });
  if (isLoading) {
    return <Loading hasOverlay size={5} color="#FFF" />;
  }
  if (!post) return null;
  return (
    <>
      <article className="container mx-auto py-10">
        <PostContentRender
          content={JSON.parse(post.content)}
          created_at={post.created_at}
          post_img={post.post_img}
          categories={post.posts_categories?.map((category) => category.categories.name) || []}
          author_name={post.users?.fullname || ""}
          avatar_url={post.users?.avatar_url || ""}
        />
      </article>
      <PostDetailFooter
        tags={
          post.tags ||
          []
        }
        prevPost={post.prev_post || undefined}
        nextPost={post.next_post || undefined}
      />
      <PostComment postId={post.id} />
    </>
  );
}

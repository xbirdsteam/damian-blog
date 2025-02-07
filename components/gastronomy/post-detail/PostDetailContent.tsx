/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getPostBySlug } from "@/actions/post";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PostDetailContent() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostBySlug(slug as string);
      setPost(post);
    };
    fetchPost();
  }, [slug]);

  if (!post) return null;

  return <div>Post detail</div>;
}

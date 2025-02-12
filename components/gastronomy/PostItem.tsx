import { Post } from "@/types/post";
import Image from "next/image";
import Link from "next/link";

export default function PostItem({
  title,
  short_description,
  post_img,
  publish_date,
  slug,
  posts_categories,
}: Post) {
  return (
    <Link prefetch href={`/gastronomy/${slug}`} className="group block">
      <article className="space-y-5 md:space-y-[30px]">
        {/* Image Container */}
        <div className="relative aspect-[1] mb-4 overflow-hidden">
          <Image
            src={post_img}
            alt={title}
            fill
            className="object-cover"
            sizes="100%"
          />
          {/* NEWS Label */}
          {posts_categories && (
            <p className="absolute top-3 right-3 bg-neutral-primary-text text-white px-2 py-1 rounded-[4px] text-paragraph-b-14 uppercase">
              {posts_categories[0]?.categories?.name}
            </p>
          )}
        </div>

        {/* Content */}
        <div>
          {/* Date */}
          <time
            className="text-paragraph-b-14 text-neutral-text-secondary"
            dateTime={publish_date}
          >
            {new Date(publish_date).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </time>

          {/* Title */}
          <h3 className="mt-1 mb-2 md:mb-3 text-heading-b-20 md:text-heading-b-24 text-neutral-primary-text line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-subheader-r-16 text-neutral-primary-text line-clamp-3">
            {short_description}
          </p>
        </div>
      </article>
    </Link>
  );
}

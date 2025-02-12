import Link from "next/link";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { TwitterIcon } from "@/components/icons/TwitterIcon";
import { LinkedinIcon } from "@/components/icons/LinkedinIcon";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";

interface PostDetailFooterProps {
  tags: string[];
  prevPost?: {
    title: string;
    slug: string;
  };
  nextPost?: {
    title: string;
    slug: string;
  };
}

export default function PostDetailFooter({
  tags,
  prevPost,
  nextPost,
}: PostDetailFooterProps) {
  return (
    <footer className="space-y-10">
      {/* Tags and Social Share */}
      <div className="flex flex-col gap-5 mlg:gap-0 mlg:flex-row justify-between items-center container mx-auto">
        <div className="flex gap-[10px]">
          {tags.map((tag) => (
            <span
              key={tag}
              className="uppercase text-paragraph-b-14 text-white bg-neutral-primary-text px-2 py-1 rounded-[4px]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-col mlg:flex-row items-center gap-2 mlg:gap-6">
          <span className="text-title-b-18 text-neutral-primary-text">
            Share the article via
          </span>
          <div className="flex gap-4">
            <button>
              <FacebookIcon />
            </button>
            <button>
              <TwitterIcon />
            </button>
            <button>
              <LinkedinIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-neutral-divider border border-neutral-border flex">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex-1">
            {prevPost && (
              <Link
                href={`/gastronomy/${prevPost.slug}`}
                className="block p-6 hover:bg-neutral-hover transition-colors"
              >
                <div className="space-y-2 flex flex-col items-start">
                  <p className="text-paragraph-r-14 text-neutral-text-secondary flex items-center gap-3">
                    <ArrowLeftIcon />
                    <span className="text-subheader-m-16 text-neutral-primary-text">
                      Previous article
                    </span>
                  </p>
                  <p className="text-heading-r-20 text-neutral-text-secondary line-clamp-1">
                    {prevPost.title}
                  </p>
                </div>
              </Link>
            )}
          </div>

          <div className="flex-1">
            {nextPost && (
              <Link
                href={`/gastronomy/${nextPost.slug}`}
                className="block p-6 text-right hover:bg-neutral-hover transition-colors"
              >
                <div className="space-y-2 flex flex-col items-end">
                  <p className="text-paragraph-r-14 text-neutral-text-secondary flex items-center gap-3">
                    <span className="text-subheader-m-16 text-neutral-primary-text">
                      Next article
                    </span>
                    <ArrowRightIcon />
                  </p>
                  <p className="text-heading-r-20 text-neutral-text-secondary line-clamp-1">
                    {nextPost.title}
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}

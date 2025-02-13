import { ReplyIcon } from "@/components/icons/ReplyIcon";
import Image from "next/image";

interface CommentProps {
  id?: string;
  author: string;
  content: string;
  date: string;
  isReply?: boolean;
  onReply?: (id: string, author: string, parentId?: string) => void;
  avatar_url?: string | null;
}

export default function PostCommentItem({
  id,
  author,
  content,
  date,
  isReply = false,
  onReply,
  avatar_url,
}: CommentProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  const handleReplyClick = () => {
    if (id && onReply) {
      onReply(id, author);
    }
  };

  return (
    <div
      className={`flex flex-wrap gap-4 py-6 border-t border-neutral-border ${
        isReply ? "mlg:pl-4" : ""
      }`}
    >
      <div className="size-[34px] relative shrink-0 rounded-full bg-neutral-primary-text text-white flex items-center justify-center text-subheader-b-16">
        {avatar_url ? (
          <Image
          fill
            src={avatar_url }
            alt={author}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          getInitial(author)
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start mb-2 flex-col mlg:flex-row">
          <div className="space-y-2 w-full">
            <div className="flex items-center flex-wrap gap-[6px]">
              <h3 className="text-subheader-b-16 text-neutral-primary-text break-all">
                {author}
              </h3>
              <span className="text-paragraph-r-14 leading-[24px] text-neutral-text-secondary">
                {formatDate(date)}
              </span>
            </div>
            <p className="text-subheader-r-16 text-neutral-primary-text break-words">
              {content}
            </p>
          </div>
          <div className="flex w-full justify-end mlg:w-auto">
            <button
              onClick={handleReplyClick}
              className="flex shrink-0 items-center gap-1 text-subheader-m-16 text-neutral-primary-text mt-2 mlg:mt-0"
            >
              <ReplyIcon />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";

import { createComment, getCommentsByPostId } from "@/actions/comment";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Instagram } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import PostCommentItem from "./PostCommentItem";

interface PostCommentProps {
  postId: string;
}

interface ReplyToState {
  id: string;
  author: string;
  isReplying: boolean;
  parentId: string;
}

export default function PostComment({ postId }: PostCommentProps) {
  const queryClient = useQueryClient();
  const [replyTo, setReplyTo] = useState<ReplyToState>({
    id: "",
    author: "",
    isReplying: false,
    parentId: "",
  });
  const [formData, setFormData] = useState({
    content: "",
    author_name: "",
    author_email: "",
    saveInfo: false,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Add state for Instagram login status
  const [isInstagramLoggedIn, setIsInstagramLoggedIn] = useState(false);
  const [instagramUser, setInstagramUser] = useState<{
    username: string;
    profilePictureUrl?: string;
  } | null>(null);

  // Store popup reference
  const popupRef = useRef<Window | null>(null);

  // Fetch comments with pagination
  const {
    data: commentData = { comments: [], totalComments: 0, totalPages: 0 },
  } = useQuery({
    queryKey: ["comments", postId, currentPage],
    queryFn: () => getCommentsByPostId(postId, currentPage),
    placeholderData: keepPreviousData,
  });

  const { comments, totalComments, totalPages } = commentData;

  // Create comment mutation
  const createCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
      setFormData((prev) => ({ ...prev, content: "" }));
      setCurrentPage(1);
      toast.success("Comment submitted for approval!");
    },
    onError: () => {
      toast.error("Failed to post comment. Please try again.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.content || !formData.author_name || !formData.author_email) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Format author name if it's a reply
    const authorName = replyTo.isReplying
      ? `${formData.author_name} Reply to ${getOriginalAuthor(replyTo.author)}`
      : formData.author_name;

    const commentData = {
      post_id: postId,
      content: formData.content,
      author_name: authorName,
      author_email: formData.author_email,
      parent_id: replyTo.isReplying ? replyTo.parentId : undefined,
      avatar_url: isInstagramLoggedIn ? instagramUser?.profilePictureUrl : null,
    };

    createCommentMutation.mutate(commentData);

    // Save user info in localStorage if requested
    if (formData.saveInfo) {
      localStorage.setItem("comment_author_name", formData.author_name);
      localStorage.setItem("comment_author_email", formData.author_email);
    }

    // Reset reply state after submission
    setReplyTo({ id: "", author: "", isReplying: false, parentId: "" });
  };

  const handleReply = (id: string, author: string, parentId?: string) => {
    setReplyTo({
      id,
      author,
      isReplying: true,
      parentId: parentId || id,
    });
    document
      .getElementById("comment-form")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  // Load saved info on mount
  useEffect(() => {
    const savedName = localStorage.getItem("comment_author_name");
    const savedEmail = localStorage.getItem("comment_author_email");

    if (savedName && savedEmail) {
      setFormData((prev) => ({
        ...prev,
        author_name: savedName,
        author_email: savedEmail,
        saveInfo: true,
      }));
    }
  }, []);

  // Fetch Instagram user data
  const fetchInstagramUserData = async (accessToken: string) => {
    try {
      const response = await fetch(
        `https://graph.instagram.com/v22.0/me?fields=id,username,profile_picture_url,name&access_token=${accessToken}`
      );
      const userData = await response.json();
      if (userData.username) {
        setInstagramUser({
          username: userData.username,
          profilePictureUrl: userData.profile_picture_url,
        });
        setIsInstagramLoggedIn(true);
        setFormData((prev) => ({
          ...prev,
          author_name: userData.username,
          author_email: `${userData.username}@instagram.user`,
          saveInfo: false,
        }));

        // Close popup if it's still open
        if (popupRef.current && !popupRef.current.closed) {
          popupRef.current.close();
          popupRef.current = null;
        }
      }
    } catch (error) {
      console.error("Failed to fetch Instagram user:", error);
      handleInstagramSignOut();
    }
  };

  // Check login status on mount
  useEffect(() => {
    const accessToken = Cookies.get("instagram_access_token");
    if (accessToken) {
      fetchInstagramUserData(accessToken);
    }
  }, []);

  // Update sign out handler
  const handleInstagramSignOut = () => {
    Cookies.remove("instagram_access_token");
    setInstagramUser(null);
    setIsInstagramLoggedIn(false);

    // Check localStorage for saved user info
    const savedName = localStorage.getItem("comment_author_name");
    const savedEmail = localStorage.getItem("comment_author_email");

    // Set form data based on localStorage or empty values
    setFormData((prev) => ({
      ...prev,
      author_name: savedName || "",
      author_email: savedEmail || "",
      saveInfo: !!(savedName && savedEmail), // Convert to boolean
    }));

    toast.success("Successfully signed out from Instagram");
  };

  // Move event listener inside useEffect to prevent memory leaks
  useEffect(() => {
    const messageHandler = (event: MessageEvent) => {
      // Handle messages from popup window
      if (event.data.type === "INSTAGRAM_LOGIN_SUCCESS") {
        const { accessToken } = event.data;
        fetchInstagramUserData(accessToken);
      } else if (event.data.type === "INSTAGRAM_LOGIN_ERROR") {
        console.error("Instagram Login Error:", event.data.error);
        toast.error("Instagram connection failed");
      }
    };

    window.addEventListener("message", messageHandler);

    return () => {
      window.removeEventListener("message", messageHandler);
    };
  }, []);

  // Add Instagram login handler
  const handleInstagramLogin = () => {
    const instagramAuthUrl = `https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=2374033366276240&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}/api/auth/instagram/callback/&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish%2Cinstagram_business_manage_insights`;

    const width = 600;
    const height = 800;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    popupRef.current = window.open(
      instagramAuthUrl,
      "instagram_auth",
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes,resizable=yes`
    );

    if (!popupRef.current) {
      toast.error("Popup was blocked. Please allow popups for this site.");
    }
  };

  useEffect(() => {
    if (popupRef.current) {
      popupRef.current.addEventListener("message", (event) => {
        console.log("message", event);
      });
    }
  }, [popupRef.current]);

  // Update isFormValid to handle Instagram login case
  const isFormValid = () => {
    if (isInstagramLoggedIn) {
      return (
        formData.content.trim() !== "" && formData.author_name.trim() !== ""
      );
    }
    return (
      formData.content.trim() !== "" &&
      formData.author_name.trim() !== "" &&
      formData.author_email.trim() !== ""
    );
  };

  // Helper function to get the original author name from a possibly nested reply
  const getOriginalAuthor = (authorName: string) => {
    // If the author name contains "Reply to", get the first part (original replier's name)
    if (authorName.includes("Reply to")) {
      const parts = authorName.split("Reply to");
      return parts[0].trim(); // Get the first part (the replier's name)
    }
    return authorName;
  };

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <section className="bg-neutral-background">
      <div className="grid grid-cols-12">
        {/* Comments List */}
        <div className="col-span-12 mlg:col-span-7 space-y-10 py-[50px] px-4 mlg:p-20">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-2">
            <h2 className="text-heading-b-24 text-neutral-primary-text">
              {totalComments} comments
            </h2>
            <div className="flex gap-2">
              {getPageNumbers().map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`size-[34px] text-subheader-m-16 flex-shrink-0 flex rounded-[2px] items-center justify-center transition-colors ${
                    currentPage === pageNum
                      ? "bg-neutral-primary-text text-white"
                      : "bg-neutral-divider text-neutral-primary-text hover:bg-neutral-primary-text hover:text-white"
                  }`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            {comments.map((comment) => (
              <div key={comment.id}>
                <PostCommentItem
                  id={comment.id}
                  author={comment.author_name}
                  content={comment.content}
                  date={comment.created_at}
                  onReply={handleReply}
                  avatar_url={comment.avatar_url}
                />
                {comment.replies?.map((reply) => (
                  <PostCommentItem
                    key={reply.id}
                    id={reply.id}
                    author={reply.author_name}
                    content={reply.content}
                    date={reply.created_at}
                    onReply={(id, author) =>
                      handleReply(id, author, comment.id)
                    }
                    avatar_url={reply.avatar_url}
                    isReply
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Comment Form */}
        <div className="col-span-12 mlg:col-span-5 space-y-6 bg-white py-[50px] px-4 mlg:p-20">
          <div className="space-y-2">
            <h2 className="text-heading-b-24 text-neutral-primary-text">
              Leave a comment
            </h2>
            {replyTo.isReplying && (
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-neutral-background rounded-md gap-2">
                <span className="text-paragraph-r-14 text-neutral-text-secondary">
                  Replying to{" "}
                  <span className="font-bold text-neutral-primary-text">
                    {replyTo.author}
                  </span>
                </span>
                <button
                  onClick={() =>
                    setReplyTo({
                      id: "",
                      author: "",
                      isReplying: false,
                      parentId: "",
                    })
                  }
                  className="px-3 py-1 rounded-md hover:bg-neutral-hover text-neutral-primary-text hover:text-neutral-text-secondary transition-colors text-paragraph-r-14 w-full sm:w-auto"
                >
                  Cancel reply
                </button>
              </div>
            )}
          </div>
          <p className="text-paragraph-r-14 text-neutral-text-secondary">
            Your email address will not be published
          </p>

          {!isInstagramLoggedIn ? (
            <Button
              onClick={handleInstagramLogin}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737] hover:opacity-90"
            >
              <Instagram className="size-5" />
              <span>Continue with Instagram</span>
            </Button>
          ) : (
            <div className="flex items-center gap-4 p-3 rounded-lg border border-border">
              {instagramUser?.profilePictureUrl && (
                <img
                  src={instagramUser.profilePictureUrl}
                  alt={instagramUser.username}
                  className="w-8 h-8 rounded-full"
                />
              )}
              <span className="text-neutral-primary-text">
                Logged in as {instagramUser?.username}
              </span>
              <Button
                onClick={handleInstagramSignOut}
                variant="outline"
                size="sm"
                className="ml-auto hover:bg-red-50 hover:text-red-500 hover:border-red-200"
              >
                Sign out
              </Button>
            </div>
          )}

          <form id="comment-form" className="space-y-6" onSubmit={handleSubmit}>
            <Textarea
              placeholder="Write something"
              className="min-h-[120px] resize-none"
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
            />
            <div className="space-y-4">
              <Input
                placeholder="Your name"
                value={formData.author_name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    author_name: e.target.value,
                  }))
                }
                disabled={isInstagramLoggedIn} // Disable name input when logged in with Instagram
              />
              {/* Only show email input when not logged in with Instagram */}
              {!isInstagramLoggedIn && (
                <Input
                  placeholder="Your email"
                  type="email"
                  value={formData.author_email}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      author_email: e.target.value,
                    }))
                  }
                  required
                />
              )}
            </div>

            {/* Only show save info checkbox when not logged in with Instagram */}
            {!isInstagramLoggedIn && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                <Checkbox
                  id="save-info"
                  checked={formData.saveInfo}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({
                      ...prev,
                      saveInfo: checked as boolean,
                    }))
                  }
                />
                <label
                  htmlFor="save-info"
                  className="text-paragraph-r-14 text-neutral-primary-text"
                >
                  Save my name and email in this browser for the next time I
                  comment.
                </label>
              </div>
            )}

            <Button
              className="w-full sm:w-auto px-6"
              type="submit"
              disabled={createCommentMutation.isPending || !isFormValid()}
            >
              {createCommentMutation.isPending ? "Submitting..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

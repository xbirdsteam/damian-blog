'use server'

import { Comment, CommentStatus } from "@/types/comment";
import { createClient } from "@/utils/supabase/server";

const COMMENTS_PER_PAGE = 5;

export async function getCommentsByPostId(postId: string, page: number = 1): Promise<{
    comments: Comment[];
    totalComments: number;
    totalPages: number;
}> {
    const supabase = await createClient();
    // Get approved comments with count
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .eq('status', CommentStatus.APPROVED)
        .order('created_at', { ascending: true })
        .range((page - 1) * COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE - 1);

    if (error) {
        console.error('Error fetching comments:', error);
        return { comments: [], totalComments: 0, totalPages: 0 };
    }

    // Organize comments into a tree structure
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];
    let validCommentsCount = 0;

    // First pass: map all comments
    comments.forEach((comment) => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    // Second pass: organize into tree and count valid comments
    comments.forEach((comment) => {
        if (comment.parent_id) {
            const parentComment = commentMap.get(comment.parent_id);
            // Only add reply if parent exists and is approved
            if (parentComment && parentComment.status === CommentStatus.APPROVED) {
                parentComment.replies?.push(commentMap.get(comment.id)!);
                validCommentsCount++; // Count valid reply
            }
        } else {
            rootComments.push(commentMap.get(comment.id)!);
            validCommentsCount++; // Count root comment
        }
    });

    const totalPages = Math.ceil(validCommentsCount / COMMENTS_PER_PAGE);
    
    return {
        comments: rootComments,
        totalComments: validCommentsCount,
        totalPages,
    };
}

export async function createComment(data: {
  post_id: string;
  content: string;
  author_name: string;
  author_email: string;
  avatar_url?: string | null;
  parent_id?: string;
}) {
    const supabase = await createClient();

    const commentData = {
        ...data,
        status: CommentStatus.UNAPPROVED
    };

    const { error } = await supabase
        .from('comments')
        .insert([commentData]);

    if (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
} 
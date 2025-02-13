'use server'

import { Comment } from "@/types/comment";
import { createClient } from "@/utils/supabase/server";

const COMMENTS_PER_PAGE = 5;

export async function getCommentsByPostId(postId: string, page: number = 1): Promise<{
    comments: Comment[];
    totalComments: number;
    totalPages: number;
}> {
    const supabase = await createClient();

    // First get all comments for counting total
    const { count } = await supabase
        .from('comments')
        .select('*', { count: 'exact' })
        .eq('post_id', postId);

    // Then get paginated comments
    const { data: comments, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true })
        .range((page - 1) * COMMENTS_PER_PAGE, page * COMMENTS_PER_PAGE - 1);

    if (error) {
        console.error('Error fetching comments:', error);
        return { comments: [], totalComments: 0, totalPages: 0 };
    }

    // Organize comments into a tree structure
    const commentMap = new Map<string, Comment>();
    const rootComments: Comment[] = [];

    comments.forEach((comment) => {
        commentMap.set(comment.id, { ...comment, replies: [] });
    });

    comments.forEach((comment) => {
        if (comment.parent_id) {
            const parentComment = commentMap.get(comment.parent_id);
            if (parentComment) {
                parentComment.replies?.push(commentMap.get(comment.id)!);
            }
        } else {
            rootComments.push(commentMap.get(comment.id)!);
        }
    });

    const totalComments = count || 0;
    const totalPages = Math.ceil(totalComments / COMMENTS_PER_PAGE);

    return {
        comments: rootComments,
        totalComments,
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

    const { error } = await supabase
        .from('comments')
        .insert([data]);

    if (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
} 
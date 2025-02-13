export interface Comment {
    id: string;
    post_id: string;
    author_name: string;
    author_email: string;
    content: string;
    parent_id: string | null;
    created_at: string;
    updated_at: string;
    replies?: Comment[];
    avatar_url?: string | null;
}

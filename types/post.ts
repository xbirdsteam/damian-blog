export enum PostStatus {
    DRAFT = "draft",
    PUBLISHED = "published",
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    short_description: string;
    content: string;
    status: PostStatus;
    publish_date: string;
    post_img: string;
    created_at: string;
    updated_at: string;
    posts_categories?: PostsCategories[];
    next_post?: {
        title: string;
        slug: string;
    } | null;
    prev_post?: {
        title: string;
        slug: string;
    } | null;
    tags?: string[];
    author_id: string;
    users?: {
        id: string;
        fullname: string;
        avatar_url: string;
    };
    
}

export interface PostsCategories {
    categories: {
        id: number;
        name: string;
    }
}
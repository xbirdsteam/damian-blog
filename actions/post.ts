'use server'

import { Post } from "@/types/post";
import { createClient } from "@/utils/supabase/server"

const ITEMS_PER_PAGE = 6; // Define items per page

export const getPosts = async (page: number = 1) => {
    const supabase = await createClient()

    let query = supabase
        .from('posts')
        .select('*', { count: 'exact' }) // Include count for total items
        .eq('status', 'published')
        .order('publish_date', { ascending: false })


    if (page) {
        const start = (page - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE - 1;
        query = query.range(start, end);
    }

    const { data, error, count } = await query

    if (error) {
        console.error('Error fetching posts:', error)
        return { posts: [], totalItems: 0 }
    }

    return { posts: data, totalItems: count || 0 }
}

export const getPostBySlug = async (slug: string): Promise<Post | null> => {
    const supabase = await createClient()

    // Get the main post with categories and author
    const { data: post, error } = await supabase
        .from('posts')
        .select(`
            *,
            posts_categories (
                categories (
                    id,
                    name
                )
            ),
            users (
                id,
                fullname,
                avatar_url
            )
        `)
        .eq('slug', slug)
        .single()   
    if (error || !post) {
        return null
    }

    // Get next and previous posts based on created_at
    const [prevPostResult, nextPostResult] = await Promise.all([
        supabase
            .from('posts')
            .select('title, slug')
            .eq('status', 'published')
            .lt('created_at', post.created_at)
            .order('created_at', { ascending: false })
            .limit(1)
            .single(),
        supabase
            .from('posts')
            .select('title, slug')
            .eq('status', 'published')
            .gt('created_at', post.created_at)
            .order('created_at', { ascending: true })
            .limit(1)
            .single()
    ])

    return {
        ...post,
        prev_post: prevPostResult.data,
        next_post: nextPostResult.data
    }
}
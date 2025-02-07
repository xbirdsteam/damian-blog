'use server'

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

export const getPostBySlug = async (slug: string) => {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('slug', slug)
        .single()

    if (error) {
        console.error('Error fetching post:', error)
        return null
    }

    return data
}
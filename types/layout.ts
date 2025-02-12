export interface LayoutData {
    id: string;
    logo_url: string;
    social_links: {
        website?: string;
        youtube?: string;
        instagram?: string;
        linkedin?: string;
    };
}


export interface SeoConfig {
    id: string;
    seo_ref_id: string;
    meta_title: string;
    meta_description: string;
    meta_keywords: string;
    og_image: string;
    slug: string;
    created_at: string;
    updated_at: string;
}

export interface TimelineItem {
    year: string;
    content: string;
    title: string;
}

export interface LinkItem {
    id: string;
    url: string;
    title: string;
}

export interface AboutData {
    id: string;
    title: string;
    mission: string;
    vision: string;
    where_i_am: string;
    links: LinkItem[];
    image_url: string | null;
    timelines: TimelineItem[];
} 
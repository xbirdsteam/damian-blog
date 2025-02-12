import { Post } from "@/types/post";
import { createClient } from "@/utils/supabase/server";
import Pagination from "./Pagination";
import PostItem from "./PostItem";
import MobilePostList from "./MobilePostList";
import { Category } from "@/types/category";

const ITEMS_PER_PAGE = 6; // Keep 6 items per page for the grid layout

async function getPosts(
  categoryId?: string,
  page?: number,
  showAll: boolean = false,
  searchQuery?: string
) {
  const supabase = await createClient();

  // Base query for counting with proper joins when category is selected
  let countQuery = supabase
    .from("posts")
    .select("*", { count: "exact", head: true })
    .eq("status", "published");

  // Base query for posts with proper joins
  let query = supabase
    .from("posts")
    .select(
      `
      *,
      posts_categories!inner (
        categories (
          id,
          name
        )
      )
    `
    )
    .eq("status", "published")
    .order("publish_date", { ascending: false });

  // Apply search if provided
  if (searchQuery) {
    const searchCondition = `title.ilike.%${searchQuery}%,short_description.ilike.%${searchQuery}%`;
    countQuery = countQuery.or(searchCondition);
    query = query.or(searchCondition);
  }

  // Apply category filter if categoryId is provided
  if (categoryId) {
    // For count query, we need to join the tables first
    countQuery = supabase
      .from("posts")
      .select(
        `
        id,
        posts_categories!inner (
          category_id
        )
      `,
        { count: "exact", head: true }
      )
      .eq("status", "published")
      .eq("posts_categories.category_id", categoryId);

    // For main query, filter by category_id
    query = query.eq("posts_categories.category_id", categoryId);
  }

  const { count } = await countQuery;

  // Apply pagination if not showing all
  if (!showAll && page) {
    query = query.range((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE - 1);
  }

  const { data: posts, error } = await query;

  if (error) {
    console.error("Error fetching posts:", error);
    return { posts: [], totalItems: 0 };
  }

  return {
    posts: posts.map((post: Post) => ({
      ...post,
    })),
    totalItems: count || 0,
  };
}

export default async function PostList({
  searchParams,
  categories,
}: {
  searchParams: {
    category?: string;
    page?: string;
    showAll?: string;
    search?: string;
  };
  categories: Category[];
}) {
  const showAll = searchParams.showAll === "true";
  const currentPage = searchParams.page ? parseInt(searchParams.page) : 1;
  const categoryId = categories.find(
    (category) =>
      category.name.toLowerCase() === searchParams.category?.toLowerCase()
  )?.id;
  const { posts, totalItems } = await getPosts(
    categoryId,
    currentPage,
    showAll,
    searchParams.search
  );
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  return (
    <div>
      {posts.length === 0 ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <p className="text-neutral-primary-text text-lg">No posts found</p>
        </div>
      ) : (
        <>
          {/* Desktop view */}
          <div className="hidden md:block">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[60px]">
              {posts.map((post) => (
                <PostItem key={post.id} {...post} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
              baseUrl="/gastronomy"
              showAllResults={showAll}
            />
          </div>

          {/* Mobile view with infinite scroll */}
          <MobilePostList initialPosts={posts} initialTotalItems={totalItems} />
        </>
      )}
    </div>
  );
}

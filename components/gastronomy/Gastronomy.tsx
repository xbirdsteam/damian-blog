import { Category } from "@/types/category";
import Filter from "./Filter";
import PostList from "./PostList";

interface GastronomyProps {
  categories: Category[];
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}

export default function Gastronomy({
  categories,
  searchParams,
}: GastronomyProps) {
  return (
    <div className="container mx-auto py-[30px] mlg:py-20">
      {/* Title */}
      <h1 className="hidden mlg:block text-display-b-56 text-neutral-primary-text mb-4">
        Gastronomy
      </h1>

      {/* Categories */}
      <Filter categories={categories} />

      <PostList searchParams={searchParams} categories={categories} />
    </div>
  );
}

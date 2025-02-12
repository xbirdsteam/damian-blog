"use client";

import { cn } from "@/lib/utils";
import { Category } from "@/types/category";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import GastronomySearch from "./GastronomySearch";
import Link from "next/link";

const ALL_CATEGORY = {
  id: 0,
  name: "ALL",
  index: 0,
  is_active: true,
};

interface FilterProps {
  categories: Category[];
}

export default function Filter({ categories }: FilterProps) {
  // Combine ALL with database categories
  const allCategories = [ALL_CATEGORY, ...categories];
  const params = useSearchParams();
  const categorySelected = useMemo(() => params.get("category"), [params]);

  return (
    <div className="flex flex-col mlg:flex-row mlg:items-center mlg:justify-between gap-5">
      {/* Categories */}
      <div className="flex flex-row justify-center mlg:justify-start flex-wrap gap-x-5 gap-y-[10px] mlg:min-h-11">
        {allCategories
          .filter((cat) => cat.is_active)
          .sort((a, b) => a.index - b.index)
          .map((category) => (
            <Link
              key={category.id}
              prefetch
              href={`/gastronomy?category=${category.name}`}
              className={
                "group text-subheader-m-16 text-neutral-primary-text transition-colors relative py-2"
              }
            >
              {category.name.toUpperCase()}
              <div
                className={cn(
                  "absolute -bottom-1 left-1/2 -translate-x-1/2 h-[1.5px] w-6 bg-neutral-primary-text opacity-0 group-hover:opacity-100 transition-opacity",
                  categorySelected === category.name ||
                    (!categorySelected && category.id === 0)
                    ? "opacity-100"
                    : ""
                )}
              />
            </Link>
          ))}
      </div>

      {/* Search */}
      <div className="w-full mlg:w-auto">
        <GastronomySearch />
      </div>
    </div>
  );
}

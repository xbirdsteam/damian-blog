/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeftIcon } from "@/components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "@/components/icons/ArrowRightIcon";
import { useEffect } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  baseUrl: string;
  showAllResults?: boolean;
}

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  baseUrl,
  showAllResults = false,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const showingFrom = currentPage * itemsPerPage;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", pageNumber.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  const handleShowAllToggle = (checked: boolean) => {
    const params = new URLSearchParams(searchParams.toString());
    if (checked) {
      params.set("showAll", "true");
    } else {
      params.delete("showAll");
    }
    router.push(`${baseUrl}?${params.toString()}`, {
      scroll: false,
    });
  };

  useEffect(() => {
    router.prefetch(`${baseUrl}?page=1&showAll=true`);
  }, []);

  return (
    <div className="hidden md:flex items-center justify-between mt-8">
      {/* Left side - Switch */}
      <div className="flex items-center gap-2">
        <Switch
          id="show-results"
          checked={showAllResults}
          onCheckedChange={handleShowAllToggle}
        />
        <label
          htmlFor="show-results"
          className="text-paragraph-r-14 text-neutral-text-secondary cursor-pointer"
        >
          Show all results
        </label>
      </div>

      {/* Right side - Results count and pagination */}
      <div className="flex items-center gap-8">
        {/* Results count */}
        <div className="text-subheader-r-16 text-neutral-text-disable space-x-2">
          <span>Show</span>
          <span className="text-neutral-primary-text inline-flex justify-center items-center size-[34px] bg-neutral-background border border-neutral-border rounded-[2px]">
            {showingFrom}
          </span>
          <span>
            of{" "}
            <span className="text-neutral-primary-text text-subheader-r-16">
              {totalItems}
            </span>{" "}
            results
          </span>
        </div>

        {/* Pagination controls - Only show if not showing all results */}
        {!showAllResults && (
          <div className="flex items-center gap-5">
            {/* Previous page */}
            <Link
              prefetch
              href={createPageUrl(currentPage - 1)}
              className={`flex items-center justify-center w-[34px] h-[34px] ${
                currentPage <= 1
                  ? "pointer-events-none opacity-50"
                  : "hover:opacity-70"
              }`}
              aria-label="Previous page"
            >
              <ArrowLeftIcon />
            </Link>

            {/* Page numbers */}
            <div className="flex items-center gap-[6px]">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Link
                    prefetch
                    key={page}
                    href={createPageUrl(page)}
                    className={`flex items-center rounded-[2px] justify-center w-[34px] h-[34px] text-paragraph-r-14 ${
                      currentPage === page
                        ? "bg-neutral-primary-text text-white"
                        : "bg-neutral-divider text-neutral-text-secondary hover:text-neutral-primary-text"
                    }`}
                  >
                    {page}
                  </Link>
                )
              )}
            </div>

            {/* Next page */}
            <Link
              prefetch
              href={createPageUrl(currentPage + 1)}
              className={`flex items-center justify-center w-[34px] h-[34px] ${
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : "hover:opacity-70"
              }`}
              aria-label="Next page"
            >
              <ArrowRightIcon />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

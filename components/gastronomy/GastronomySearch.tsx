"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import { SearchSmallIcon } from "../icons/SearchSmallIcon";
import { XIcon } from "../icons/XIcon";

interface GastronomySearchProps {
  defaultValue?: string;
}

export default function GastronomySearch({
  defaultValue = "",
}: GastronomySearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(defaultValue);
  const [isFocused, setIsFocused] = useState(false);

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchValue) {
      params.set("search", searchValue);
    } else {
      params.delete("search");
    }
    // Reset to first page when searching
    params.delete("page");
    router.push(`/gastronomy?${params.toString()}`);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  const handleClear = () => {
    setSearchValue("");
  };

  return (
    <div
      className={`relative flex items-center w-full mlg:w-[330px] h-11 px-3 gap-2 rounded-[4px] border 
        ${
          isFocused
            ? "border-primary"
            : "border-neutral-border hover:border-neutral-text-disable"
        }`}
    >
      <div className="flex items-center justify-center">
        <SearchSmallIcon width={18} height={18} />
      </div>
      <input
        type="text"
        spellCheck={false}
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyUp={handleKeyUp}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder="Search..."
        className="flex-1 bg-transparent text-neutral-primary-text outline-none text-paragraph-r-14 placeholder:text-paragraph-r-14 font-medium placeholder:text-neutral-text-disable"
      />
      {searchValue && (
        <button
          onClick={handleClear}
          className="flex items-center justify-center hover:opacity-70"
        >
          <XIcon />
        </button>
      )}
    </div>
  );
}

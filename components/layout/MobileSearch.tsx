"use client";

import { useState } from "react";
import { SearchNormalIcon } from "../icons/SearchNormalIcon";
import { SearchSmallIcon } from "../icons/SearchSmallIcon";
import { XIcon } from "../icons/XIcon";
import { Loading } from "../common/Loading";
import { KeyboardEvent } from "react";
import { useRouter } from "next/navigation";

interface MobileSearchProps {
  onSearchOpen: (isOpen: boolean) => void;
}

export default function MobileSearch({ onSearchOpen }: MobileSearchProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();

  const handleOpen = (open: boolean) => {
    setIsOpen(open);
    onSearchOpen(open);
  };

  const handleKeyUp = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsSearching(true);
      const searchValue = event.currentTarget.value.trim();
      const params = new URLSearchParams();
      if (searchValue) {
        params.set("search", searchValue);
      } else {
        params.delete("search");
      }
      // Reset to first page when searching
      params.delete("page");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/gastronomy?${params.toString()}`);
      setIsSearching(false);
      handleOpen(false); // Close search after submitting
    }
  };

  return (
    <>
      {!isSearching && (
        <div
          className={`flex items-center justify-center transition-opacity duration-300 ${
            isOpen ? "h-screen" : ""
          }`}
        >
          {/* Container for animation */}
          <div
            className={`flex items-center transition-all duration-300 ease-in-out ${
              isOpen ? "w-[280px]" : "w-10"
            }`}
          >
            {/* Search Input and Icons */}
            <div
              className={`flex items-center h-11 w-full border-b border-neutral-primary-text transition-opacity duration-300 ${
                isOpen ? "flex" : "hidden"
              }`}
            >
              <div className="flex items-center gap-2 flex-1">
                <SearchSmallIcon />
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full bg-transparent text-neutral-primary-text outline-none text-[16px] font-medium placeholder:text-gray-500"
                  autoFocus={isOpen}
                  onKeyUp={handleKeyUp}
                />
              </div>

              {/* Close Button */}
              <button onClick={() => handleOpen(false)}>
                <XIcon />
              </button>
            </div>

            {/* Search Icon Button */}
            <button
              className={`rounded-full p-2 hover:bg-gray-100 transition-all duration-300 ${
                isOpen ? "hidden" : "block"
              }`}
              aria-label="Search"
              onClick={() => handleOpen(true)}
            >
              <SearchNormalIcon />
            </button>
          </div>
        </div>
      )}
      {isSearching && <Loading size={3.75} color="#0D0D0D" />}
    </>
  );
}

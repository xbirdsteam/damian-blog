"use client";

import { KeyboardEvent, useState } from "react";
import { Loading } from "../common/Loading";
import { SearchNormalIcon } from "../icons/SearchNormalIcon";
import { SearchSmallIcon } from "../icons/SearchSmallIcon";
import { XIcon } from "../icons/XIcon";

export default function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const searchValue = event.currentTarget.value.trim();
      if (searchValue) {
        setIsSearching(true);
        // Simulate loading for 2 seconds
        await new Promise((resolve) => setTimeout(resolve, 2000));
        // router.push(`/search?q=${encodeURIComponent(searchValue)}`);
        setIsSearching(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-center mlg:justify-end">
        {/* Container for animation */}
        <div
          className={`flex items-center transition-all duration-300 ease-in-out ${
            isOpen ? "w-[280px]" : "w-10"
          }`}
        >
          {/* Search Input and Icons */}
          <div
            className={`flex items-center h-11 w-full border-b border-neutral-primary-text transition-opacity duration-300 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="flex items-center gap-2 flex-1">
              <SearchSmallIcon />
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-transparent text-neutral-primary-text outline-none text-[16px] font-medium placeholder:text-gray-500"
                autoFocus={isOpen}
                onKeyDown={handleKeyDown}
              />
            </div>

            {/* Close Button */}
            <button onClick={() => setIsOpen(false)}>
              <XIcon />
            </button>
          </div>

          {/* Search Icon Button (Absolute positioned over the input when closed) */}
          <button
            className={`absolute rounded-full p-2 hover:bg-gray-100 transition-opacity duration-300 ${
              isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Search"
            onClick={() => setIsOpen(true)}
          >
            <SearchNormalIcon />
          </button>
        </div>
      </div>
      {isSearching && <Loading size={5} color="#FFF" />}
    </>
  );
}

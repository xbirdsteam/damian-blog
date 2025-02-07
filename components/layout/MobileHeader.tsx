"use client";
import { useState } from "react";
import { HamburgerMenuIcon } from "../icons/HamburgerMenuIcon";
import { XIcon } from "../icons/XIcon";
import MobileNavbar from "./MobileNavbar";
import MobileSearch from "./MobileSearch";

interface IProps {
  children: React.ReactNode;
}

const MobileHeader = ({ children }: IProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="block mlg:hidden fixed top-4 left-4 right-4 z-50 h-[54px] overflow-hidden">
      {/* Header Content */}
      <input type="checkbox" id="mobile-menu" className="hidden peer" />
      <div className="h-full z-[9999999] bg-white rounded-lg border border-neutral-border relative [&_svg:last-child]:hidden peer-checked:[&_svg:first-child]:hidden peer-checked:[&_svg:last-child]:!block">
        <div className="h-full px-4 flex items-center justify-between">
          {children}
          <label
            htmlFor="mobile-menu"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            <HamburgerMenuIcon />
            <XIcon />
          </label>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="fixed inset-0 z-[1] bg-white translate-x-[120%] peer-checked:translate-x-0 transition-transform duration-500">
        <div className="h-screen flex flex-col justify-center gap-8">
          {!isSearchOpen && <MobileNavbar />}
          <MobileSearch onSearchOpen={setIsSearchOpen} />
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;

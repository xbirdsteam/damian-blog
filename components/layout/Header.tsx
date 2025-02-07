import LayoutLogo from "./LayoutLogo";
import Navbar from "./Navbar";
import Search from "./Search";
import { HEADER_HEIGHT } from "@/lib/constants";
import MobileHeader from "./MobileHeader";

const Header = () => {
  return (
    <>
      <MobileHeader>
        <LayoutLogo />
      </MobileHeader>
      <header
        className="fixed top-4 left-4 right-4 z-50 hidden mlg:block backdrop-blur-sm"
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <div
          className="mx-auto flex max-w-7xl items-center p-6 border border-neutral-border rounded-[8px] bg-white"
          style={{ height: `${HEADER_HEIGHT}px` }}
        >
          {/* Left: Logo */}
          <LayoutLogo />

          {/* Center: Navigation */}
          <div className="flex-grow flex justify-center">
            <Navbar />
          </div>

          {/* Right: Search */}
          <Search />
        </div>
      </header>
    </>
  );
};

export default Header;

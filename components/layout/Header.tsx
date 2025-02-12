import { HEADER_HEIGHT } from "@/lib/constants";
import LayoutLogo from "./LayoutLogo";
import MobileHeader from "./MobileHeader";
import Navbar from "./Navbar";
import Search from "./Search";

const Header = () => {
  return (
    <>
      <MobileHeader>
        <LayoutLogo />
      </MobileHeader>
      <header
        className="fixed top-4 left-4 right-4 z-50 hidden mlg:block"
        style={{ height: `${HEADER_HEIGHT}px` }}
      >
        <div
          className="mx-auto p-6 border border-neutral-border rounded-[8px] bg-white"
          style={{ height: `${HEADER_HEIGHT}px` }}
        >
          <div className="container mx-auto flex items-center h-full">
            {/* Left: Logo */}
            <LayoutLogo />

            {/* Center: Navigation */}
            <div className="flex-grow flex justify-center">
              <Navbar />
            </div>

            {/* Right: Search */}
            <Search />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

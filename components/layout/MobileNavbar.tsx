"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MENU_ITEMS = [
  { label: "GASTRONOMY", href: "/gastronomy" },
  { label: "ABOUT", href: "/about" },
  { label: "CONSULTANCY", href: "/consultancy" },
  { label: "CONTACT", href: "/contact" },
];

const MobileNavbar = () => {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col items-center justify-center gap-8 text-neutral-primary">
      {MENU_ITEMS.map((item, index) => (
        <div key={item.href} className="relative flex flex-col items-center">
          <Link
            prefetch
            href={item.href}
            className="group relative text-2xl leading-[140%] py-2 h-[50px] flex items-center justify-center font-medium"
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {item.label}
            <div
              className={`absolute -bottom-1 h-[1.5px] w-6 bg-neutral-primary-text transition-opacity duration-200 ${
                pathname === item.href
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              }`}
            />
          </Link>
        </div>
      ))}
    </nav>
  );
};

export default MobileNavbar;

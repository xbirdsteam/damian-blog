"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "GASTRONOMY", href: "/gastronomy" },
  { name: "ABOUT", href: "/about" },
  { name: "CONSULTANCY", href: "/consultancy" },
  { name: "CONTACT", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="h-10 flex items-center">
      <div className="hidden md:flex items-center">
        {navigation.map((item, index) => (
          <div key={item.name} className="flex items-center">
            <Link
              prefetch
              href={item.href}
              className="group relative flex flex-col items-center px-4"
            >
              <p className="text-neutral-primary-text text-base font-medium">
                {item.name}
              </p>
              <div
                className={`absolute -bottom-1 h-[1.5px] w-6 bg-neutral-primary-text transition-opacity duration-200 ${
                  pathname === item.href
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100"
                }`}
              />
            </Link>
            {index < navigation.length - 1 && (
              <div className="h-5 w-[1px] bg-neutral-primary-text" />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}

import Link from "next/link";
import Image from "next/image";
import { InstagramIcon } from "../icons/InstagramIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { TiktokIcon } from "../icons/TiktokIcon";
import { LinkdedinIcon } from "../icons/LinkdedinIcon";
import { PinterestIcon } from "../icons/PinterestIcon";

const socialLinks = [
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "YouTube", href: "#", icon: YoutubeIcon },
  { name: "TikTok", href: "#", icon: TiktokIcon },
  { name: "LinkedIn", href: "#", icon: LinkdedinIcon },
  { name: "Pinterest", href: "#", icon: PinterestIcon },
];

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-[50px]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[150px] h-[48px]">
            <Image
              src="/hero-section-logo.png"
              alt="Hero Logo"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="flex items-center gap-6">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  prefetch
                  key={link.name}
                  href={link.href}
                  className="text-neutral-primary-text hover:opacity-70 transition-opacity"
                >
                  <Icon />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

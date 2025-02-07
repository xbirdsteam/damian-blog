import Image from "next/image";
import Link from "next/link";
import { HomeData } from "@/types/home";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { TiktokIcon } from "../../icons/TiktokIcon";
import { LinkdedinIcon } from "../../icons/LinkdedinIcon";
import { PinterestIcon } from "../../icons/PinterestIcon";

interface HeroSectionProps {
  data: HomeData;
}

const socialLinks = [
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "YouTube", href: "#", icon: YoutubeIcon },
  { name: "TikTok", href: "#", icon: TiktokIcon },
  { name: "LinkedIn", href: "#", icon: LinkdedinIcon },
  { name: "Pinterest", href: "#", icon: PinterestIcon },
];

export default function HeroSection({ data }: HeroSectionProps) {
  return (
    <section className="relative w-full h-screen">
      {/* Desktop Image */}
      <div className="hidden md:block relative w-full h-full">
        <Image
          src={data.hero_desktop_img_url}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Mobile Image */}
      <div className="block md:hidden relative w-full h-full">
        <Image
          src={data.hero_mobile_img_url}
          alt="Hero Background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10">
        {/* Logo */}
        <div className="relative w-[295px] h-[94px]">
          <Image
            src="/hero-section-logo.png"
            alt="Hero Logo"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Social Links */}
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
    </section>
  );
}

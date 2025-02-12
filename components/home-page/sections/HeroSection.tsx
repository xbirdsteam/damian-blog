import { HomeData } from "@/types/home";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { InstagramIcon } from "../../icons/InstagramIcon";
import { LinkdedinIcon } from "../../icons/LinkdedinIcon";
import { PinterestIcon } from "../../icons/PinterestIcon";
import { TiktokIcon } from "../../icons/TiktokIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";

interface HeroSectionProps {
  data: HomeData;
}
interface SocialLink {
  instagram: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
  pinterest: string;
}

const socialLinks = [
  { name: "Instagram", icon: InstagramIcon },
  { name: "YouTube", icon: YoutubeIcon },
  { name: "TikTok", icon: TiktokIcon },
  { name: "LinkedIn", icon: LinkdedinIcon },
  { name: "Pinterest", icon: PinterestIcon },
];

const getSocialLinks = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("layouts").select("*").single();
  if (error) throw error;
  return data;
};

export default async function HeroSection({ data }: HeroSectionProps) {
  const layoutData = await getSocialLinks();
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
            src={layoutData.footer_logo ?? ""}
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
              <a
                target="_blank"
                key={link.name}
                href={
                  layoutData.social_links[
                    link.name.toLowerCase() as keyof SocialLink
                  ]
                }
                className="text-neutral-primary-text hover:opacity-70 transition-opacity"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

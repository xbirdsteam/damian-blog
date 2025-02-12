import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import { InstagramIcon } from "../icons/InstagramIcon";
import { LinkdedinIcon } from "../icons/LinkdedinIcon";
import { PinterestIcon } from "../icons/PinterestIcon";
import { TiktokIcon } from "../icons/TiktokIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";

const socialLinks = [
  { name: "Instagram", href: "#", icon: InstagramIcon },
  { name: "YouTube", href: "#", icon: YoutubeIcon },
  { name: "TikTok", href: "#", icon: TiktokIcon },
  { name: "LinkedIn", href: "#", icon: LinkdedinIcon },
  { name: "Pinterest", href: "#", icon: PinterestIcon },
];

interface SocialLink {
  instagram: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
  pinterest: string;
}

const getSocialLinks = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("layouts").select("*").single();
  if (error) throw error;
  return data;
};

export async function Footer() {
  const layoutData = await getSocialLinks();
  return (
    <footer className="border-t">
      <div className="container py-[50px]">
        <div className="flex flex-col items-center gap-6">
          <div className="relative w-[150px] h-[48px]">
            <Image
              src={layoutData.footer_logo ?? ""}
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
      </div>
    </footer>
  );
}

import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";

export async function getLayoutData() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("layouts")
    .select("header_logo")
    .single();

  return data;
}

export default async function LayoutLogo() {
  const layout = await getLayoutData();

  if (!layout?.header_logo) {
    return (
      <Link href="/">
        <div className="size-10 rounded-full bg-black" />
      </Link>
    );
  }

  return (
    <Link href="/" className="size-10 relative">
      <Image
        src={layout.header_logo}
        alt="Site Logo"
        fill
        className="object-cover"
        priority
        sizes="100%"
      />
    </Link>
  );
}

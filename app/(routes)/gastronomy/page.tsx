import { BackgroundMove } from "@/components/common/BackgroundMove";
import Gastronomy from "@/components/gastronomy/Gastronomy";
import { createClient } from "@/utils/supabase/server";

interface IProps {
  searchParams: Promise<{ id: string | undefined | string[] }>;
}

async function getCategories() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("index");

  if (error) {
    console.error("Supabase error:", error);
    return []; // Return empty array in case of error
  }

  return categories || []; // Return categories data or empty array if null
}

export default async function GastronomyPage({ searchParams }: IProps) {
  const [categories, paramsRes] = await Promise.all([
    getCategories(),
    searchParams,
  ]);
  return (
    <>
      <BackgroundMove />
      <Gastronomy categories={categories} searchParams={paramsRes} />
    </>
  );
}

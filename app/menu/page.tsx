import { getPublicMenuItems, getCategories } from "@/lib/actions/menu";
import MenuClientPage from "@/components/menu/MenuClientPage";

export const revalidate = 60; // revalidate every 60 seconds

export default async function MenuPage() {
  const [items, categories] = await Promise.all([
    getPublicMenuItems(),
    getCategories(),
  ]);

  return <MenuClientPage items={items ?? []} categories={categories ?? []} />;
}

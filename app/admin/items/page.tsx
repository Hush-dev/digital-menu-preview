import { getMenuItems, getCategories } from "@/lib/actions/menu";
import ItemsClientPage from "@/components/admin/ItemsClientPage";

export default async function AdminItemsPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  return (
    <ItemsClientPage items={items ?? []} categories={categories ?? []} />
  );
}

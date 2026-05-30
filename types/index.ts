export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string | null;
  image_url: string | null;
  veg: boolean;
  bestseller: boolean;
  available: boolean;
  created_at: string;
  updated_at: string;
}

export type MenuItemInsert = Omit<MenuItem, "id" | "created_at" | "updated_at">;
export type MenuItemUpdate = Partial<MenuItemInsert>;

export interface Category {
  id: number;
  name: string;
  sort_order: number;
}

export const ALL_CATEGORY = "All";

"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { MenuItemInsert, MenuItemUpdate } from "@/types";

export async function getMenuItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getPublicMenuItems() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .eq("available", true)
    .order("category")
    .order("name");
  if (error) throw error;
  return data;
}

export async function getCategories() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order");
  if (error) throw error;
  return data;
}

export async function createMenuItem(item: MenuItemInsert) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").insert(item);
  if (error) return { error: error.message };
  revalidatePath("/admin/items");
  revalidatePath("/menu");
  return { success: true };
}

export async function updateMenuItem(id: string, updates: MenuItemUpdate) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("menu_items")
    .update(updates)
    .eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/items");
  revalidatePath("/menu");
  return { success: true };
}

export async function deleteMenuItem(id: string) {
  const supabase = await createClient();
  const { error } = await supabase.from("menu_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePath("/admin/items");
  revalidatePath("/menu");
  return { success: true };
}

export async function toggleAvailability(id: string, available: boolean) {
  return updateMenuItem(id, { available: !available });
}

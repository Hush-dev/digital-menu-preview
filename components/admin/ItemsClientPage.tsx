"use client";

import { useState, useTransition } from "react";
import type { MenuItem, Category } from "@/types";
import {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  toggleAvailability,
} from "@/lib/actions/menu";
import ItemModal from "./ItemModal";
import DeleteConfirmModal from "./DeleteConfirmModal";
import Toast from "../ui/Toast";
import styles from "./ItemsClientPage.module.css";

interface Props {
  items: MenuItem[];
  categories: Category[];
}

export default function ItemsClientPage({ items: initial, categories }: Props) {
  const [items, setItems] = useState<MenuItem[]>(initial);
  const [activeCategory, setActiveCategory] = useState("All");
  const [editItem, setEditItem] = useState<MenuItem | null>(null);
  const [showAdd, setShowAdd] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type?: "error" | "success" } | null>(null);
  const [isPending, startTransition] = useTransition();

  function showToast(msg: string, type: "success" | "error" = "success") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  // ── Add ──────────────────────────────────────────────
  async function handleAdd(data: Omit<MenuItem, "id" | "created_at" | "updated_at">) {
    startTransition(async () => {
      const result = await createMenuItem(data);
      if (result.error) return showToast(result.error, "error");

      // Optimistic: reload page data via router.refresh would be cleaner,
      // but for instant feedback we fake a temporary item with a temp id
      const tempItem: MenuItem = {
        ...data,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setItems((prev) => [...prev, tempItem]);
      setShowAdd(false);
      showToast("Item added!");
    });
  }

  // ── Edit ─────────────────────────────────────────────
  async function handleEdit(updates: Omit<MenuItem, "id" | "created_at" | "updated_at">) {
    if (!editItem) return;
    startTransition(async () => {
      const result = await updateMenuItem(editItem.id, updates);
      if (result.error) return showToast(result.error, "error");
      setItems((prev) =>
        prev.map((i) => (i.id === editItem.id ? { ...i, ...updates } : i))
      );
      setEditItem(null);
      showToast("Item updated!");
    });
  }

  // ── Toggle availability ───────────────────────────────
  async function handleToggle(id: string, available: boolean) {
    startTransition(async () => {
      const result = await toggleAvailability(id, available);
      if (result.error) return showToast(result.error, "error");
      setItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, available: !available } : i))
      );
      showToast("Availability updated.");
    });
  }

  // ── Delete ───────────────────────────────────────────
  async function handleDelete(id: string) {
    startTransition(async () => {
      const result = await deleteMenuItem(id);
      if (result.error) return showToast(result.error, "error");
      setItems((prev) => prev.filter((i) => i.id !== id));
      setDeleteId(null);
      showToast("Item deleted.");
    });
  }

  const allTabs = [{ id: 0, name: "All", sort_order: 0 }, ...categories];

  return (
    <div className={styles.root}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Menu Items</h1>
          <p className={styles.sub}>{items.length} total items</p>
        </div>
        <button className={styles.addBtn} onClick={() => setShowAdd(true)}>
          + Add Item
        </button>
      </div>

      {/* Category filter */}
      <div className={styles.tabs}>
        <div className={styles.tabsInner}>
          {allTabs.map((cat) => (
            <button
              key={cat.name}
              className={`${styles.tab} ${activeCategory === cat.name ? styles.tabActive : ""}`}
              onClick={() => setActiveCategory(cat.name)}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Item</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className={styles.empty}>
                  No items found
                </td>
              </tr>
            )}
            {filtered.map((item) => (
              <tr key={item.id}>
                <td>
                  {item.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className={styles.thumb}
                    />
                  ) : (
                    <div className={styles.thumbPlaceholder}>🍽</div>
                  )}
                </td>
                <td>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemDesc}>
                    {item.description?.slice(0, 52)}
                    {(item.description?.length ?? 0) > 52 ? "…" : ""}
                  </div>
                </td>
                <td className={styles.catCell}>{item.category}</td>
                <td className={styles.priceCell}>₹{item.price}</td>
                <td>
                  <span
                    className={`${styles.badge} ${
                      item.available ? styles.badgeOn : styles.badgeOff
                    }`}
                  >
                    {item.available ? "Available" : "Hidden"}
                  </span>
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.btnEdit}
                      onClick={() => setEditItem({ ...item })}
                    >
                      Edit
                    </button>
                    <button
                      className={styles.btnToggle}
                      onClick={() => handleToggle(item.id, item.available)}
                      disabled={isPending}
                    >
                      {item.available ? "Hide" : "Show"}
                    </button>
                    <button
                      className={styles.btnDelete}
                      onClick={() => setDeleteId(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showAdd && (
        <ItemModal
          categories={categories}
          onSubmit={handleAdd}
          onClose={() => setShowAdd(false)}
          title="Add New Item"
        />
      )}

      {/* Edit Modal */}
      {editItem && (
        <ItemModal
          categories={categories}
          initial={editItem}
          onSubmit={handleEdit}
          onClose={() => setEditItem(null)}
          title="Edit Item"
        />
      )}

      {/* Delete Confirm */}
      {deleteId && (
        <DeleteConfirmModal
          onConfirm={() => handleDelete(deleteId)}
          onClose={() => setDeleteId(null)}
          loading={isPending}
        />
      )}

      {/* Toast */}
      {toast && <Toast msg={toast.msg} type={toast.type} />}
    </div>
  );
}

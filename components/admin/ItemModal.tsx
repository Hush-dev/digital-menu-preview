"use client";

import { useState } from "react";
import type { MenuItem, Category } from "@/types";
import styles from "./ItemModal.module.css";

type FormData = Omit<MenuItem, "id" | "created_at" | "updated_at">;

interface Props {
  categories: Category[];
  initial?: MenuItem;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  title: string;
}

const DEFAULT_FORM: FormData = {
  name: "",
  category: "Coffee",
  price: 0,
  description: "",
  image_url: "",
  veg: true,
  bestseller: false,
  available: true,
};

export default function ItemModal({
  categories,
  initial,
  onSubmit,
  onClose,
  title,
}: Props) {
  const [form, setForm] = useState<FormData>(
    initial
      ? {
          name: initial.name,
          category: initial.category,
          price: initial.price,
          description: initial.description ?? "",
          image_url: initial.image_url ?? "",
          veg: initial.veg,
          bestseller: initial.bestseller,
          available: initial.available,
        }
      : { ...DEFAULT_FORM, category: categories[0]?.name ?? "Coffee" }
  );

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setForm((p) => ({ ...p, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || form.price <= 0) return;
    onSubmit(form);
  }

  return (
    <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={title}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>
              <label className={styles.label}>Name *</label>
              <input
                className={styles.input}
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                placeholder="Item name"
                required
              />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Price (₹) *</label>
              <input
                className={styles.input}
                type="number"
                min={0}
                value={form.price || ""}
                onChange={(e) => set("price", Number(e.target.value))}
                placeholder="0"
                required
              />
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Category</label>
            <select
              className={styles.select}
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Description</label>
            <input
              className={styles.input}
              value={form.description ?? ""}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Brief description…"
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Image URL</label>
            <input
              className={styles.input}
              value={form.image_url ?? ""}
              onChange={(e) => set("image_url", e.target.value)}
              placeholder="https://…"
            />
          </div>

          <div className={styles.toggleRow}>
            <ToggleField
              label="Veg"
              checked={form.veg}
              onChange={(v) => set("veg", v)}
            />
            <ToggleField
              label="Bestseller"
              checked={form.bestseller}
              onChange={(v) => set("bestseller", v)}
            />
            <ToggleField
              label="Available"
              checked={form.available}
              onChange={(v) => set("available", v)}
            />
          </div>

          <div className={styles.actions}>
            <button type="button" className={styles.cancelBtn} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={styles.submitBtn}>
              {initial ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className={styles.toggleItem}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`${styles.toggle} ${checked ? styles.toggleOn : styles.toggleOff}`}
        onClick={() => onChange(!checked)}
      />
      <span className={styles.toggleLabel}>{label}</span>
    </div>
  );
}

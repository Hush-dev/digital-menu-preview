"use client";

import type { Category } from "@/types";
import styles from "./CategoryTabs.module.css";

interface Props {
  categories: Category[];
  active: string;
  onChange: (cat: string) => void;
}

export default function CategoryTabs({ categories, active, onChange }: Props) {
  const all = [{ id: 0, name: "All", sort_order: 0 }, ...categories];

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {all.map((cat) => (
          <button
            key={cat.name}
            className={`${styles.btn} ${active === cat.name ? styles.active : ""}`}
            onClick={() => onChange(cat.name)}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </div>
  );
}

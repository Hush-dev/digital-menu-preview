"use client";

import { useState } from "react";
import type { MenuItem, Category } from "@/types";
import MenuCard from "./MenuCard";
import CategoryTabs from "./CategoryTabs";
import styles from "./MenuClientPage.module.css";

interface Props {
  items: MenuItem[];
  categories: Category[];
}

export default function MenuClientPage({ items, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? items
      : items.filter((i) => i.category === activeCategory);

  const groupedByCategory =
    activeCategory === "All"
      ? categories.map((cat) => ({
          name: cat.name,
          items: items.filter((i) => i.category === cat.name),
        })).filter((g) => g.items.length > 0)
      : null;

  return (
    <>
      {/* Hero */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <h1 className={styles.heroTitle}>
            Our <em>Menu</em>
          </h1>
          <p className={styles.heroSub}>Crafted with love, served with warmth</p>
        </div>
      </div>

      {/* Category tabs */}
      <CategoryTabs
        categories={categories}
        active={activeCategory}
        onChange={setActiveCategory}
      />

      {/* Menu grid */}
      <main className={styles.main}>
        {groupedByCategory ? (
          groupedByCategory.map((group) => (
            <section key={group.name} className={styles.section}>
              <h2 className={styles.sectionLabel}>{group.name}</h2>
              <div className={styles.grid}>
                {group.items.map((item) => (
                  <MenuCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))
        ) : filtered.length > 0 ? (
          <div className={styles.grid}>
            {filtered.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className={styles.empty}>
            <div className={styles.emptyIcon}>🍃</div>
            <p>No items available in this category</p>
          </div>
        )}
      </main>
    </>
  );
}

import { getMenuItems, getCategories } from "@/lib/actions/menu";
import Link from "next/link";
import styles from "./page.module.css";

export default async function DashboardPage() {
  const [items, categories] = await Promise.all([
    getMenuItems(),
    getCategories(),
  ]);

  const totalItems = items?.length ?? 0;
  const availableItems = items?.filter((i) => i.available).length ?? 0;
  const bestsellerItems = items?.filter((i) => i.bestseller).length ?? 0;
  const hiddenItems = totalItems - availableItems;

  const statCards = [
    { label: "Total Items", value: totalItems, icon: "🍽", color: "brown" },
    { label: "Available", value: availableItems, icon: "✅", color: "green" },
    { label: "Bestsellers", value: bestsellerItems, icon: "⭐", color: "caramel" },
    { label: "Hidden", value: hiddenItems, icon: "👁", color: "muted" },
  ];

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.sub}>Welcome back. Here's your menu overview.</p>
        </div>
        <Link href="/admin/items" className={styles.ctaBtn}>
          + Add Item
        </Link>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        {statCards.map((s) => (
          <div key={s.label} className={`${styles.statCard} ${styles[s.color]}`}>
            <div className={styles.statIcon}>{s.icon}</div>
            <div className={styles.statValue}>{s.value}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Category breakdown */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>By Category</h2>
        <div className={styles.catGrid}>
          {categories?.map((cat) => {
            const count = items?.filter((i) => i.category === cat.name).length ?? 0;
            const available = items?.filter(
              (i) => i.category === cat.name && i.available
            ).length ?? 0;
            return (
              <div key={cat.name} className={styles.catCard}>
                <div className={styles.catName}>{cat.name}</div>
                <div className={styles.catCount}>{count} items</div>
                <div className={styles.catSub}>{available} available</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick links */}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Quick Links</h2>
        <div className={styles.links}>
          <Link href="/admin/items" className={styles.linkCard}>
            <span>🍽</span>
            <span>Manage Menu Items</span>
          </Link>
          <Link href="/menu" target="_blank" className={styles.linkCard}>
            <span>👁</span>
            <span>View Public Menu ↗</span>
          </Link>
          <Link href="/admin/settings" className={styles.linkCard}>
            <span>⚙️</span>
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

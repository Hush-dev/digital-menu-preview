import type { Metadata } from "next";
import Link from "next/link";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Menu — Brew & Bloom",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <div className={styles.logo}>
          {/* <span>☕</span> */}
          <span className={styles.logoText}>
            Brew<em>&amp;</em>Bloom
          </span>
        </div>
        <Link href="/auth/login" className={styles.adminBtn}>
          Admin ↗
        </Link>
      </header>
      {children}
    </div>
  );
}

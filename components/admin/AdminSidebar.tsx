"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions/auth";
import styles from "./AdminSidebar.module.css";

interface Props {
  userEmail: string;
}

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/admin/items", label: "Menu Items", icon: "🍽" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminSidebar({ userEmail }: Props) {
  const pathname = usePathname();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.top}>
        <Link href="/menu" className={styles.logo}>
          {/* <span className={styles.logoIcon}>☕</span> */}
          <span className={styles.logoText}>
            Brew<em>&</em>Bloom
          </span>
        </Link>
        <p className={styles.logoSub}>Admin Panel</p>
      </div>

      <nav className={styles.nav}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.navItem} ${
              pathname.startsWith(item.href) ? styles.active : ""
            }`}
          >
            <span className={styles.navIcon}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className={styles.bottom}>
        <div className={styles.user}>
          <div className={styles.avatar}>
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <span className={styles.email} title={userEmail}>
            {userEmail}
          </span>
        </div>
        <form action={logout}>
          <button type="submit" className={styles.logoutBtn}>
            Sign out
          </button>
        </form>
      </div>
    </aside>
  );
}

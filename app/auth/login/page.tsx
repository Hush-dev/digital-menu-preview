import LoginForm from "@/components/admin/LoginForm";
import Link from "next/link";
import styles from "./page.module.css";

export default function LoginPage() {
  return (
    <div className={styles.root}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Link href="/menu" className={styles.logo}>
            ☕ Brew<em>&amp;</em>Bloom
          </Link>
        </div>
        <div className={styles.icon}>🔐</div>
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.sub}>Sign in to manage your menu</p>
        <LoginForm />
        <Link href="/menu" className={styles.backLink}>
          ← Back to menu
        </Link>
      </div>
    </div>
  );
}

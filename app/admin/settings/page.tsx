import { createClient } from "@/lib/supabase/server";
import { logout } from "@/lib/actions/auth";
import styles from "./page.module.css";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>Settings</h1>
        <p className={styles.sub}>Manage your admin account</p>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Account</h2>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Email</span>
          <span className={styles.rowValue}>{user?.email}</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Role</span>
          <span className={styles.rowValue}>Administrator</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Last sign in</span>
          <span className={styles.rowValue}>
            {user?.last_sign_in_at
              ? new Date(user.last_sign_in_at).toLocaleString("en-IN", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })
              : "—"}
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Cafe Info</h2>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Name</span>
          <span className={styles.rowValue}>Brew &amp; Bloom</span>
        </div>
        <div className={styles.row}>
          <span className={styles.rowLabel}>Menu URL</span>
          <span className={styles.rowValue}>
            <a
              href="/menu"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              /menu ↗
            </a>
          </span>
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.cardTitle}>Danger Zone</h2>
        <p className={styles.dangerText}>
          Signing out will end your current session.
        </p>
        <form action={logout}>
          <button type="submit" className={styles.signOutBtn}>
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}

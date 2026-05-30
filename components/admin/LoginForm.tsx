"use client";

import { useState } from "react";
import { login } from "@/lib/actions/auth";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
    // On success, server action redirects — no need to set loading false
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className={styles.input}
          placeholder="admin@example.com"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className={styles.input}
          placeholder="••••••••"
        />
      </div>

      {error && <p className={styles.error}>{error}</p>}

      <button type="submit" disabled={loading} className={styles.btn}>
        {loading ? <span className="spinner" /> : "Sign in →"}
      </button>
    </form>
  );
}

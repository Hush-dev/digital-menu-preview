import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  title: "Admin — Brew & Bloom",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/auth/login");

  return (
    <div className={styles.root}>
      <AdminSidebar userEmail={user.email ?? ""} />
      <main className={styles.main}>{children}</main>
    </div>
  );
}

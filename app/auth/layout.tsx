import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Login — Brew & Bloom",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

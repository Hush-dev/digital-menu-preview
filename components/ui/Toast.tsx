"use client";

interface Props {
  msg: string;
  type?: "success" | "error";
}

export default function Toast({ msg, type = "success" }: Props) {
  return (
    <div className={`toast${type === "error" ? " error" : ""}`} role="status">
      {msg}
    </div>
  );
}

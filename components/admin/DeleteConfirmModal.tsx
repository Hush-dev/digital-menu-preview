"use client";

import styles from "./DeleteConfirmModal.module.css";

interface Props {
  onConfirm: () => void;
  onClose: () => void;
  loading: boolean;
}

export default function DeleteConfirmModal({ onConfirm, onClose, loading }: Props) {
  return (
    <div
      className={styles.overlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal} role="alertdialog">
        <div className={styles.icon}>🗑️</div>
        <h2 className={styles.title}>Delete Item?</h2>
        <p className={styles.msg}>
          This action cannot be undone. The item will be permanently removed from
          the menu.
        </p>
        <div className={styles.actions}>
          <button className={styles.cancelBtn} onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button
            className={styles.deleteBtn}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : "Yes, Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

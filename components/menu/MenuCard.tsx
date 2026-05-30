import Image from "next/image";
import type { MenuItem } from "@/types";
import styles from "./MenuCard.module.css";

interface Props {
  item: MenuItem;
}

export default function MenuCard({ item }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="(max-width: 600px) 160px, 240px"
            className={styles.img}
          />
        ) : (
          <div className={styles.imgPlaceholder}>🍽</div>
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.top}>
          <h3 className={styles.name}>{item.name}</h3>
          <span className={styles.price}>₹{item.price}</span>
        </div>
        {item.description && (
          <p className={styles.desc}>{item.description}</p>
        )}
        <div className={styles.tags}>
          {item.veg && <span className={`${styles.tag} ${styles.tagVeg}`}>🟢 Veg</span>}
          {item.bestseller && (
            <span className={`${styles.tag} ${styles.tagBest}`}>⭐ Bestseller</span>
          )}
        </div>
      </div>
    </div>
  );
}

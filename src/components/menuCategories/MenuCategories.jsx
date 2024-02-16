import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {
  return (
    <div className={styles.categoryList}>
      <Link
        href="/blog?cat=All%20Inclusive%20Resorts"
        className={`${styles.categoryItem} ${styles.allInclusive}`}
      >
      All-Inclusive Resorts
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.guidedTours}`}>
      Guided Tours
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.luxuryTravel}`}>
      Luxury Travel
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.cruisePackages}`}>
      Cruise Packages
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.adventureTours}`}>
      Adventure Tours
      </Link>
      <Link href="/blog" className={`${styles.categoryItem} ${styles.beachGetaways}`}>
      Beach Getaways 

      </Link>
    </div>
  );
};

export default MenuCategories;

import Link from "next/link";
import React from "react";
import styles from "./menuCategories.module.css";

const MenuCategories = () => {

  const travelCategories = [
    { name: 'All-Inclusive Resorts', link: '/blog?cat=All-Inclusive%20Resorts', style: 'allInclusive' },
    { name: 'Guided Tours', link: '/blog?cat=Guided%20Tours', style: 'guidedTours' },
    { name: 'Luxury Travel', link: '/blog?cat=Luxury%20Travel', style: 'luxuryTravel' },
    { name: 'Cruise Packages', link: '/blog?cat=Cruise%20Packages', style: 'cruisePackages' },
    { name: 'Adventure Tours', link: '/blog?cat=Adventure%20Tours', style: 'adventureTours' },
    { name: 'Beach Getaways', link: '/blog?cat=Beach%20Getaways', style: 'beachGetaways' },
    
  ];

  return (
    <div className={styles.categoryList}>
      {travelCategories.map(category => (
        <Link
          key={category.name}
          href={category.link}
          className={`${styles.categoryItem} ${styles[category.style]}`}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;

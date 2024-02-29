"use client"
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./menuCategories.module.css";


const MenuCategories = () => {

  const [categories, setCategories] = useState([]);
 

  useEffect(() => {
    fetch("/api/categories")
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div className={styles.categoryList}>
      {categories.map(cat => (  
        <Link key={cat.id} href={`/blog?cat=${cat.slug}`} className={`${styles.categoryItem} ${styles[cat.slug]}`}
        >
          {cat.title} 
        </Link>
      ))}
    </div>
  );
}

export default MenuCategories;
// import Link from "next/link";
// import React from "react";
// import styles from "./menuCategories.module.css";

// const categoryStyles = {
//   "all-inclusive-resorts": "allInclusive",
//   "guided-tours": "guidedTours", 
//   "luxury-travel": "luxuryTravel",
//   "cruise-packages": "cruisePackages",
//   "adventure-tours": "adventureTours",
//   "beach-getaways": "beachGetaways",
//   "cultural-experiences": "culturalExperiences" 
// }

// const MenuCategories = () => {

//   const travelCategories = [
//     { name: 'All-Inclusive Resorts', link: '/blog?cat=All-Inclusive%20Resorts', style: 'allInclusive' },
//     { name: 'Guided Tours', link: '/blog?cat=Guided%20Tours', style: 'guidedTours' },
//     { name: 'Luxury Travel', link: '/blog?cat=Luxury%20Travel', style: 'luxuryTravel' },
//     { name: 'Cruise Packages', link: '/blog?cat=Cruise%20Packages', style: 'cruisePackages' },
//     { name: 'Adventure Tours', link: '/blog?cat=Adventure%20Tours', style: 'adventureTours' },
//     { name: 'Beach Getaways', link: '/blog?cat=Beach%20Getaways', style: 'beachGetaways' },
    
//   ];

//   return (
//     <div className={styles.categoryList}>
//       {travelCategories.map(category => (
//         <Link
//           key={category.name}
//           href={category.link}
//           className={`${styles.categoryItem} ${styles[category.style]}`}
//         >
//           {category.name}
//         </Link>
//       ))}
//     </div>
//   );
// };

// export default MenuCategories;

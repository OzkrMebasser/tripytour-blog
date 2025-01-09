"use client"; // Garantiza que el componente se renderice solo en el cliente
import React, { useEffect, useState } from "react";
import styles from "./categoryList.module.css";
import Link from "next/link";

const MenuCategories = () => {
  const [categories, setCategories] = useState([]); // Almacena categorías
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Función para obtener categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/categories", {
          cache: "no-store",
        });

        // Verifica el estado de la respuesta
        if (!res.ok) {
          throw new Error(`Error fetching categories: ${res.statusText}`);
        }

        const responseData = await res.json();

        console.log("Datos obtenidos del servidor:", responseData);

        // Asegúrate de que sea un array antes de usarlo
        setCategories(Array.isArray(responseData) ? responseData : responseData.categories || []);
      } catch (err) {
        console.error("Error al cargar las categorías:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Renderización basada en el estado
  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!categories.length) return <p>No categories found.</p>;

  return (
    <div className={styles.categoryList}>
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/blog?cat=${encodeURIComponent(cat.slug)}`}
          className={`${styles.categoryItem} ${styles[cat.slug]}`}
        >
          {cat.title}
        </Link>
      ))}
    </div>
  );
};

export default MenuCategories;



// import React from "react";
// import styles from "./categoryList.module.css";
// import Link from "next/link";
// import Image from "next/image";

// const getData = async () => {
//   const res = await fetch("http://localhost:3000/api/categories", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed");
//   }

//   return res.json();
// };

// const CategoryList = async () => {
//   const data = await getData();
//   console.log(data)
//   return (
//     <div className={styles.container}>
//       <h1 className={styles.title}>Popular Categories</h1>
//       <div className={styles.categories}>
//         {data?.map((item) => (
//           <Link
//             href="/blog?cat=All%20Inclusive%20Resorts"
//             className={`${styles.category} ${styles[item.slug]}`}
//             key={item._id}
//           >
//             {item.img && (
//               <Image
//                 src={item.img}
//                 alt=""
//                 width={32}
//                 height={32}
//                 className={styles.image}
//               />
//             )}
//             {item.title}
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryList;

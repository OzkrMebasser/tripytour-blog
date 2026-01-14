"use client"
import React, { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import AuthLinks from "../authLinks/AuthLinks";
// import ThemeToggle from "../themeToggle/ThemeToggle";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      if (scrollY > 200) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${styles.container} ${scrolled ? styles.scrolled : styles.transparent} ${scrolled ? styles.sticky : ""}`}>
      <div className={styles.logo}>TRIPYTOUR</div>
      <div className={styles.links}>
            {/* <Link href="/">Inicio</Link>
          <Link href="/">Nosotros</Link>
          <Link href="/">Categorias</Link>
          <Link href="/">Contacto</Link> */}
    
        <Link href="/" className={styles.link}>
          Inicio
        </Link>
        <Link href="/nosotros" className={styles.link}>
          Nosotros
        </Link>
        <Link href="/categorias" className={styles.link}>
          Categorias
        </Link>
        <Link href="/contacto" className={styles.link}>
          Contacto
        </Link>

        <AuthLinks />
      </div>
    </div>
  );
};

export default Navbar;

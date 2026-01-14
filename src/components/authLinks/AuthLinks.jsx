"use client";
import Link from "next/link";
import styles from "./authLinks.module.css";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";

const AuthLinks = () => {
  const [open, setOpen] = useState(false);

  const { status, data: session } = useSession();

  // console.log(session.user.givenName)

  return (
    <>
      {status === "unauthenticated" ? (
        <Link href="/login" className={styles.link}>
          Login
        </Link>
      ) : (
        <>
          <Link href="/write" className={styles.link}>
            Write
          </Link>
          <span className={styles.link} onClick={signOut}>
            Logout
          
          </span>
          <br />
            {/* <p>Hola, {session.user.givenName || session.user.name ? session.user.givenName || session.user.name : "USURIO"}!</p> */}
        </>
      )}
      <div className={styles.burger} onClick={() => setOpen(!open)}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
      </div>
      {open && (
        <div className={styles.responsiveMenu}>
          <Link href="/">Inicio</Link>
          <Link href="/">Nosotros</Link>
          <Link href="/">Categorias</Link>
          <Link href="/">Contacto</Link>
          {status === "unauthenticated" ? (
            <Link href="/login">Login</Link>
          ) : (
            <>
              <Link href="/write">Write</Link>
              <span className={styles.link}>Logout       </span>
          
              <br />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default AuthLinks;

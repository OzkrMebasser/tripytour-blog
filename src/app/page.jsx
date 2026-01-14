"use client";
import Link from "next/link";
import styles from "./homepage.module.css";
import Featured from "@/components/featured/Featured";
import CategoryList from "@/components/categoryList/CategoryList";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/Menu/Menu";

// export default function Home({ searchParams }) {
//   const page = parseInt(searchParams) || 1;

export default function Home() {
  // const page = parseInt(searchParams) || 1;

  return (
    <div className=" mx-auto px-4 sm:px-6 lg:px-8">
      <Featured />
      {/* <CategoryList /> */}
      <div className="mt-8 flex gap-6">
        {/* <CardList page={page}/> */}
        <Menu />
       
      </div>
    </div>
  );
}

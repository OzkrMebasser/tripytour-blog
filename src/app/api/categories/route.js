

import clientPromise from "@/utils/mongoConnect";
import { NextResponse } from "next/server";

// GET - Obtener todas las categorías
export const GET = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(); // O puedes usar db("tu_nombre_de_bd") si lo necesitas
    const categories = await db.collection("categories").find().toArray();

    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.error("Error fetching categories:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// POST - Crear una nueva categoría
export const POST = async (req) => {
  try {
    const body = await req.json(); // 🔁 req.json() en vez de req.body
    const { slug, title, img } = body;

    const client = await clientPromise;
    const db = client.db();
    const existingCategory = await db.collection("categories").findOne({ slug });

    if (existingCategory) {
      return new NextResponse(
        JSON.stringify({ message: "Category already exists" }),
        { status: 400 }
      );
    }

    const newCategory = { slug, title, img };
    await db.collection("categories").insertOne(newCategory);

    return new NextResponse(JSON.stringify(newCategory), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

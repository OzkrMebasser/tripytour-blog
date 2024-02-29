import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    const categories = await prisma.category.findMany();

    return new NextResponse(JSON.stringify(categories, { status: 200 }));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};


// POST para crear una nueva categoría
export const POST = async (req) => {
  try {
    const { slug, title, img } = req.body;

    // Verificar si la categoría ya existe
    const existingCategory = await prisma.category.findUnique({
      where: { slug },
    });

    if (existingCategory) {
      return new NextResponse(
        JSON.stringify({ message: "Category already exists" }, { status: 400 })
      );
    }

    // Crear la nueva categoría
    const newCategory = await prisma.category.create({
      data: { slug, title, img },
    });

    return new NextResponse(
      JSON.stringify(newCategory, { status: 201 }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};
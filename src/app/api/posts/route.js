// app/api/posts/route.js

import { getAuthSession } from "@/utils/auth";
import clientPromise from "@/utils/mongoConnect";
import { NextResponse } from "next/server";

// GET ALL POSTS
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page")) || 1;
  const cat = searchParams.get("cat");

  const POST_PER_PAGE = 2;

  try {
    const client = await clientPromise;
    const db = client.db();

    const query = cat ? { catSlug: cat } : {};

    const posts = await db
      .collection("posts")
      .find(query)
      .sort({ createdAt: -1 }) // Ordenar por fecha descendente
      .skip(POST_PER_PAGE * (page - 1))
      .limit(POST_PER_PAGE)
      .toArray();

    const count = await db.collection("posts").countDocuments(query);

    return new NextResponse(JSON.stringify({ posts, count }), { status: 200 });
  } catch (err) {
    console.error("Error fetching posts:", err);
    return new NextResponse(
      JSON.stringify({ message: "Error al obtener los posts" }),
      { status: 500 }
    );
  }
};

// CREATE A POST
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "No autenticado" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const { title, desc, img, slug, catSlug } = body;

    // Validaciones
    if (!title || !title.trim()) {
      return new NextResponse(
        JSON.stringify({ message: "El título es requerido" }),
        { status: 400 }
      );
    }

    if (!desc || !desc.trim()) {
      return new NextResponse(
        JSON.stringify({ message: "El contenido es requerido" }),
        { status: 400 }
      );
    }

    if (!slug || !slug.trim()) {
      return new NextResponse(
        JSON.stringify({ message: "El slug es requerido" }),
        { status: 400 }
      );
    }

    if (!catSlug || !catSlug.trim()) {
      return new NextResponse(
        JSON.stringify({ message: "La categoría es requerida" }),
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Verificar si ya existe un post con el mismo slug
    const existingPost = await db.collection("posts").findOne({ slug });
    
    if (existingPost) {
      return new NextResponse(
        JSON.stringify({ message: "Ya existe un post con este título" }),
        { status: 400 }
      );
    }

    // Crear el nuevo post
    const newPost = {
      title: title.trim(),
      desc: desc.trim(),
      img: img || null,
      slug: slug.trim(),
      catSlug: catSlug.trim(),
      userEmail: session.user.email,
      createdAt: new Date(),
      updatedAt: new Date(),
      views: 0,
      likes: 0,
    };

    const result = await db.collection("posts").insertOne(newPost);

    if (!result.insertedId) {
      throw new Error("Error al insertar el post");
    }

    // Retornar el post creado con el ID
    const createdPost = {
      ...newPost,
      _id: result.insertedId,
    };

    return new NextResponse(JSON.stringify(createdPost), { status: 200 });
  } catch (err) {
    console.error("Error creating post:", err);
    return new NextResponse(
      JSON.stringify({ 
        message: "Error al crear el post: " + err.message 
      }),
      { status: 500 }
    );
  }
};
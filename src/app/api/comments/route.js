// app/api/comments/route.js

import { getAuthSession } from "@/utils/auth";
import clientPromise from "@/utils/mongoConnect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const postSlug = searchParams.get("postSlug");

  try {
    const client = await clientPromise;
    const db = client.db();

    const query = postSlug ? { postSlug } : {};
    const comments = await db.collection("comments").find(query).toArray();

    // Optional: populate user info manually if stored in another collection
    // const users = await db.collection("users").find().toArray();

    return new NextResponse(JSON.stringify(comments), { status: 200 });
  } catch (err) {
    console.error("Error fetching comments:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// CREATE A COMMENT
export const POST = async (req) => {
  const session = await getAuthSession();

  if (!session) {
    return new NextResponse(
      JSON.stringify({ message: "Not Authenticated!" }),
      { status: 401 }
    );
  }

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db();

    const newComment = {
      ...body,
      userEmail: session.user.email,
      createdAt: new Date(),
    };

    await db.collection("comments").insertOne(newComment);

    return new NextResponse(JSON.stringify(newComment), { status: 200 });
  } catch (err) {
    console.error("Error creating comment:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// app/api/posts/[slug]/route.js

import clientPromise from "@/utils/mongoConnect";
import { NextResponse } from "next/server";

// GET: Increment views and return post
export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const client = await clientPromise;
    const db = client.db();

    const post = await db.collection("posts").findOneAndUpdate(
      { slug },
      { $inc: { views: 1 } },
      { returnDocument: "after" }
    );

    if (!post.value) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(post.value), { status: 200 });
  } catch (err) {
    console.error("Error incrementing views:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// POST: Increment likes
export const POST = async (req, { params }) => {
  const { slug } = params;

  try {
    const client = await clientPromise;
    const db = client.db();

    const updatedPost = await db.collection("posts").findOneAndUpdate(
      { slug },
      { $inc: { likes: 1 } },
      { returnDocument: "after" }
    );

    if (!updatedPost.value) {
      return new NextResponse(
        JSON.stringify({ message: "Post not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(JSON.stringify(updatedPost.value), { status: 200 });
  } catch (err) {
    console.error("Error incrementing likes:", err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

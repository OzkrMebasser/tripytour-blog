// import prisma from "@/utils/connect";
// import { NextResponse } from "next/server";
// // import { getAuthSession } from "@/utils/auth";




// // GET SINGLE POST
// export const GET = async (req, { params }) => {
//   const { slug } = params;

//   try {
//     const post = await prisma.post.update({
//       where: { slug },
//       data: { views: { increment: 1 } },
//       include: { user: true },
//     });

//     return new NextResponse(JSON.stringify(post, { status: 200 }));
//   } catch (err) {
//     console.log(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };


// // ADD LIKES ON CLICK

// // HANDLE LIKE
// export const handleLike = async (req, { params }) => {
//   const { slug } = params;
//   // const session = await getAuthSession();

//   // if (!session) {
//   //   return new NextResponse(
//   //     JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
//   //   );
//   // }

//   try {
//     const updatedPost = await prisma.post.update({
//       where: { slug },
//       data: { likes: { increment: 1 } },
//     });

//     return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
//   } catch (err) {
//     console.error(err);
//     return new NextResponse(
//       JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
//     );
//   }
// };
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    if (req.method === 'GET') {
      // Increment views on GET request
      const post = await prisma.post.update({
        where: { slug },
        data: { views: { increment: 1 } },
        include: { user: true },
      });

      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } else if (req.method === 'POST') {
      // Increment likes on POST request
      const updatedPost = await prisma.post.update({
        where: { slug },
        data: { likes: { increment: 1 } },
      });

      return new NextResponse(JSON.stringify(updatedPost, { status: 200 }));
    } else {
      // Unsupported HTTP method
      return new NextResponse(
        JSON.stringify({ message: "Method not allowed" }, { status: 405 })
      );
    }
  } catch (err) {
    console.error(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
    );
  }
};

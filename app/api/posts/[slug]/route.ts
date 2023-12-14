import { db } from "@/lib/server/db";

// GET SINGLE POST
export const GET = async (
  request: Request,
  { params }: { params: { slug: string } }
): Promise<Response> => {
  const slug = params?.slug ?? null;

  // Check if slug is not null or undefined
  if (!slug) {
    return new Response(JSON.stringify({ message: "Slug is required" }), {
      status: 400,
    });
  }

  try {
    // Check if the post exists
    const existingPost = await db.post.findUnique({ where: { slug } });
    if (!existingPost) {
      return new Response(JSON.stringify({ message: "Post not found" }), {
        status: 404,
      });
    }

    // Update the post
    const post = await db.post.update({
      where: { slug },
      data: { views: { increment: 1 } },
      include: {
        user: true,
        comments: {
          include: {
            user: true,
          },
        },
      },
    });

    return new Response(JSON.stringify(post));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

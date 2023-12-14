import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/lib/server/auth";
import { db } from "@/lib/server/db";
import { Comment } from "@prisma/client";

// GET ALL COMMENTS OF A POST
export const GET = async (request: Request): Promise<Response> => {
  if (!request.url) {
    return new NextResponse(JSON.stringify({ message: "Bad request" }), {
      status: 400,
    });
  }

  const { searchParams } = new URL(request.url);

  const postSlug = searchParams.get("postSlug");

  try {
    const comments = await db.comment.findMany({
      where: {
        ...(postSlug && { postSlug }),
      },
      include: { user: true },
    });

    return Response.json(comments);
  } catch (err: unknown) {
    console.error(err);
    return Response.json({ message: "Something went wrong!" }, { status: 500 });
  }
};

// CREATE A COMMENT
export const POST = async (req: Request): Promise<Response> => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return Response.json({ message: "Not Authenticated!" }, { status: 401 });
  }

  try {
    const body: Comment = await req.json();

    const comment = await db.comment.create({
      data: {
        ...body,
        userEmail: session.user.email!,
      },
    });

    return new Response(JSON.stringify(comment), {
      status: 200,
    });
  } catch (err: unknown) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

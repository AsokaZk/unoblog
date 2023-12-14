import { db } from "@/lib/server/db";
import { getServerAuthSession } from "@/lib/server/auth";
import { PaginatedPostsResponse } from "@/lib/definitions";
import { Post } from "@prisma/client";

// GET POSTS
export const GET = async (request: Request): Promise<Response> => {
  const { searchParams } = new URL(request.url);
  const cat = searchParams.get("cat");
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const limit = parseInt(searchParams.get("limit") ?? "4", 10);
  const offset = (page - 1) * limit;

  const query = {
    take: limit,
    skip: offset,
    where: {
      ...(cat && { catSlug: cat }),
    },
  };

  try {
    const [posts, count] = await db.$transaction([
      db.post.findMany({
        ...query,
        include: {
          user: true,
          cat: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
      db.post.count({ where: query.where }),
    ]);
    ``;
    const totalPages = Math.ceil(count / limit);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;

    const response: PaginatedPostsResponse = {
      posts,
      pagination: {
        totalPages,
        currentPage: page,
        offset,
        limit,
        hasPrev,
        hasNext,
      },
    };

    return new Response(JSON.stringify(response), { status: 200 });
  } catch (err: unknown) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

// CREATE A POST
export const POST = async (req: Request): Promise<Response> => {
  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  try {
    const body = await req.json();

    const post = await db.post.create({
      data: {
        ...body,
        userEmail: session.user.email!,
      },
    });

    return new Response(JSON.stringify(post));
  } catch (err: unknown) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

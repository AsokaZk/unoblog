import { db } from "@/lib/server/db";

export const GET = async () => {
  try {
    const categories = await db.category.findMany({
      skip: 0,
      // take: 10, // uncomment this line to limit the number of categories returned
    });

    return new Response(JSON.stringify(categories));
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Something went wrong!" }), {
      status: 500,
    });
  }
};

import cloudinary from "@/lib/server/cloudinary";
import { getServerAuthSession } from "@/lib/server/auth";

export const POST = async (req: Request): Promise<Response> => {
  const data = await req.formData();
  const file = data.get("file") as File;

  const session = await getServerAuthSession();

  if (!session || !session.user) {
    return new Response(JSON.stringify({ message: "Not Authenticated!" }), {
      status: 401,
    });
  }

  if (!file) {
    return new Response(JSON.stringify({ message: "No file found!" }), {
      status: 400,
    });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const response = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({}, (error, result) => {
        if (error) reject(error);
        resolve(result);
      })
      .end(buffer);
  });

  return new Response(
    JSON.stringify({
      url: (response as { secure_url: string }).secure_url,
      message: "File uploaded!",
    }),
    {
      status: 200,
    }
  );
};

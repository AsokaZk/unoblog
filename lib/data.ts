import { Category, Post, User } from "@prisma/client";
import { PaginatedPostsResponse } from "./definitions";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const response = await fetch("http://localhost:3000/api/categories", {
      method: "GET",
      cache: "no-cache",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const responseData = await response.json();

    return responseData;
  } catch (err) {
    throw new Error("Failed to upload");
  }
};

export interface ExtendedPost extends Post {
  user: User;
}

export const getSinglePost = async (
  slug: string
): Promise<ExtendedPost | null> => {
  try {
    const response = await fetch(`http://localhost:3000/api/posts/${slug}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const responseData = await response.json();

    return responseData;
  } catch (error) {
    throw new Error("Failed to fetch");
  }
};

export const getPosts = async ({
  cat,
  page,
  limit = 4,
}: {
  cat?: string;
  page: number;
  limit: number;
}): Promise<PaginatedPostsResponse> => {
  try {
    const url = `http://localhost:3000/api/posts?page=${page}&limit=${limit}${
      cat ? `&cat=${cat}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch");
  }
};

export const uploadToCloudinary = async (
  file: string | Blob
): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`http://localhost:3000/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.url;
  } catch (error) {
    throw new Error("Failed to upload");
  }
};

import { Post as PostC } from "@prisma/client";

export type Theme = "light" | "dark";

export type Post = PostC;

export type PaginatedPostsResponse = {
  posts: Post[];
  pagination: {
    totalPages: number;
    currentPage: number;
    offset: number;
    limit: number;
    hasPrev: boolean;
    hasNext: boolean;
  };
};

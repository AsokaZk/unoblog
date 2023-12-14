import { Post as PostPrisma, Comment as CommentPrisma, User as UserPrisma } from "@prisma/client";

export type Theme = "light" | "dark";

export type Post = PostPrisma;

export type Comment = PostPrisma;

export type User = UserPrisma;

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

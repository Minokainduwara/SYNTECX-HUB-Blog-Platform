import type { Post } from "../types";

export function getAuthorName(post: Post): string {
  const a = post.author;
  if (!a) return "Unknown";
  if (typeof a === "string") return "Author";
  return a.name ?? "Author";
}

export function getAuthorId(post: Post): string | undefined {
  const a = post.author;
  if (!a) return undefined;
  if (typeof a === "string") return a;
  return a._id;
}

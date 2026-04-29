import type { Post } from "../types";
import API from "./axios";

export async function fetchPosts(): Promise<Post[]> {
  const { data } = await API.get<Post[]>("/posts");
  return data;
}

export async function fetchPostById(id: string): Promise<Post> {
  const { data } = await API.get<Post>(`/posts/${id}`);
  return data;
}

export async function createPost(body: {
  title: string;
  content: string;
  image?: string;
}): Promise<Post> {
  const { data } = await API.post<Post>("/posts", body);
  return data;
}

export async function updatePost(
  id: string,
  body: { title: string; content: string; image?: string }
): Promise<Post> {
  const { data } = await API.put<Post>(`/posts/${id}`, body);
  return data;
}

export async function deletePost(id: string): Promise<void> {
  await API.delete(`/posts/${id}`);
}

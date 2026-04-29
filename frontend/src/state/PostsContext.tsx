import { createContext } from "preact";
import { useContext, useEffect, useState, useCallback } from "preact/hooks";
import type { ComponentChildren } from "preact";
import * as postsApi from "../api/postsApi";
import type { Post } from "../types";

type PostsContextValue = {
  posts: Post[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const PostsContext = createContext<PostsContextValue | null>(null);

export function PostsProvider({ children }: { children: ComponentChildren }) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const data = await postsApi.fetchPosts();
      setPosts(data);
    } catch {
      setError("Could not load posts. Check VITE_API_URL and that the API is running.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  return (
    <PostsContext.Provider value={{ posts, loading, error, refresh }}>
      {children}
    </PostsContext.Provider>
  );
}

export function usePosts(): PostsContextValue {
  const ctx = useContext(PostsContext);
  if (!ctx) throw new Error("usePosts must be used within PostsProvider");
  return ctx;
}

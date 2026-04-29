import { useEffect, useState } from "preact/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as postsApi from "../api/postsApi";
import { useAuth } from "../state/AuthContext";
import { usePosts } from "../state/PostsContext";
import type { Post } from "../types";
import { getApiErrorMessage } from "../utils/apiError";
import { getAuthorId, getAuthorName } from "../utils/post";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await postsApi.fetchPostById(id);
        if (!cancelled) setPost(data);
      } catch (e) {
        if (!cancelled)
          setError(getApiErrorMessage(e, "Could not load this post."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const authorId = post ? getAuthorId(post) : undefined;
  const canEdit =
    user && authorId && user._id === authorId;

  const handleDelete = async () => {
    if (!id || !post || !window.confirm("Delete this post permanently?")) return;
    setDeleting(true);
    try {
      await postsApi.deletePost(id);
      await refresh();
      navigate("/feed", { replace: true });
    } catch (e) {
      setError(getApiErrorMessage(e, "Delete failed."));
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div class="panel">
        <p class="muted">Loading…</p>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div class="panel panel-error">
        <p>{error ?? "Post not found."}</p>
        <Link to="/feed">Back to feed</Link>
      </div>
    );
  }

  return (
    <article class="panel post-article">
      <Link to="/feed" class="back-link">
        ← Feed
      </Link>
      <header class="post-header">
        <h1>{post.title}</h1>
        <p class="muted">{getAuthorName(post)}</p>
        {canEdit ? (
          <div class="post-actions">
            <Link to={`/posts/${post._id}/edit`} class="btn">
              Edit
            </Link>
            <button
              type="button"
              class="btn btn-danger"
              disabled={deleting}
              onClick={() => void handleDelete()}
            >
              {deleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        ) : null}
      </header>
      {post.image ? (
        <img src={post.image} alt="" class="post-hero-img" />
      ) : null}
      <div class="post-content">{post.content}</div>
    </article>
  );
}

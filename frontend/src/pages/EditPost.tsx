import { useEffect, useState } from "preact/hooks";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as postsApi from "../api/postsApi";
import * as uploadApi from "../api/uploadApi";
import { useAuth } from "../state/AuthContext";
import { usePosts } from "../state/PostsContext";
import type { Post } from "../types";
import { getApiErrorMessage } from "../utils/apiError";
import { getAuthorId } from "../utils/post";

export function EditPost() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { refresh } = usePosts();
  const [post, setPost] = useState<Post | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await postsApi.fetchPostById(id);
        if (cancelled) return;
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image);
      } catch (e) {
        if (!cancelled)
          setError(getApiErrorMessage(e, "Could not load post."));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  const authorId = post ? getAuthorId(post) : undefined;
  const canSave = Boolean(user && authorId && user._id === authorId);

  const onFile = async (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    setError(null);
    setUploading(true);
    try {
      const url = await uploadApi.uploadImage(file);
      setImageUrl(url);
    } catch (err) {
      setError(getApiErrorMessage(err, "Image upload failed."));
    } finally {
      setUploading(false);
      input.value = "";
    }
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (!id || !canSave) return;
    setError(null);
    setSubmitting(true);
    try {
      await postsApi.updatePost(id, {
        title: title.trim(),
        content,
        image: imageUrl
      });
      await refresh();
      navigate(`/posts/${id}`, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not save changes."));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div class="panel">
        <p class="muted">Loading…</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div class="panel panel-error">
        <p>{error ?? "Post not found."}</p>
        <Link to="/">Back</Link>
      </div>
    );
  }

  if (!canSave) {
    return (
      <div class="panel panel-error">
        <p>
          {!user
            ? "Log in to edit this post."
            : "You can only edit your own posts."}
        </p>
        <Link to={user ? `/posts/${post._id}` : "/login"}>
          {user ? "View post" : "Log in"}
        </Link>
      </div>
    );
  }

  return (
    <div class="panel editor-panel">
      <Link to={`/posts/${post._id}`} class="back-link">
        ← Back to post
      </Link>
      <h1>Edit post</h1>
      <form onSubmit={(e) => void handleSubmit(e)} class="stack-form">
        <label>
          Title
          <input
            type="text"
            required
            value={title}
            onInput={(e) => setTitle((e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          Content
          <textarea
            required
            rows={12}
            value={content}
            onInput={(e) =>
              setContent((e.target as HTMLTextAreaElement).value)
            }
          />
        </label>
        <label class="file-label">
          Cover image
          <input
            type="file"
            accept="image/*"
            disabled={uploading}
            onChange={(e) => void onFile(e)}
          />
        </label>
        {uploading ? <p class="muted small">Uploading…</p> : null}
        {imageUrl ? (
          <div class="preview-row">
            <img src={imageUrl} alt="" class="thumb-preview" />
            <button
              type="button"
              class="btn-ghost"
              onClick={() => setImageUrl(undefined)}
            >
              Remove image
            </button>
          </div>
        ) : null}
        {error ? <p class="form-error">{error}</p> : null}
        <button type="submit" class="btn" disabled={submitting}>
          {submitting ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}

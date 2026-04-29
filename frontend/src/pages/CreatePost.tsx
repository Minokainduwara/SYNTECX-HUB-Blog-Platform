import { useState } from "preact/hooks";
import { useNavigate } from "react-router-dom";
import * as postsApi from "../api/postsApi";
import * as uploadApi from "../api/uploadApi";
import { usePosts } from "../state/PostsContext";
import { getApiErrorMessage } from "../utils/apiError";

export function CreatePost() {
  const navigate = useNavigate();
  const { refresh } = usePosts();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);
    setSubmitting(true);
    try {
      const post = await postsApi.createPost({
        title: title.trim(),
        content,
        image: imageUrl
      });
      await refresh();
      navigate(`/posts/${post._id}`, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not create post."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="panel editor-panel">
      <h1>New post</h1>
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
          {submitting ? "Publishing…" : "Publish"}
        </button>
      </form>
    </div>
  );
}

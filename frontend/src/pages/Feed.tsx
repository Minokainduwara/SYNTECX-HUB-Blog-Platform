import { Link } from "react-router-dom";
import { usePosts } from "../state/PostsContext";
import { getAuthorName } from "../utils/post";

export function Feed() {
  const { posts, loading, error } = usePosts();

  if (loading) {
    return (
      <div class="panel">
        <p class="muted">Loading posts…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div class="panel panel-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div class="feed">
      <div class="panel hero-panel">
        <h1>Stories in orbit</h1>
        <p class="muted">
          Browse posts below — the 3D scene mirrors the same feed from your API.
        </p>
      </div>
      {posts.length === 0 ? (
        <div class="panel">
          <p>No posts yet. Sign in and create one.</p>
        </div>
      ) : (
        <ul class="post-grid">
          {posts.map((p) => (
            <li key={p._id}>
              <Link to={`/posts/${p._id}`} class="post-card">
                {p.image ? (
                  <img src={p.image} alt="" class="post-card-thumb" />
                ) : (
                  <div class="post-card-thumb placeholder-thumb" />
                )}
                <div class="post-card-body">
                  <h2>{p.title}</h2>
                  <p class="muted small">{getAuthorName(p)}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { Link } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { usePosts } from "../state/PostsContext";

export function Landing() {
  const { user } = useAuth();
  const { posts, loading } = usePosts();

  const latest = posts.slice(0, 3);

  return (
    <div class="landing">
      <div class="panel landing-hero">
        <p class="landing-kicker">A cinematic way to read & create</p>
        <h1 class="landing-title">Aurion Blog</h1>
        <p class="landing-subtitle muted">
          A 3D orbit of stories powered by your existing API.
        </p>

        <div class="landing-cta">
          <Link to="/feed" class="btn landing-primary">
            Explore feed
          </Link>
          {user ? (
            <Link to="/posts/new" class="btn btn-ghost landing-secondary">
              Create post
            </Link>
          ) : (
            <Link to="/login" class="btn btn-ghost landing-secondary">
              Log in
            </Link>
          )}
        </div>

        <div class="landing-stats">
          <div class="stat">
            <div class="stat-value">
              {loading ? "…" : posts.length.toString()}
            </div>
            <div class="stat-label">posts</div>
          </div>
          <div class="stat">
            <div class="stat-value">
              {loading ? "…" : Math.min(3, posts.length).toString()}
            </div>
            <div class="stat-label">latest</div>
          </div>
          <div class="stat">
            <div class="stat-value">3D</div>
            <div class="stat-label">scene</div>
          </div>
        </div>
      </div>

      {latest.length > 0 ? (
        <div class="panel landing-preview">
          <h2 class="landing-preview-title">Latest stories</h2>
          <ul class="landing-mini-grid">
            {latest.map((p) => (
              <li key={p._id}>
                <Link to={`/posts/${p._id}`} class="landing-mini-card">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt=""
                      class="landing-mini-thumb"
                    />
                  ) : (
                    <div class="landing-mini-thumb landing-mini-placeholder" />
                  )}
                  <div class="landing-mini-body">
                    <div class="landing-mini-title">{p.title}</div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div class="panel landing-preview">
          <h2 class="landing-preview-title">No posts yet</h2>
          <p class="muted">
            When your first post is published, it will appear in the 3D scene.
          </p>
          {user ? (
            <Link to="/posts/new" class="btn landing-primary">
              Create the first post
            </Link>
          ) : (
            <Link to="/register" class="btn landing-primary">
              Register to start
            </Link>
          )}
        </div>
      )}
    </div>
  );
}


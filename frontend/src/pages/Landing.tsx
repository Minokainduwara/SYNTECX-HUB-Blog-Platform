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
        <div class="landing-phoenix" aria-hidden="true">
          <svg
            viewBox="0 0 800 800"
            class="landing-phoenix-svg"
            role="presentation"
          >
            <defs>
              <linearGradient id="phoenixWingGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fff2d8" />
                <stop offset="35%" stop-color="#ffb45f" />
                <stop offset="70%" stop-color="#ff5c29" />
                <stop offset="100%" stop-color="#7a120a" />
              </linearGradient>
            </defs>
            <path
              fill="url(#phoenixWingGlow)"
              d="M401 138c34 57 56 115 54 178 44-56 109-87 176-99-35 42-60 88-70 142 34-20 79-33 126-27-49 25-85 62-107 112 29 0 58 10 85 28-70 2-118 43-165 81-33 27-68 55-114 67 21-34 30-71 28-113-31 26-61 55-104 71 17-39 19-78 6-119-42 38-92 61-153 67 33-31 52-67 57-110-34 12-67 16-101 11 51-24 86-61 101-111-34 2-63-5-92-21 45-8 80-27 108-56 18-18 33-39 49-58 24-29 51-56 90-73-12 36-13 70-4 103 36-28 52-72 70-115z"
            />
            <path
              fill="rgba(255,236,204,0.88)"
              d="M401 272c19 28 26 57 21 89 24-23 46-48 57-82 12 32 13 66 0 101-14 39-42 68-78 88-34-16-60-42-76-78-15-35-18-71-8-107 15 35 34 63 60 83-5-30 0-61 24-94z"
            />
            <path
              fill="rgba(255,117,48,0.92)"
              d="M401 418c26 39 56 70 104 91-33 8-63 24-90 47 8-35 2-69-14-102zm-3 0c-16 33-22 67-14 102-27-23-57-39-90-47 48-21 78-52 104-91z"
            />
            <path
              fill="rgba(255,196,120,0.9)"
              d="M399 520c23 37 37 76 39 122-26-27-41-58-39-96-2 38-13 69-38 96 1-46 14-85 38-122z"
            />
          </svg>
        </div>
        <p class="landing-kicker">Rise. Write. Reignite.</p>
        <h1 class="landing-title">Phoenix Blog</h1>
        <p class="landing-subtitle muted">
          A fiery, cinematic storytelling space where every post rises through a
          glowing phoenix-inspired world powered by your existing backend.
        </p>
        <p class="landing-body-copy">
          Explore immersive stories, publish new ideas, and let your content
          move through layers of embers, light, and motion. Phoenix Blog turns
          a standard feed into a memorable experience.
        </p>

        <div class="landing-cta">
          <Link to="/feed" class="btn landing-primary">
            Enter the fire feed
          </Link>
          {user ? (
            <Link to="/posts/new" class="btn btn-ghost landing-secondary">
              Publish a new flame
            </Link>
          ) : (
            <Link to="/login" class="btn btn-ghost landing-secondary">
              Sign in to write
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
            <div class="stat-label">experience</div>
          </div>
        </div>
      </div>

      {latest.length > 0 ? (
        <div class="panel landing-preview">
          <h2 class="landing-preview-title">Fresh from the nest</h2>
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
          <h2 class="landing-preview-title">Your first story can spark the sky</h2>
          <p class="muted">
            Publish the first post and watch it join the phoenix fire animation
            in the 3D scene.
          </p>
          {user ? (
            <Link to="/posts/new" class="btn landing-primary">
              Ignite the first post
            </Link>
          ) : (
            <Link to="/register" class="btn landing-primary">
              Register and begin
            </Link>
          )}
        </div>
      )}
    </div>
  );
}


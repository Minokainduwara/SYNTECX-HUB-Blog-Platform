import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../state/AuthContext";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header class="site-header">
      <Link to="/" class="brand">
        Phoenix Blog
      </Link>
      <nav class="nav-links">
        <NavLink
          to="/feed"
          end
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Feed
        </NavLink>
        {user ? (
          <>
            <NavLink
              to="/posts/new"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              New post
            </NavLink>
            <span class="user-pill">{user.name}</span>
            <button type="button" class="btn-ghost" onClick={() => logout()}>
              Log out
            </button>
          </>
        ) : (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Log in
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Register
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

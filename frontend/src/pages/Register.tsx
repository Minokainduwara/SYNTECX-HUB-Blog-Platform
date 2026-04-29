import { useEffect, useState } from "preact/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../state/AuthContext";
import { getApiErrorMessage } from "../utils/apiError";

export function Register() {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate("/", { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(name.trim(), email.trim(), password);
      navigate("/", { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err, "Registration failed."));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div class="panel auth-panel">
      <h1>Create account</h1>
      <form onSubmit={(e) => void handleSubmit(e)} class="stack-form">
        <label>
          Name
          <input
            type="text"
            autoComplete="name"
            required
            value={name}
            onInput={(e) => setName((e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onInput={(e) => setEmail((e.target as HTMLInputElement).value)}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onInput={(e) => setPassword((e.target as HTMLInputElement).value)}
          />
        </label>
        {error ? <p class="form-error">{error}</p> : null}
        <button type="submit" class="btn" disabled={submitting}>
          {submitting ? "Creating…" : "Register"}
        </button>
      </form>
      <p class="muted small">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </div>
  );
}

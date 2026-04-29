import { render } from "preact";
import { BrowserRouter } from "react-router-dom";
import { App } from "./app.tsx";
import { AuthProvider } from "./state/AuthContext.tsx";
import { PostsProvider } from "./state/PostsContext.tsx";
import "./index.css";

render(
  <BrowserRouter>
    <AuthProvider>
      <PostsProvider>
        <App />
      </PostsProvider>
    </AuthProvider>
  </BrowserRouter>,
  document.getElementById("app")!
);

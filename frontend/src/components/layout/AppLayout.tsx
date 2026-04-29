import { Outlet } from "react-router-dom";
import { FireOverlay } from "../effects/FireOverlay";
import { PostsScene } from "../three/PostsScene";
import { usePosts } from "../../state/PostsContext";
import { Header } from "./Header";

export function AppLayout() {
  const { posts } = usePosts();

  return (
    <div class="app-shell">
      <div class="scene-layer">
        <PostsScene posts={posts} />
        <FireOverlay />
      </div>
      <div class="ui-layer">
        <Header />
        <main class="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

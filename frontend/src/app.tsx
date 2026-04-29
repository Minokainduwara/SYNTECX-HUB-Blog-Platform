import { Route, Routes } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { CreatePost } from "./pages/CreatePost";
import { EditPost } from "./pages/EditPost";
import { Feed } from "./pages/Feed";
import { Landing } from "./pages/Landing";
import { Login } from "./pages/Login";
import { PostDetail } from "./pages/PostDetail";
import { Register } from "./pages/Register";
import "./app.css";

export function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/posts/new"
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/:id/edit"
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  );
}

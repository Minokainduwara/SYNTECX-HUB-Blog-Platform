# 🔥 Phoenix Blog

> **A cinematic, phoenix-inspired blog platform** — 3D post scenes, ember particle effects, full auth, and image uploads, all wired to a production-ready Express + MongoDB backend.

---

![Status](https://img.shields.io/badge/status-active-success?style=flat-square&color=e25822)
![Frontend](https://img.shields.io/badge/frontend-Preact%20%2B%20Vite-blueviolet?style=flat-square)
![Backend](https://img.shields.io/badge/backend-Express%20%2B%20MongoDB-green?style=flat-square)
![3D](https://img.shields.io/badge/3D-Three.js-orange?style=flat-square)
![Auth](https://img.shields.io/badge/auth-JWT-yellow?style=flat-square)
![Media](https://img.shields.io/badge/media-Cloudinary-blue?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-lightgrey?style=flat-square)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🎬 **Cinematic Landing** | Dramatic, phoenix-branded landing page with warm red/orange UI |
| 🌐 **3D Post Scene** | Three.js orbit scene rendering posts as interactive 3D cards |
| 🔥 **Ember Particles** | Animated fire and ember overlay layered over the entire scene |
| 📝 **Full Post CRUD** | Create, read, update, and delete posts via the backend API |
| 🔐 **Auth Flow** | Register and login with JWT-secured endpoints |
| 🖼️ **Image Uploads** | Cloudinary-backed image upload through the backend |
| 📰 **Feed & Detail Views** | Browse posts in a feed layout and open individual post pages |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| 🖥️ Frontend | Preact + Vite |
| 🌐 3D Engine | Three.js |
| ⚙️ Backend | Express.js |
| 🗄️ Database | MongoDB |
| 🔑 Auth | JSON Web Tokens (JWT) |
| 📸 Media | Cloudinary |

---

## 📁 Project Structure

```
phoenix-blog/
├── 📂 backend/       # Express + MongoDB REST API
└── 📂 frontend/      # Preact + Vite SPA
```

---

## 🚀 Getting Started

### ✅ Prerequisites

- Node.js **v18+**
- A running **MongoDB** instance
- A **Cloudinary** account (for image uploads)

---

### ⚙️ 1. Configure Environment Variables

**🖥️ Backend** — create `backend/.env`:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**🌐 Frontend** — create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000
```

---

### 🗄️ 2. Start the Backend

```bash
cd backend
npm install
npm run dev
```

> 🟢 API runs at `http://localhost:5000`

---

### 🎨 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

> 🟢 App runs at `http://localhost:5173` by default

---

## 📦 Build for Production

```bash
cd frontend
npm run build
```

> Output is written to `frontend/dist/`

---

## 🔌 API Reference

| Method | Endpoint | Description | 🔒 Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | No |
| `POST` | `/api/auth/login` | Log in and receive a JWT | No |
| `GET` | `/api/posts` | Fetch all posts | No |
| `GET` | `/api/posts/:id` | Fetch a single post | No |
| `POST` | `/api/posts` | Create a new post | ✅ Required |
| `PUT` | `/api/posts/:id` | Update an existing post | ✅ Required |
| `DELETE` | `/api/posts/:id` | Delete a post | ✅ Required |
| `POST` | `/api/upload` | Upload an image (`image` field) | ✅ Required |

> 🔑 Protected routes require a valid JWT passed in the `Authorization: Bearer <token>` header.

---

## 📝 Notes

- 💾 The logged-in user is persisted in `localStorage` under the key `user`.
- 🖼️ The upload endpoint expects a multipart form field named `image`.
- 🌐 If an uploaded image can't load in the 3D scene due to CORS, post cards fall back gracefully to a warm material color.

---

## 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
  🔥 Built with fire. Rise from the ashes. <strong>Phoenix Blog</strong> 🔥
</p>
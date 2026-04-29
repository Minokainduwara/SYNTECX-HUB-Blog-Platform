## Phoenix Blog

Phoenix Blog is a fiery 3D blog frontend built on top of the existing Express backend in this repository.

It combines:
- a cinematic landing page
- a warm red/orange phoenix-inspired UI
- animated ember and fire overlay effects
- a 3D post scene driven by backend post data
- auth, image upload, and post CRUD wired to the backend API

## Project structure

- `backend/` - Express + MongoDB API
- `frontend/` - Preact + Vite frontend

## Backend API

The frontend is designed to work with these backend routes:

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/posts`
- `GET /api/posts/:id`
- `POST /api/posts`
- `PUT /api/posts/:id`
- `DELETE /api/posts/:id`
- `POST /api/upload`

## Frontend features

- Landing page branded as `Phoenix Blog`
- 3D orbit scene for posts using `three`
- Ember/fire particle animation layered over the scene
- Feed view for browsing posts
- Post detail page
- Register/login flow
- Create, edit, and delete posts
- Image upload through the backend upload endpoint

## Environment setup

Create `frontend/.env` with:

```env
VITE_API_URL=http://localhost:5000
```

The backend should provide its own environment variables for MongoDB, JWT, and Cloudinary.

## Run locally

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Build frontend

```bash
cd frontend
npm run build
```

## Notes

- The frontend stores the logged-in user in `localStorage` under `user`.
- The upload endpoint expects a multipart field named `image`.
- If an uploaded image cannot be loaded into the 3D scene because of CORS, the post card falls back to a warm material color.

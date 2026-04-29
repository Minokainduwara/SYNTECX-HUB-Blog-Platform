import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((req) => {
  const user = localStorage.getItem("user");

  if (user) {
    const parsedUser = JSON.parse(user);

    req.headers.Authorization = `Bearer ${parsedUser.token}`;
  }

  return req;
});

export default API;
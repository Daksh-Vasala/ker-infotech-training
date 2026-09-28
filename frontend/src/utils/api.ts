import axios from "axios";

const token = localStorage.getItem("token");

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

if (token && token !== undefined && token !== null && token !== "") {
  headers["Authorization"] = `Bearer ${token}`;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers,
});

export default api;

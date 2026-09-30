import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  } else {
    config.headers.delete("Authorization");
  }

  return config;
});

api.interceptors.response.use((response) => response, (error) => {
  if(axios.isAxiosError(error) && error.response?.status === 401 ){
    localStorage.removeItem("token");
  }

  if(window.location.pathname !== "/sign-in"){
    window.location.replace("/sign-in");
  }

  return Promise.reject(error)
})

export default api;

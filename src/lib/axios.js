import axios from "axios";
import i18n from "../i18n";
import { toast } from "sonner";

const API_URL = "https://bynona.store/api/v1";

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    config.headers["Accept-Language"] = i18n.language || "ar";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Don't retry/redirect if the failed request was a login attempt
      if (originalRequest.url.includes("/login")) {
        return Promise.reject(error);
      }

      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axios.post(`${API_URL}/refresh`, {
            refresh_token: refreshToken,
          });

          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
            axiosInstance.defaults.headers.common["Authorization"] =
              `Bearer ${response.data.token}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          localStorage.removeItem("token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("user");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post("/login", { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message);
      throw new Error(message);
    } else if (error.request) {
      toast.error("No response from server");
      throw new Error("No response from server");
    } else {
      toast.error("Error setting up request");
      throw new Error("Error setting up request");
    }
  }
};

export const logoutUser = async () => {
  try {
    await axiosInstance.post("/logout");
  } catch (error) {
    console.error("Logout API failed", error);
  } finally {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  }
};

export default axiosInstance;

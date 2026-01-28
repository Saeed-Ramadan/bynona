import axios from "axios";
import i18n from "../i18n";
import { toast } from "./toast";

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
    const { priceMode } = JSON.parse(
      localStorage.getItem("price-mode-storage") ||
        '{"state":{"priceMode":"retail"}}',
    ).state;

    config.headers["Accept-Language"] = i18n.language || "ar";
    config.headers["Price-Mode"] = priceMode || "retail";

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

export const registerUser = async (data) => {
  try {
    const response = await axiosInstance.post("/register", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Something went wrong";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export const verifyOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/verify-otp", { email, otp });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Invalid OTP";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export const resendOtp = async (email) => {
  try {
    const response = await axiosInstance.post("/resend-otp", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Failed to resend OTP";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export const sendResetEmail = async (email) => {
  try {
    const response = await axiosInstance.post("/sendEmail", { email });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Failed to send email";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export const verifyResetOtp = async (email, otp) => {
  try {
    const response = await axiosInstance.post("/sendCode", { email, otp });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Invalid Code";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.post("/password", data);
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Failed to reset password";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export const resendResetOtp = async (email) => {
  try {
    const response = await axiosInstance.post("/forgotPassword/resend-otp", {
      email,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      const message = error.response.data.message || "Failed to resend code";
      toast.error(message);
      throw new Error(message);
    } else {
      toast.error("Network error");
      throw new Error("Network error");
    }
  }
};

export default axiosInstance;

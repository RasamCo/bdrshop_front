import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "https://localhost:7005/api/",
  withCredentials: false,
  validateStatus: (status) => status >= 200 && status < 300, // فقط 2xx موفق
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const problemDetails = error.response?.data;

    if (problemDetails) {
      const errors = problemDetails.errors;

      if (errors && typeof errors === "object") {
        // مطمئن می‌شویم errors واقعاً object است
        Object.entries(errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => {
              toast.error(`${field}: ${msg}`);
            });
          } else if (typeof messages === "string") {
            toast.error(`${field}: ${messages}`);
          }
        });
      } else {
        // اگر errors موجود نبود، از title یا detail استفاده کن
        const message = problemDetails.detail || problemDetails.title || "خطای ناشناخته در ایجاد دسته‌بندی";
        toast.error(message);
      }
    } else {
      // اگر هیچ response ای نبود (خطای شبکه یا سرور)
      toast.error(error.message || "خطای ناشناخته در ایجاد دسته‌بندی");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

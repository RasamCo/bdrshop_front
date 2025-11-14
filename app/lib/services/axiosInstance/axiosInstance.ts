import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  // baseURL: "https://localhost:7005/api/",
   baseURL: "http://localhost:5296/api/",
  withCredentials: false, // اگر نیازی به ارسال کوکی‌ها نداری، false بمونه
  validateStatus: (status) => status >= 200 && status < 300, // فقط پاسخ‌های 2xx موفق هستن
});

// 🎯 مدیریت پاسخ‌ها و خطاها
axiosInstance.interceptors.response.use(
  
  (response) => response, // اگر پاسخ موفق بود، همون رو برگردون

  (error) => {
   
    //اگر خطا داشتیم
    const status = error.response?.status;
    const problemDetails = error.response?.data;
    console.log(status)
    console.log(problemDetails)

    // 📡 اگر پاسخ از سرور نداشتیم (مثلاً اینترنت قطع شده)
    if (!status) {
      toast.error(
        "📡 ارتباط با سرور برقرار نیست، لطفاً اتصال اینترنت را بررسی کنید."
      );
      return Promise.reject(error); //من خطارا نشون دادم، ولی خطا رو نگه دار و بده به کسی که این درخواست رو داده تا اون هم بتونه ازش استفاده کنه.
      //بدون این خط خطا “بلعیده” می‌شود و هیچ‌جا متوجهش نمی‌شود
    }

    // 🔑 401 → کاربر وارد نشده
    if (status === 401) {
      toast.error("⛔ ابتدا وارد حساب کاربری شوید.");
      // در صورت نیاز می‌توانی کاربر را به صفحه لاگین هدایت کنی:
      // window.location.href = "/login";
      return Promise.reject(error);
    }

    // 🚫 403 → کاربر مجوز انجام این کار را ندارد
    if (status === 403) {
      toast.error("🚫 شما مجوز انجام این عملیات را ندارید.");
      return Promise.reject(error);
    }

    // ❌ خطاهای اعتبارسنجی (Validation)
    if (status === 400 || status === 422) {
      const errors = problemDetails?.errors;
      if (errors && typeof errors === "object") {
        Object.entries(errors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(` ${msg}`));
          } else if (typeof messages === "string") {
            toast.error(` ${messages}`);
          }
        });
      } else {
        toast.error(problemDetails?.title || "⚠️ خطای اعتبارسنجی");
      }
      return Promise.reject(error);
    }

    // 💀 خطاهای داخلی سرور (مثلاً 500)
    if (status >= 500) {
      toast.error("❌ خطای داخلی سرور. لطفاً بعداً دوباره تلاش کنید.");
      return Promise.reject(error);
    }

    // ⚙️ سایر خطاهای ناشناخته
    const message =
      problemDetails?.detail ||
      problemDetails?.title ||
      error.message ||
      "خطای ناشناخته در انجام درخواست.";
    toast.error(message);

    return Promise.reject(error);
  }
);

export default axiosInstance;

// import axios from "axios";
// import { toast } from "react-toastify";

// const axiosInstance = axios.create({
//   baseURL: "https://localhost:7005/api/",
//   withCredentials: false,
//   validateStatus: (status) => status >= 200 && status < 300, // فقط 2xx موفق
// });

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const problemDetails = error.response?.data;

//     if (problemDetails) {
//       const errors = problemDetails.errors;

//       if (errors && typeof errors === "object") {
//         // مطمئن می‌شویم errors واقعاً object است
//         Object.entries(errors).forEach(([field, messages]) => {
//           if (Array.isArray(messages)) {
//             messages.forEach((msg) => {
//               toast.error(`${field}: ${msg}`);
//             });
//           } else if (typeof messages === "string") {
//             toast.error(`${field}: ${messages}`);
//           }
//         });
//       } else {
//         // اگر errors موجود نبود، از title یا detail استفاده کن
//         const message = problemDetails.detail || problemDetails.title || "خطای ناشناخته در ایجاد دسته‌بندی";
//         toast.error(message);
//       }
//     } else {
//       // اگر هیچ response ای نبود (خطای شبکه یا سرور)
//       toast.error(error.message || "خطای ناشناخته در ایجاد دسته‌بندی");
//     }

//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;

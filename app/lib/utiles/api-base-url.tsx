// ادرس سرور بک اند
const config = {
  development: "http://localhost:2025",
  production: "",
  otherserver: "",
};

export const apiBaseUrl =
  config[process.env.NODE_ENV as keyof typeof config] || config.production;

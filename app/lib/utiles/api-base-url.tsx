// ادرس سرور بک اند
const config = {
  development: "https://localhost:7005/api/",
  production: "",
  otherserver: "",
};

export const apiBaseUrl =
  config[process.env.NODE_ENV as keyof typeof config] || config.production;

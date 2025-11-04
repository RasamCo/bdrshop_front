import axios from "axios";
import { apiBaseUrl } from "../../utiles/api-base-url";

const axiosInstance=axios.create({
    baseURL:apiBaseUrl,
    withCredentials:true
});

export default axiosInstance;
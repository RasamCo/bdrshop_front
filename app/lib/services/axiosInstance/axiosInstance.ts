import axios from "axios";
import { apiBaseUrl } from "../../utiles/api-base-url";

const axiosInstance=axios.create({
    baseURL:"https://localhost:7005/api/",
    // withCredentials:true
});

export default axiosInstance;
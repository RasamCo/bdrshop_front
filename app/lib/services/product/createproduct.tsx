import axiosInstance from "../axiosInstance/axiosInstance";

const CreateProduct = async () => {
  try {
    const response = await axiosInstance.post("", {});

    return response.data;
  } catch {
    console.error("خطایی رخ داده اس!");
  }
};
export default CreateProduct;
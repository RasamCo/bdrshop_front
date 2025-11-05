import { AddCategoryRequest } from "@/app/type/category/categorytype";
import axiosInstance from "../axiosInstance/axiosInstance";

const CreateCategory = async (categoryData:AddCategoryRequest) => {
  try {
    const response = await axiosInstance.post("Category/Add", categoryData);

    return {success: true, data: response.data};
  } catch(error) {
    console.error("خطایی رخ داده اس!",error);
    return { success: false, error: "خطا در ایجاد دسته‌بندی" };
  }
};
export default CreateCategory;
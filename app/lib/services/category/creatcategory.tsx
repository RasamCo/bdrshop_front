

import { ApiResponse } from "@/app/type/apiResponse";
import axiosInstance from "../axiosInstance/axiosInstance";
import { AddCategoryRequest } from "@/app/type/category/categorytype";

const CreateCategory = async (categoryData: AddCategoryRequest) => {
  try {
    // مشخص کردن نوع پاسخ (ApiResponse<Category>)
    const response = await axiosInstance.post<ApiResponse<AddCategoryRequest>>(
      "Category/Add",
      categoryData
    );

    const apiResponse = response.data;

    return {
      success: apiResponse.success,
      message: apiResponse.message,
      category: apiResponse.data.result,
      meta: apiResponse.meta,
    };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ خطا در ایجاد دسته‌بندی:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "خطای ناشناخته در ایجاد دسته‌بندی",
      error: error.response?.data,
    };
  }
};

export default CreateCategory;

/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CategoryResponseById,
  CategoryResultById,
   GetCategoryByIdForUpdateQuery,
} from "@/app/type/category/categorytype";
import axiosInstance from "../axiosInstance/axiosInstance";

const GetByIdForUpdate = async (
  id: GetCategoryByIdForUpdateQuery
): Promise<CategoryResultById> => {
  try {
    const response = await axiosInstance.post("Category/GetByIdForUpdate", {
      id,
    });
    const result = response.data as CategoryResponseById;
    console.log(result);
    return {
      message: "دسته بندی مورد نظر یافت شد",
      success: true,
      data: result,
    };
  } catch (error: any) {
    const problemDetails = error.response?.data;

    if (problemDetails?.extensions?.errors) {
      // ولیدیشن: پیام‌های تک‌تک را برگردان
      return {
        success: false,
        message: "خطای دریافت داده ",
        error: problemDetails.extensions.errors,
      };
    }

    return {
      success: false,
      message:
        problemDetails?.title ||
        error.message ||
        "خطای ناشناخته   ",
      error: problemDetails,
    };
  }
};
export default GetByIdForUpdate;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { AddCategoryRequest } from "@/app/type/category/categorytype";
import axiosInstance from "../axiosInstance/axiosInstance";

interface CreateCategoryResult {
  success: boolean;
  message: string;
  categoryId?: string;
  error?: any;
}

const CreateCategory = async (categoryData: AddCategoryRequest): Promise<CreateCategoryResult> => {
  try {
    // موفقیت: API فقط یک ID رشته‌ای می‌دهد
    const response = await axiosInstance.post<string>("Category/Add", categoryData);
    const id = response.data;

    return {
      success: true,
      message: "دسته‌بندی با موفقیت ایجاد شد",
      categoryId: id,
    };
  } catch (error: any) {
    const problemDetails = error.response?.data;

    if (problemDetails?.extensions?.errors) {
      // ولیدیشن: پیام‌های تک‌تک را برگردان
      return {
        success: false,
        message: "خطای اعتبار سنجی",
        error: problemDetails.extensions.errors,
      };
    }

    return {
      success: false,
      message: problemDetails?.title || error.message || "خطای ناشناخته در ایجاد دسته‌بندی",
      error: problemDetails,
    };
  }
};

export default CreateCategory;

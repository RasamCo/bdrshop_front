
import { CategoryTreeNode } from "@/app/type/category/categorytype";
import axiosInstance from "../axiosInstance/axiosInstance";

export const GetCategoryTree = async (): Promise<CategoryTreeNode[]> => {
  try {
    const response = await axiosInstance.post("Category/GetTree", {});  // body {} OK هست
    
    console.log("Full response.data:", JSON.stringify(response.data, null, 2));  // لاگ کامل body (باید آرایه باشه)
    
    // مستقیم return response.data (چون Ok(result) مستقیم result رو می‌فرسته)
    const result = response.data as CategoryTreeNode[];  // type assertion برای safety
    console.log("Parsed result:", result);  // چک کن آرایه پره یا نه
    
    return result || [];  // fallback به آرایه خالی اگر null
  } catch (error) {
    console.error("GetCategoryTree full error:", {
      fullError: error
    });
    throw error;  // برای React Query
  }
};
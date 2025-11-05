import { CategoryTreeNode } from "@/app/type/category/categorytype";
import axiosInstance from "../axiosInstance/axiosInstance";

export const GetCategoryTree = async (): Promise<CategoryTreeNode[]> => {
  const response = await axiosInstance.post("Category/GetTree", {});
  // فرض بر اینکه سرور در data.result لیست درختی رو برمی‌گردونه
  return response.data.data.result;
};
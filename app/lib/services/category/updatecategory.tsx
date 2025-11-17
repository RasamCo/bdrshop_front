/* eslint-disable @typescript-eslint/no-explicit-any */
import { UpdateCategoryRequest } from "@/app/type/category/categorytype";
import { promises } from "timers";
import axiosInstance from "../axiosInstance/axiosInstance";
interface UpdateCategoryResult {
  success: boolean;
  message: string;
  categoryId?: string;
  error?: any;
}
const UpdateCategory=async(categroyData:UpdateCategoryRequest):Promise<UpdateCategoryResult>=>{
    try{
 const response=axiosInstance.post<string>("Category/Update",categroyData);
    const id=(await response).data;
    return{
        success:true,
        categoryId:id,
        message:"ویرایش دسته بندی با موفقیت انجام شد"
    };
    }catch (error: any) {
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
    
   


}
export default UpdateCategory;
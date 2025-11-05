"use client";
import {
  AddCategoryFormType,
  AddCategoryRequestSchema,
} from "@/app/lib/validation/(category)/AddCategoryRequestSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import CreateCategory from "@/app/lib/services/category/creatcategory";
import { revalidateCategoris } from "@/app/lib/actions/revalidate-category";
import { useRouter } from "next/navigation";

function CategoryCreateForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormType>({
    resolver: zodResolver(AddCategoryRequestSchema),
  });

  // const createMutation = useMutation({
  //   mutationFn: (formData: AddCategoryFormType) => CreateCategory(formData),
  //   onSuccess: async (data) => {
  //     console.log(data);

  //     console.log("Created Category:", data);
  //     await revalidateCategoris(); // بروزرسانی سمت سرور
  //     reset(); // ریست فرم بعد از ساخت موفق
  //     // toast.dark("  خانه جدید اضافه شد🎉", {
  //     //   style: { background: "#1E1E1E", color: "#fff" },
  //     // });
  //     // setTimeout(() => {
  //     //   //router.push("/");
  //     // }, 3000);
  //   },
  //   onError: (err) => {
  //     console.log("❌ خطا در ایجاد دسته بندی: " + err.message);
  //   },
  // });
const createMutation = useMutation({
  mutationFn: (formData: AddCategoryFormType) => CreateCategory(formData),

  onSuccess: async (data) => {
    if (data.success) {
      console.log("✅ دسته‌بندی ایجاد شد:", data.category);
      // console.log("📅 زمان اجرا:", data.meta.executionTimeMs, "ms");
      alert(data.message);

      await revalidateCategoris();
      reset();
    } else {
      alert("❌ خطا: " + data.message);
    }
  },

  onError: (err) => {
    console.error("❌ خطا در ایجاد دسته بندی:", err);
  },
});

  // تابع ارسال فرم
  const onSubmit = (data: AddCategoryFormType) => {
    console.log("🟢 Form Submitted", data);
    const formattedData = {
      ...data,
      
      // availableFrom: new Date(`${data.availableFrom}T00:00:00Z`).toISOString(),
    };
    createMutation.mutate(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-4 bg-white shadow rounded-2xl flex flex-col gap-4"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        ایجاد دسته‌بندی جدید
      </h2>

      {/* parentId */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          شناسه والد (اختیاری)
        </label>
        <input
          type="text"
          {...register("parentId")}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          placeholder="مثلاً id دسته والد"
        />
        {errors.parentId && (
          <p className="text-red-500 text-sm mt-1">{errors.parentId.message}</p>
        )}
      </div>

      {/* name */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          نام دسته‌بندی
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          placeholder="مثلاً پوشاک"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* slug */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          Slug
        </label>
        <input
          type="text"
          {...register("slug")}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          placeholder="مثلاً clothing"
        />
        {errors.slug && (
          <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>
        )}
      </div>

      {/* description */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          توضیحات
        </label>
        <textarea
          {...register("description")}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          placeholder="توضیح کوتاه درباره دسته‌بندی"
        ></textarea>
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* icon */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          آیکون (اختیاری)
        </label>
        <input
          type="text"
          {...register("icon")}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
          placeholder=" 🛍️"
        />
        {errors.icon && (
          <p className="text-red-500 text-sm mt-1">{errors.icon.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? "در حال ارسال..." : "ثبت دسته‌بندی"}
      </button>
    </form>
  );
}

export default CategoryCreateForm;

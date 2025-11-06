/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {
  AddCategoryFormType,
  AddCategoryRequestSchema,
} from "@/app/lib/validation/(category)/AddCategoryRequestSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "@tanstack/react-query";
import CreateCategory from "@/app/lib/services/category/creatcategory";
import { revalidateCategoris } from "@/app/lib/actions/revalidate-category";
import { useRouter } from "next/navigation";
import { GetCategoryTree } from "@/app/lib/services/category/getCategoryTree";
import TreeDropdown from "@/app/components/category/TreeDropdown";
import { toast } from "react-toastify";

function CategoryCreateForm() {
  const router = useRouter();

  // 1) defaultValues: parentId = null
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormType>({
    resolver: zodResolver(AddCategoryRequestSchema),
    defaultValues: {
      parentId: null, // مهم: بصورت صریح null
      name: "",
      slug: "",
      description: "",
      icon: undefined,
    },
  });

  const { data: categoryTree, isLoading } = useQuery({
    queryKey: ["category-tree"],
    queryFn: GetCategoryTree,
  });

  const createMutation = useMutation({
    mutationFn: (formData: AddCategoryFormType) => CreateCategory(formData),

    onSuccess: async (data) => {
      if (data.success) {
        toast.success("✅ " + data.message);
        console.log(data)
        await revalidateCategoris();
        reset();
      } else {
        toast.error(data.message);
         console.log(data)
      }
    },

    onError: (err: any) => {
      toast.error("❌ خطا در ایجاد دسته بندی: " + (err?.message || err));
    },
  });

  // تابع ارسال فرم
  const onSubmit = (data: AddCategoryFormType) => {
    // 2) تبدیل صریح parentId به null در صورت undefined / empty string
    let parentIdNormalized: string | null | undefined = data.parentId as any;

    // اگر مقدار empty string یا "undefined" یا 0 اون رو null کن
    if (parentIdNormalized === undefined || parentIdNormalized === "" ) {
      parentIdNormalized = null;
    }

    const formattedData = {
      ...data,
      parentId: parentIdNormalized, // حالا یا string یا null (هرگز undefined)
    };

    // لاگ payload برای دیباگ (قبل از mutate)
    console.log("Payload to send:", formattedData);

    // 3) ارسال
    createMutation.mutate(formattedData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" max-w-4xl mx-auto p-5 bg-white shadow rounded-2xl flex flex-col gap-4 mt-20"
    >
      <h2 className="text-lg font-semibold text-gray-700 mb-2">
        ایجاد دسته‌بندی جدید
      </h2>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          دسته بندی
        </label>

        {isLoading ? (
          <p className="text-gray-500 text-sm">در حال بارگذاری...</p>
        ) : (
          <TreeDropdown
            items={categoryTree || []}
            selectedId={watch("parentId") ?? null}
            onSelect={(value) => {
              // همیشه صریحاً null یا string ست کن
              if (value === undefined || value === "" ) {
                setValue("parentId", null, { shouldDirty: true, shouldValidate: true });
              } else {
                setValue("parentId", value, { shouldDirty: true, shouldValidate: true });
              }
            }}
            // اگر TreeDropdown از شما propsی نیاز داره (مثل placeholder) اضافه کن
          />
        )}

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
        />
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
        className="mt-4 bg-sky-900 hover:bg-sky-700 text-white py-2 px-4 rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? "در حال ارسال..." : "ثبت دسته‌بندی"}
      </button>
    </form>
  );
}

export default CategoryCreateForm;

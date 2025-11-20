/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  AddCategoryFormType,
  AddCategoryRequestSchema,
} from "@/app/lib/validation/(category)/AddCategoryRequestSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CreateCategory from "@/app/lib/services/category/creatcategory";
import { revalidateCategoris } from "@/app/lib/actions/revalidate-category";
import { useRouter } from "next/navigation";
import { GetCategoryTree } from "@/app/lib/services/category/getCategoryTree";
import TreeDropdown from "@/app/components/category/TreeDropdown";
import { toast } from "react-toastify";

function CategoryCreateForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddCategoryFormType>({
    resolver: zodResolver(AddCategoryRequestSchema),
    defaultValues: {
      parentId: null,
      name: "",
      slug: "",
      description: "",
      icon: undefined,
    },
  });

  const {
    data: categoryTree,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["category-tree"],
    queryFn: GetCategoryTree,
  });
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: (formData: AddCategoryFormType) => CreateCategory(formData),
    onSuccess: async (data) => {
      if (data.success) {
        toast.success("✅ دسته‌بندی با موفقیت ایجاد شد");
        queryClient.invalidateQueries({ queryKey: ["category-tree"] });
        reset(); // فرم را ریست کن
        // await revalidateCategoris();
      }
    },
    onError: (err: any) => {
      // بررسی دقیق خطاهای ولیدیشن سرور
      const serverErrors = err.response?.data?.errors;
      if (serverErrors && typeof serverErrors === "object") {
        Object.entries(serverErrors).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            messages.forEach((msg) => toast.error(`${field}: ${msg}`));
          } else if (typeof messages === "string") {
            toast.error(`${field}: ${messages}`);
          }
        });
      } else {
        // fallback: خطاهای عمومی یا ناشناخته
        const message =
          err.response?.data?.title ||
          err.response?.data?.detail ||
          err.message ||
          "خطای ناشناخته در ایجاد دسته‌بندی";
        toast.error(message);
      }
    },
  });

  const onSubmit = (data: AddCategoryFormType) => {
    // تبدیل parentId به null اگر خالی باشد
    const parentIdNormalized =
      data.parentId === undefined || data.parentId === ""
        ? null
        : data.parentId;

    const formattedData = {
      ...data,
      parentId: parentIdNormalized,
      icon: data.icon,
    };

    createMutation.mutate(formattedData);
  };
  const MAX_SIZE = 60 * 1024; // حداکثر 50KB برای آیکون
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Clear input بعد هر خطا برای UX بهتر
    const clearInput = () => {
      e.target.value = "";
    };
    if (file.size > MAX_SIZE) {
      toast.error("❌ اندازه آیکون باید کمتر از 50KB باشد");
      clearInput();
      return;
    }
    if (!file.type.startsWith("image/")) {
      toast.error("❌ فقط فایل‌های تصویری مجاز هستند");
      clearInput();
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string; // رشته Base64         برای تبدیل فایل باینری به رشته متنی (Base64) استفاده می‌شه.
      setValue("icon", base64String); // react-hook-form
    };
    reader.readAsDataURL(file); // تبدیل فایل به Base64
  };
const iconValue = watch("icon");
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-4xl mx-auto p-5 bg-white shadow rounded-2xl flex flex-col gap-4 mt-20"
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
              setValue(
                "parentId",
                value === "" || value === undefined ? null : value,
                {
                  shouldDirty: true,
                  shouldValidate: true,
                }
              );
            }}
          />
        )}
        {errors.parentId && (
          <p className="text-red-500 text-sm mt-1">{errors.parentId.message}</p>
        )}
      </div>

      {/* نام دسته‌بندی */}
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

      {/* توضیحات */}
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

      {/* آیکون */}
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">
          آیکون (اختیاری)
        </label>

        <input
          type="file"
          accept="image/"
          {...register("icon")}
          onChange={handleIconChange}
          multiple={false} //فقظ یک فایل انتخاب شود
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-200"
        />
        {/* Preview آیکون */}
        { iconValue && iconValue.length > 0 &&(
          <div className="mt-2">
            <img
              src={watch("icon")}
              alt="پیش‌نمایش آیکون"
              className="w-16 h-16 object-cover rounded border"
            />
          </div>
        )}
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

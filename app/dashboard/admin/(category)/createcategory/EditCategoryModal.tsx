/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect } from "react";
import {
  UpdateCategoryRequestSchema,
  UpdateCategoryFormType,
} from "@/app/lib/validation/(category)/UpdateCategoryRequestSchema";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateCategory from "@/app/lib/services/category/updatecategory";
import TreeDropdown from "@/app/components/category/TreeDropdown";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  data: any; // category detail
  datalist: any[];
}

export default function EditCategoryModal({
  open,
  onClose,
  data,
  datalist,
}: EditCategoryModalProps) {
  const queryClient = useQueryClient();

  // ---------------- FORM SETUP ----------------
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateCategoryFormType>({
    resolver: zodResolver(UpdateCategoryRequestSchema),
    defaultValues: {
      id: "",
      name: "",
      slug: "",
      description: "",
      parentId: null,
      icon: undefined,
      isactive: true,
    },
  });

  // وقتی دیتای ادیت وارد شد فرم را مقداردهی کن
  useEffect(() => {
    if (data) {
      reset({
        id: data.id,
        name: data.name,
        slug: data.slug,
        description: data.description ?? "",
        parentId: data.parentId ?? null,
        isactive: data.isactive ?? true,
        icon: undefined,
      });
    }
  }, [data, reset]);

  // ---------------- ICON BASE64 ----------------
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("icon", reader.result as string, { shouldDirty: true });
    };
    reader.readAsDataURL(f);
  };

  // ---------------- MUTATION ----------------
  const mutation = useMutation({
    mutationFn: (values: UpdateCategoryFormType) => UpdateCategory(values),

    onSuccess: (res) => {
      if (res.success) {
        toast.success("ویرایش دسته‌بندی با موفقیت انجام شد");
        queryClient.invalidateQueries({ queryKey: ["category-tree"] });
        onClose();
      } else {
        toast.error(res.message || "خطا در ویرایش دسته‌بندی");
      }
    },
    onError: () => toast.error("خطا در ارتباط با سرور"),
  });

  // ---------------- SUBMIT ----------------
  const onSubmit = (values: UpdateCategoryFormType) => {
    const payload: UpdateCategoryFormType = {
      id: values.id,
      name: values.name,
      slug: values.slug,
      description: values.description ?? "",
      parentId: values.parentId,
      isactive: values.isactive, // ← فیلد جدید
      icon: values.icon ?? data.icon ?? null,
    };

    mutation.mutate(payload);
  };

  // ---------------- UI ----------------
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-600">
            ویرایش دسته‌بندی
          </DialogTitle>
        </DialogHeader>

        {!data ? (
          <p className="py-4 text-center">در حال بارگذاری...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {/* Name */}
            <div>
              <label className="text-sm text-gray-700">نام دسته</label>
              <input
                {...register("name")}
            
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="text-sm text-gray-700">Slug</label>
              <input
                {...register("slug")}
              
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-gray-700">توضیحات</label>
              <textarea
                {...register("description")}
               
                className="w-full p-2 border rounded bg-gray-100"
              />
            </div>

            {/* Parent */}
            <div>
              <label className="text-sm text-gray-700">دسته والد</label>

              <TreeDropdown
                items={datalist}
                selectedId={watch("parentId")}
                onSelect={(id) => setValue("parentId", id ?? null)}
              />
            </div>

            {/* isActive */}
            <div className="flex items-center gap-2 mt-2">
              <input
                type="checkbox"
                {...register("isactive")}
                checked={watch("isactive")}
                onChange={(e) => setValue("isactive", e.target.checked)}
              />
              <label className="text-sm text-gray-700">فعال باشد</label>
            </div>

            {/* Icon */}
            <div>
              <label className="text-sm text-gray-700 block mb-1">
                آیکن جدید (اختیاری)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleIconChange}
                className="w-full p-2 border rounded"
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">بستن</Button>
              </DialogClose>
              <Button className="bg-amber-600" type="submit">
                ذخیره تغییرات
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GetCategoryTree } from "@/app/lib/services/category/getCategoryTree";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ChevronDown, ChevronRight, Edit, Trash2 } from "lucide-react"; // ← برای آیکون باز/بسته

export default function CategoryList() {
  const { data: categoryTree, isLoading, isError } = useQuery({
    queryKey: ["category-tree"],
    queryFn: GetCategoryTree,
  });

  if (isLoading) return <p className="text-center mt-8">در حال بارگذاری...</p>;
  if (isError) return <p className="text-center text-red-500 mt-8">خطا در دریافت داده‌ها</p>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">لیست دسته‌بندی‌ها</h2>
      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-right font-semibold text-gray-700">سر‌دسته</th>
              <th className="py-2 px-4 text-right font-semibold text-gray-700">نام دسته‌بندی</th>
              <th className="py-2 px-4 text-center font-semibold text-gray-700">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {categoryTree?.map((cat: any) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                parentName="—"
                level={0}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/** 🔁 نمایش بازگشتی دسته‌ها با قابلیت باز/بسته شدن زیرمجموعه‌ها */
function CategoryRow({
  category,
  parentName,
  level,
}: {
  category: any;
  parentName: string;
  level: number;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition">
        {/* ستون سر‌دسته */}
        <td className="py-2 px-4 text-gray-700">{parentName || "—"}</td>

        {/* ستون نام دسته با آیکون باز/بسته */}
        <td className="py-2 px-4">
          <div
            style={{ marginRight: `${level * 20}px` }}
            className="flex items-center gap-2 cursor-pointer select-none"
            onClick={() => category.children?.length > 0 && setIsOpen(!isOpen)}
          >
            {category.children?.length > 0 ? (
              isOpen ? (
                <ChevronDown className="w-4 h-4 text-gray-500" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-500" />
              )
            ) : (
              <span className="w-4 h-4" /> // جای آیکون خالی برای ردیف‌های بدون زیرمجموعه
            )}
            <span>{category.name}</span>
          </div>
        </td>

        {/* ستون عملیات */}
       
<td className="py-2 px-4 text-center flex justify-center gap-3">
  <button
    onClick={() => handleEdit(category.id)}
    className="text-orange-400 hover:text-orange-700 transition"
    title="ویرایش"
  >
    <Edit className="w-5 h-5" />
  </button>

  <button
    onClick={() => handleDelete(category.id)}
    className="text-red-400 hover:text-red-700 transition"
    title="حذف"
  >
    <Trash2 className="w-5 h-5" />
  </button>
</td>
      </tr>

      {/* 🔁 نمایش زیرمجموعه‌ها فقط در صورت باز بودن */}
      {isOpen &&
        category.children?.length > 0 &&
        category.children.map((child: any) => (
          <CategoryRow
            key={child.id}
            category={child}
            parentName={category.name}
            level={level + 1}
          />
        ))}
    </>
  );
}

// 🧩 توابع ساده برای حذف و ویرایش
function handleEdit(id: number) {
  alert(`ویرایش دسته با id: ${id}`);
}

function handleDelete(id: number) {
  if (confirm("آیا از حذف این دسته مطمئن هستید؟")) {
    alert(`دسته ${id} حذف شد`);
  }
}

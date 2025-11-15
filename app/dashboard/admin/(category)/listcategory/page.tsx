/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GetCategoryTree } from "@/app/lib/services/category/getCategoryTree";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState, Fragment, useRef } from "react";
import { ChevronDown, ChevronRight, Edit, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";

import {
  CategoryResponseById,
  GetCategoryByIdForUpdateQuery,
} from "@/app/type/category/categorytype";
import GetByIdForUpdate from "@/app/lib/services/category/getbyIdforupdate";
import EditCategoryModal from "../createcategory/EditCategoryModal";

export default function CategoryList() {


  const { data: categoryTree, isLoading, isError } = useQuery({
    queryKey: ["category-tree"],
    queryFn: GetCategoryTree,
  });

  
const [openModal, setOpenModal] = useState(false);
const [selectedData, setSelectedData] = useState<any | null>(null);



 

  const editMutation = useMutation({
    mutationFn: GetByIdForUpdate,
    onSuccess: (result) => {
      if (!result.success || !result.data) {
        return;
      }
    },
    onError: (error) => {
     
      toast.error("خطا در دریافت اطلاعات دسته‌بندی");
      console.error("Edit mutation error:", error);
   
    },
  });

  const handleEdit = (id: GetCategoryByIdForUpdateQuery) => {
  setOpenModal(true);
  editMutation.mutate(id, {
    onSuccess: (result) => {
      if (result.success && result.data) {
        setSelectedData(result.data); // ارسال اطلاعات به مودال
      } else {
        toast.error("خطا در دریافت اطلاعات دسته‌بندی");
      }
    },
  });
};



  const handleDelete = (id: number | string) => {
    if (confirm("آیا از حذف این دسته مطمئن هستید؟")) {
      alert(`دسته ${id} حذف شد`);
    }
  };

  if (isLoading)
    return <p className="text-center mt-8">در حال بارگذاری...</p>;
  if (isError)
    return (
      <p className="text-center text-red-500 mt-8">خطا در دریافت داده‌ها</p>
    );

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        لیست دسته‌بندی‌ها
      </h2>

      <div className="overflow-x-auto rounded-lg shadow bg-white">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="py-2 px-4 text-right font-semibold text-gray-700">
                سر‌دسته
              </th>
              <th className="py-2 px-4 text-right font-semibold text-gray-700">
                نام دسته‌بندی
              </th>
              <th className="py-2 px-4 text-center font-semibold text-gray-700">
                عملیات
              </th>
            </tr>
          </thead>
          <tbody>
            {categoryTree?.map((cat: any) => (
              <CategoryRow
                key={cat.id}
                category={cat}
                parentName="—"
                level={0}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </tbody>
        </table>
      </div>
<EditCategoryModal
  open={openModal}
  onClose={() => setOpenModal(false)}
  data={selectedData}
  datalist={categoryTree}
/>

    </div>
  );
}

/* ---------------- CategoryRow ---------------- */
function CategoryRow({
  category,
  parentName,
  level,
  onEdit,
  onDelete,
}: {
  category: any;
  parentName: string;
  level: number;
  onEdit: (id: GetCategoryByIdForUpdateQuery) => void;
  onDelete: (id: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="border-b hover:bg-gray-50 transition">
        <td className="py-2 px-4 text-gray-700">{parentName || "—"}</td>
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
              <span className="w-4 h-4" />
            )}
            <span>{category.name}</span>
          </div>
        </td>
        <td className="py-2 px-4 text-center flex justify-center gap-3">
          <button
            onClick={() => onEdit(category.id.toString())}
            className="text-orange-400 hover:text-orange-700 transition"
            type="button"
          >
            <Edit className="w-5 h-5" />
          </button>

          <button
            onClick={() => onDelete(category.id.toString())}
            className="text-red-400 hover:text-red-700 transition"
            type="button"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </td>
      </tr>

      {isOpen &&
        category.children?.length > 0 &&
        category.children.map((child: any) => (
          <CategoryRow
            key={child.id}
            category={child}
            parentName={category.name}
            level={level + 1}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
    </>
  );
}

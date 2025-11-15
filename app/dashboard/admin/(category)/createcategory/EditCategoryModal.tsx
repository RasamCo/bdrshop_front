/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TreeDropdown from "@/app/components/category/TreeDropdown";
import { GetCategoryTree } from "@/app/lib/services/category/getCategoryTree";
import { CategoryResponseById, CategoryTreeNode } from "@/app/type/category/categorytype";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  data: CategoryResponseById | null;
  onUpdate?: (updatedData: Partial<CategoryResponseById>) => void; // اختیاری: برای submit آپدیت به parent component
  datalist: any
}

export default function EditCategoryModal({ open, onClose, data, onUpdate, datalist }: EditCategoryModalProps) {
  const [treeItems, setTreeItems] = useState<CategoryTreeNode[]>([]);
  const [isLoadingTree, setIsLoadingTree] = useState(false);

  const [parentId, setParentId] = useState<string | null>(data?.parentId ?? null);
  const [parentName, setParentName] = useState<string | null>(data?.parentName ?? null); // برای ذخیره نام

  // لود درخت دسته‌ها وقتی مودال باز می‌شه
  useEffect(() => {
    if (!open || !data) {
      return; // اگر داده‌ای نباشه، لود نکن
    }

    const loadTree = async () => {
      setIsLoadingTree(true);
      try {
        const items = datalist;
        setTreeItems(items || []); // fallback به آرایه خالی

        // اگر parentId از data موجود باشه، ازش استفاده کن (نام از data یا درخت پیدا می‌شه)
        // اگر parentName موجود باشه و parentId نباشه، ID رو از نام پیدا کن
        if (data.parentId) {
          setParentId(data.parentId);
        } else if (data.parentName && data.parentName.trim() !== "") {
          // تابع جستجوی recursive برای پیدا کردن ID بر اساس نام والد
          const findIdByName = (nodes: CategoryTreeNode[], targetName: string): string | null => {
            for (const node of nodes) {
              if (node.name === targetName) {
                return node.id;
              }
              if (node.children && node.children.length > 0) {
                const found = findIdByName(node.children, targetName);
                if (found) return found;
              }
            }
            return null;
          };
          const foundId = findIdByName(items || [], data.parentName);
          if (foundId) {
            setParentId(foundId);
          }
        } else {
          setParentId(null); // اگر parentName خالی یا null باشه، null انتخاب کن (دسته اصلی)
        }

        // parentName رو از data نگه دار (fallback برای نمایش)
        setParentName(data.parentName ?? null);
      } catch (error) {
        console.error("خطا در لود درخت دسته‌ها:", error);
        // toast.error رو از axiosInstance خودت می‌تونی اضافه کنی اگر بخوای
        setTreeItems([]); // fallback
        setParentId(null);
        setParentName(null);
      } finally {
        setIsLoadingTree(false);
      }
    };

    loadTree();
  }, [open, data, datalist]); // datalist رو هم dependency اضافه کن

  // هندل انتخاب والد (حالا name رو هم می‌گیره)
  const handleParentSelect = (id: string | null, name?: string) => {
    setParentId(id);
    setParentName(name ?? null);
    console.log("🆕 Parent selected:", { id, name }); // دیباگ اختیاری
  };

  // submit برای آپدیت (فقط parentId رو آپدیت می‌کنه؛ بقیه فیلدها readOnly موندن)
  const handleSubmit = () => {
    if (!data || !onUpdate) {
      onClose(); // اگر onUpdate نباشه، فقط ببند
      return;
    }

    const updates: Partial<CategoryResponseById> = {
      parentId: parentId, // فقط این فیلد آپدیت می‌شه (فرض بر اینه که API با ID کار می‌کنه)
      // اگر فیلدهای دیگه editable بشن، state جدا اضافه کن و اینجا بذار
    };

    onUpdate(updates);
    onClose(); // بعد از آپدیت، مودال رو ببند
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle>ویرایش دسته‌بندی</DialogTitle>
        </DialogHeader>

        {!data ? (
          <p className="text-center py-6">در حال بارگذاری...</p>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="text-sm text-gray-600">نام دسته</label>
              <input
                value={data?.name ?? ""}
                className="w-full border rounded p-2 mt-1"
                readOnly
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">slug</label>
              <input
                value={data?.slug ?? ""}
                className="w-full border rounded p-2 mt-1"
                readOnly
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">توضیحات</label>
              <input
                value={data?.description ?? ""}
                className="w-full border rounded p-2 mt-1"
                readOnly
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">والد</label>
              {isLoadingTree ? (
                <p className="text-sm text-gray-500 mt-1 p-2 border rounded bg-gray-50">در حال بارگذاری دسته‌ها...</p>
              ) : (
                <TreeDropdown 
                  items={treeItems}
                  selectedId={parentId}
                  initialSelectedName={parentName} // ← fallback از data.parentName
                  placeholder="والد را انتخاب کنید"
                  onSelect={handleParentSelect}
                />
              )}
              {/* {data.parentName??""} رو حذف کردم، چون dropdown خودش نمایش می‌ده */}
            </div>

            <div>
              <label className="text-sm text-gray-600">آیکن</label>
              <input
                value={data?.icon ?? ""}
                className="w-full border rounded p-2 mt-1"
                readOnly
              />
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              بستن
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSubmit}>
            ویرایش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
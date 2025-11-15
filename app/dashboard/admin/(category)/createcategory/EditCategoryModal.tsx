/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import TreeDropdown from "@/app/components/category/TreeDropdown";
import { GetCategoryTree } from "@/app/lib/services/category/getCategoryTree";
import { CategoryResponseById, CategoryTreeNode } from "@/app/type/category/categorytype";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState, useRef } from "react";

interface EditCategoryModalProps {
  open: boolean;
  onClose: () => void;
  data: CategoryResponseById | null;
  onUpdate?: (updatedData: Partial<CategoryResponseById> & { iconFile?: File }) => void;
  datalist: any
}

export default function EditCategoryModal({ open, onClose, data, onUpdate, datalist }: EditCategoryModalProps) {
  const [treeItems, setTreeItems] = useState<CategoryTreeNode[]>([]);
  const [isLoadingTree, setIsLoadingTree] = useState(false);

  const [parentId, setParentId] = useState<string | null>(null); // ← تغییر: initial null، در useEffect ست می‌شه
  const [parentName, setParentName] = useState<string | null>(null);

  // state های آیکن
  const [newIconFile, setNewIconFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const previewUrlRef = useRef<string | null>(null);

  // ← useEffect جدید: Reset state ها وقتی مودال باز/بسته می‌شه یا data تغییر می‌کنه
  useEffect(() => {
    // Reset آیکن state ها
    setNewIconFile(null);
    if (previewUrlRef.current) {
      URL.revokeObjectURL(previewUrlRef.current);
      previewUrlRef.current = null;
    }
    setPreviewUrl(null);

    // Reset parent state ها
    setParentId(null);
    setParentName(null);

    // اگر مودال بازه و data موجوده، state ها رو بر اساس data جدید ست کن
    if (open && data) {
      setParentId(data.parentId ?? null);
      setParentName(data.parentName ?? null);
    }
  }, [open, data]); // ← dependency: هر بار open یا data تغییر کنه، reset و set کن

  // لود درخت دسته‌ها (همون قبلی، اما dependency ها رو آپدیت کردم)
  useEffect(() => {
    if (!open || !data) {
      return;
    }

    const loadTree = async () => {
      setIsLoadingTree(true);
      try {
        const items = datalist;
        setTreeItems(items || []);

        // اگر parentId موجود باشه، ازش استفاده کن؛ иначе از نام پیدا کن
        if (data.parentId) {
          setParentId(data.parentId); // ← حالا در useEffect بالا ست شده، اما برای safety
        } else if (data.parentName && data.parentName.trim() !== "") {
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
          setParentId(null);
        }

        setParentName(data.parentName ?? null);
      } catch (error) {
        console.error("خطا در لود درخت دسته‌ها:", error);
        setTreeItems([]);
        setParentId(null);
        setParentName(null);
      } finally {
        setIsLoadingTree(false);
      }
    };

    loadTree();
  }, [open, data, datalist]);

  // هندلر آپلود فایل آیکن (همون قبلی)
  const handleIconChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        alert('لطفاً فقط فایل تصویری انتخاب کنید.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('حجم فایل نباید بیشتر از 5 مگابایت باشد.');
        return;
      }

      setNewIconFile(file);

      // پاک کردن URL قبلی
      if (previewUrlRef.current) {
        URL.revokeObjectURL(previewUrlRef.current);
      }

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      previewUrlRef.current = url;
    }
  };

  // هندل انتخاب والد (همون قبلی)
  const handleParentSelect = (id: string | null, name?: string) => {
    setParentId(id);
    setParentName(name ?? null);
  };

  // submit (همون قبلی)
  const handleSubmit = () => {
    if (!data || !onUpdate) {
      onClose();
      return;
    }

    const updates: Partial<CategoryResponseById> & { iconFile?: File } = {
      parentId: parentId,
    };

    if (newIconFile) {
      updates.iconFile = newIconFile;
    }

    onUpdate(updates);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="text-center text-blue-600">ویرایش دسته‌بندی</DialogTitle>
        </DialogHeader>

        {!data ? (
          <p className="text-center py-6">در حال بارگذاری...</p>
        ) : (
          <div className="space-y-4">
            {/* فیلدهای readOnly همون قبلی... */}
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
                  initialSelectedName={parentName}
                  placeholder="والد را انتخاب کنید"
                  onSelect={handleParentSelect}
                />
              )}
            </div>

            {/* بخش آیکن (همون قبلی، بدون تغییر) */}
            <div>
              <label className="text-sm text-gray-600 block mb-2">آیکن</label>
              <div className="space-y-2">
                <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded p-4 bg-gray-50">
                  {data?.icon ? (
                    <img
                      src={data.icon.startsWith('http') ? data.icon : `http://localhost:5296${data.icon}`}
                      alt="آیکن فعلی"
                      className="max-w-20 max-h-20 object-contain rounded"
                      onError={(e) => {
                        e.currentTarget.src = '/placeholder-icon.png';
                      }}
                    />
                  ) : (
                    <span className="text-gray-500 text-sm">بدون آیکن</span>
                  )}
                </div>

                <label className="block text-xs text-gray-500">انتخاب آیکن جدید (اختیاری)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleIconChange}
                  className="w-full border rounded p-2 text-sm"
                  multiple={false}
                />

                {previewUrl && (
                  <div className="flex items-center justify-center border border-gray-300 rounded p-2 bg-gray-50">
                    <img
                      src={previewUrl}
                      alt="پیش‌نمایش"
                      className="max-w-20 max-h-20 object-contain rounded"
                    />
                    <span className="ml-2 text-xs text-gray-500">پیش‌نمایش</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" type="button">
              بستن
            </Button>
          </DialogClose>
          <Button type="button" className="bg-amber-600" onClick={handleSubmit}>
            ویرایش
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
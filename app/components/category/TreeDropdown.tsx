"use client";

import { CategoryTreeNode } from "@/app/type/category/categorytype";
import { JSX, useState } from "react";

interface TreeDropdownProps {
  items: CategoryTreeNode[];
  selectedId?: string | null;
  initialSelectedName?: string | null; // ← prop جدید: نام از API (fallback)
  placeholder?: string;
  onSelect: (id: string | null, name?: string) => void;
}

export default function TreeDropdown({
  items,
  selectedId,
  initialSelectedName,
  placeholder = "والد را انتخاب کنید",
  onSelect
}: TreeDropdownProps) {
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());
  const [isOpen, setIsOpen] = useState(false);

  // تابع پیدا کردن نام (فقط string می‌گیره)
  const findNameById = (nodes: CategoryTreeNode[], targetId: string): string | null => {
    for (const node of nodes) {
      if (node.id === targetId) return node.name;
      if (node.children && node.children.length > 0) {
        const found = findNameById(node.children, targetId);
        if (found) return found;
      }
    }
    return null;
  };

  // محاسبه نام نمایش‌داده‌شده (با دیباگ)
  const getCurrentSelectedName = (): string => {
    console.log("🔍 Debug TreeDropdown:", {
      selectedId,
      itemsLength: items.length,
      initialSelectedName,
      placeholder
    }); // ← دیباگ: در کنسول چک کن

    if (selectedId === null) {
      return "دسته اصلی"; // برای null
    }

    if (!selectedId || items.length === 0) {
      return initialSelectedName || placeholder; // fallback به API یا placeholder
    }

    const foundInTree = findNameById(items, selectedId);
    console.log("🔍 Found in tree:", foundInTree); // دیباگ

    return foundInTree || initialSelectedName || placeholder;
  };

  const currentSelectedName = getCurrentSelectedName();

  const toggleNode = (id: string) => {
    setOpenNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const handleSelect = (id: string | null) => {
    let nameToPass: string | undefined;
    if (id !== null && id !== undefined) {
      const foundName = findNameById(items, id);
      nameToPass = foundName || undefined;
    }
    console.log("🎯 Selected:", { id, name: nameToPass }); // دیباگ
    onSelect(id, nameToPass);
    setIsOpen(false);
  };

  const renderTree = (nodes: CategoryTreeNode[], depth = 0): JSX.Element[] => {
    return nodes.map((node) => {
      const nodeOpen = openNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.id} className={`mr-${depth * 3}`}>
          <div
            className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${selectedId === node.id ? "bg-blue-100 text-blue-800" : "hover:bg-gray-100"
              }`}
            style={{ marginRight: `${depth * 12}px` }}
          >
            {hasChildren && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleNode(node.id);
                }}
                className="text-gray-600 text-sm focus:outline-none flex-shrink-0"
              >
                {nodeOpen ? "▾" : "▸"}
              </button>
            )}

            <span
              onClick={() => handleSelect(node.id)}
              className="text-gray-800 text-sm select-none flex-1"
            >
              {node.name}
            </span>
          </div>

          {nodeOpen && hasChildren && (
            <div className="pr-4 border-r border-gray-200">
              {renderTree(node.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="relative border rounded-lg bg-white shadow-sm text-right" dir="rtl">
      {/* Button dropdown با نام selected */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-right py-2 px-3 border-b border-gray-200 focus:outline-none hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm text-gray-700 block truncate">
          {currentSelectedName}
        </span>
        <span className={`inline-block ml-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>

      {/* لیست dropdown */}
      {isOpen && (
        <div className="absolute z-50 w-full bg-white border border-gray-200 rounded-b-lg shadow-lg max-h-64 overflow-auto">
          {/* گزینه دسته اصلی */}
          <div
            onClick={() => handleSelect(null)}
            className={`cursor-pointer py-2 px-3 border-b border-gray-100 hover:bg-gray-50 ${selectedId === null ? "bg-blue-100 text-blue-800" : ""
              }`}
          >
            دسته اصلی
          </div>

          {/* درخت دسته‌ها */}
          {items.length > 0 ? (
            <div className="p-2">{renderTree(items, 0)}</div>
          ) : (
            <div className="p-3 text-center text-gray-500 text-sm">در حال بارگیری دسته‌ها...</div>
          )}
        </div>
      )}
    </div>
  );
}
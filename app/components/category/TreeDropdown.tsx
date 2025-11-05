"use client";

import { CategoryTreeNode } from "@/app/type/category/categorytype";
import { JSX, useState } from "react";


interface TreeDropdownProps {
  items: CategoryTreeNode[];
  selectedId?: string | null;
  onSelect: (id: string | null) => void;
}

export default function TreeDropdown({ items, selectedId, onSelect }: TreeDropdownProps) {
  const [openNodes, setOpenNodes] = useState<Set<string>>(new Set());
  const [showList, setShowList] = useState(false);

  const toggleNode = (id: string) => {
    setOpenNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
  };

  const renderTree = (nodes: CategoryTreeNode[], depth = 0): JSX.Element[] => {
    return nodes.map((node) => {
      const isOpen = openNodes.has(node.id);
      const hasChildren = node.children && node.children.length > 0;

      return (
        <div key={node.id} className="mr-2">
          <div
            className={`flex items-center gap-1 py-1 px-2 rounded cursor-pointer ${
              selectedId === node.id ? "bg-blue-100" : "hover:bg-gray-100"
            }`}
            style={{ marginRight: `${depth * 12}px` }}
          >
            {/* دکمه باز/بستن */}
            {hasChildren && (
              <button
                type="button"
                onClick={() => toggleNode(node.id)}
                className="text-gray-600 text-sm focus:outline-none"
              >
                {isOpen ? "▾" : "▸"}
              </button>
            )}

            {/* نام دسته */}
            <span
              onClick={() => onSelect(node.id)}
              className="text-gray-800 text-sm select-none"
            >
              {node.name}
            </span>
          </div>

          {/* زیرشاخه‌ها */}
          {isOpen && hasChildren && (
            <div className="pr-4 border-r border-gray-200">
              {renderTree(node.children!, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="border rounded-lg p-2 bg-white shadow-sm text-right" dir="rtl">
      {/* گزینه اصلی */}
      <div
        onClick={() => onSelect(null)}
        className={`cursor-pointer py-1 px-2 rounded ${
          selectedId === null ? "bg-blue-100" : "hover:bg-gray-100"
        }`}
      >
دسته اصلی
      </div>

      {/* دکمه نمایش یا بستن لیست */}
      <button
        type="button"
        onClick={() => setShowList((prev) => !prev)}
        className=" text-blue-600 mt-1 hover:underline bg-gray-100 w-full text-right"
      >
        {showList ? "بستن دسته‌ها ▲" : "نمایش دسته‌ها ▼"}
      </button>

      {/* نمایش درخت فقط وقتی showList=true */}
      {showList && <div className="mt-2 max-h-64 overflow-auto">{renderTree(items)}</div>}
    </div>
  );
}

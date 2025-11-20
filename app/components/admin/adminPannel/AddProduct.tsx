"use client";

import Image from "next/image";
import React, { useState, ChangeEvent } from "react";

interface FormState {
    title: string;
    price: string;
    discount: string;
    stock: string;
    category: string;
    description: string;
    bulk: boolean;
    bulkCount: number;
}

interface AddProductProps {
    onToggleSidebar: () => void;
}

export default function AddProduct({ onToggleSidebar }: AddProductProps) {
    const [form, setForm] = useState<FormState>({
        title: "",
        price: "",
        discount: "",
        stock: "",
        category: "clothes",
        description: "",
        bulk: false,
        bulkCount: 1,
    });

    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [showBulkMenu, setShowBulkMenu] = useState(false);

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            setForm(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
            return;
        }
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setImagePreview(URL.createObjectURL(file));
    };

    const handleRemove = () => {
        setImagePreview(null);
        const fileInput = document.getElementById("productImage") as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    return (
        <main
            className=
            "flex-1 min-h-screen text-text-main overflow-y-auto p-6 md:pr-80 md:pl-10 bg-gray-50 text-right animate-[fadeIn_0.5s_ease]">
            <header
                className=
                "flex items-center justify-between mb-6">
                <div
                    className=
                    "flex items-center gap-4">
                    <button
                        onClick={onToggleSidebar}
                        className=
                        "md:hidden p-2 rounded-lg bg-white shadow text-sm">
                        منو
                    </button>
                    <div
                        className=
                        "flex flex-col gap-2">
                        <h1
                            className=
                            "text-2xl font-extrabold">
                            ثبت محصول جدید
                        </h1>
                        <p
                            className=
                            "text-xs text-gray-500">
                            خوش آمدید — پیش‌نمایش
                        </p>
                    </div>
                </div>
                <div
                    className=
                    "flex items-center gap-3">
                    <button
                        className=
                        "px-3 py-2 rounded-xl bg-orginal-color text-white shadow hover:scale-102 transform transition">
                        خروج
                    </button>
                </div>
            </header>
            <form
                className=
                "grid grid-cols-1 md:grid-cols-2 gap-8">
                <div
                    className=
                    "flex flex-col gap-8 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div
                        className=
                        "flex flex-col gap-2">
                        <label
                            className=
                            "text-sm font-medium text-gray-700">
                            دسته‌بندی
                        </label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className=
                            "border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orginal-color transition">
                            <option
                                value="clothes">
                                پوشاک
                            </option>
                            <option
                                value="home">
                                خانه و آشپزخانه
                            </option>
                            <option
                                value="beauty">
                                زیبایی و سلامت
                            </option>
                            <option
                                value="sport">
                                ورزش
                            </option>
                        </select>
                    </div>
                    <div
                        className=
                        "flex flex-col gap-2">
                        <label
                            className=
                            "text-sm font-medium text-bg-oldbox-color">
                            توضیحات
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            className=
                            "border-2 border-gray-200 rounded-xl px-3 py-2 min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orginal-color transition" />
                    </div>
                    <div
                        className="flex flex-col gap-2">
                        <label
                            className=
                            "text-sm font-medium text-gray-700">
                            آپلود تصویر
                        </label>
                        <input
                            id="productImage"
                            type="file"
                            accept="image/*"
                            onChange={handleFile}
                            className=
                            "border-2 border-gray-200 rounded-xl px-3 py-2 bg-gray-50 cursor-pointer" />
                        {imagePreview && (
                            <div
                                className=
                                "flex flex-col gap-2">
                                <Image
                                    alt="alt"
                                    width={50}
                                    height={50}
                                    src={imagePreview}
                                    className=
                                    "w-40 h-40 object-cover rounded-lg shadow-md mt-2 animate-[fadeIn_0.3s_ease]" />
                                <button
                                    type="button"
                                    onClick={handleRemove}
                                    className=
                                    "px-3 py-1 mt-2 bg-sale-dark text-white rounded-lg hover:bg-alarm transition-all duration-300 delay-75">
                                    حذف تصویر
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className=
                    "flex flex-col gap-6 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div
                        className=
                        "flex flex-col gap-4">
                        <Input
                            label="عنوان محصول"
                            name="title"
                            value={form.title}
                            onChange={handleChange} />
                        <Input
                            label="قیمت"
                            name="price"
                            value={form.price}
                            onChange={handleChange} />
                        <Input
                            label="درصد تخفیف"
                            name="discount"
                            value={form.discount}
                            onChange={handleChange} />
                        <Input
                            label="موجودی"
                            name="stock"
                            value={form.stock}
                            onChange={handleChange} />
                    </div>
                    <div
                        className=
                        "flex flex-col gap-2 mt-3">
                        <div
                            className=
                            "flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="bulk"
                                checked={form.bulk}
                                onChange={handleChange} />
                            <span
                                onClick={() => setShowBulkMenu(!showBulkMenu)}
                                className=
                                "text-sm text-bg-oldbox-color cursor-pointer select-none">
                                ثبت چندتایی
                            </span>
                        </div>
                        {showBulkMenu && (
                            <select
                                name="bulkCount"
                                value={form.bulkCount}
                                onChange={handleChange}
                                className=
                                "border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orginal-color transition">
                                {[1, 2, 3, 4, 5].map(n => (
                                    <option
                                        key={n}
                                        value={n}>
                                        {n} عدد
                                    </option>
                                ))}
                            </select>
                        )}
                    </div>
                    <button
                        type="submit"
                        className=
                        "w-full py-4 mt-4 rounded-2xl bg-orginal-color text-white font-semibold shadow-lg hover:scale-105 transform transition-all duration-300">
                        ثبت محصول
                    </button>
                </div>
            </form>
        </main>
    );
}

interface InputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({ label, name, value, onChange }) => (
    <div
        className=
        "flex flex-col gap-2">
        <label
            className=
            "text-sm font-medium text-bg-oldbox-color">
            {label}
        </label>
        <input
            name={name}
            value={value}
            onChange={onChange}
            className=
            "border-2 border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition" />
    </div>
);

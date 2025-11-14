"use client";

import React, { useState } from "react";

type MenuKey = "products" | "orders" | "customers" | "settings" | "structure";

interface SidebarProps {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface MenuState {
    products: boolean;
    orders: boolean;
    customers: boolean;
    settings: boolean;
    structure: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
    const [menus, setMenus] = useState<MenuState>({
        products: false,
        orders: false,
        customers: false,
        settings: false,
        structure: false,
    });

    const toggle = (key: MenuKey) => {
        setMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <aside
            className=
            {`fixed right-0 top-0 h-screen w-72 font-font-lahze-medium bg-bg-background z-40 transform transition-transform duration-300 ease-out ${open ? "translate-x-0" : "translate-x-full md:translate-x-0"}`}
            style={{ boxShadow: "0 6px 20px #005aba50" }}>
            <div
                className=
                "absolute left-0 top-0 h-full w-px bg-gray-200/50" />
            <div
                className=
                "p-5 flex items-center justify-between">
                <div
                    className=
                    "flex flex-col gap-2">
                    <h1
                        className=
                        "text-lg font-extrabold">
                        مدیریت فروشگاه
                    </h1>
                    <p
                        className=
                        "text-xs text-gray-500">
                        پنل ادمین — پیش‌نمایش
                    </p>
                </div>
                <button
                    onClick={() => setOpen(false)}
                    className=
                    "md:hidden p-2 rounded hover:bg-gray-100">
                    ✕
                </button>
            </div>
            <nav
                className=
                "p-4 text-right space-y-3 overflow-y-auto h-[calc(100%-76px)]">
                <a
                    className=
                    "block p-2 rounded-lg hover:bg-gray-50 transition">
                    داشبورد
                </a>
                {(["products", "orders", "customers", "settings", "structure"] as MenuKey[]).map(
                    key => (
                        <div
                            key={key}>
                            <button
                                onClick={() => toggle(key)}
                                className=
                                "w-full flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 transition">
                                <span
                                    className=
                                    "flex items-center gap-2">
                                    {key === "products" && "محصولات"}
                                    {key === "orders" && "سفارش‌ها"}
                                    {key === "customers" && "مشتریان"}
                                    {key === "settings" && "تنظیمات"}
                                    {key === "structure" && "چارت سازمانی"}
                                </span>
                                <span
                                    className=
                                    "text-sm">
                                    {menus[key] ? "▲" : "▼"}
                                </span>
                            </button>
                            <div
                                className=
                                {`overflow-hidden transition-all duration-300 ${menus[key] ? "max-h-56 opacity-100 mt-2" : "max-h-0 opacity-0"}`}>
                                <div
                                    className=
                                    "mr-3 space-y-1 text-sm text-gray-700">
                                    {key === "products" &&
                                        ["گوشی", "موبایل", "تبلت", "لپ‌تاپ"].map(item => (
                                            <a
                                                key={item}
                                                className=
                                                "block p-2 rounded hover:bg-gray-50">
                                                {item}
                                            </a>
                                        ))}
                                    {key === "orders" &&
                                        ["جدید", "در انتظار", "آرشیو"].map(item => (
                                            <a
                                                key={item}
                                                className=
                                                "block p-2 rounded hover:bg-gray-50">
                                                {item}
                                            </a>
                                        ))}
                                    {key === "customers" &&
                                        ["لیست", "سطوح"].map(item => (
                                            <a
                                                key={item}
                                                className=
                                                "block p-2 rounded hover:bg-gray-50">
                                                {item}
                                            </a>
                                        ))}
                                    {key === "settings" &&
                                        ["عمومی", "امنیت"].map(item => (
                                            <a
                                                key={item}
                                                className=
                                                "block p-2 rounded hover:bg-gray-50">
                                                {item}
                                            </a>
                                        ))}
                                    {key === "structure" &&
                                        ["مدیریت", "پشتیبانی"].map(item => (
                                            <a
                                                key={item}
                                                className=
                                                "block p-2 rounded hover:bg-gray-50">
                                                {item}
                                            </a>
                                        ))}
                                </div>
                            </div>
                        </div>
                    )
                )}
            </nav>
        </aside>
    );
};

export default Sidebar;

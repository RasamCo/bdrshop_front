"use client";

import React, { useState } from "react";
import Sidebar from "../../components/admin/adminPannel/sidebarAdminPannel";

const AdminPanel: React.FC = () => {
    const [open, setOpen] = useState(false);

    const stats = [
        { id: 1, title: "کاربران", value: "2.5m", hint: "3.2%+" },
        { id: 2, title: "فعال", value: "1.2k", hint: "1.1%+" },
        { id: 3, title: "درآمد", value: "24m", hint: "8.7%+" },
        { id: 4, title: "خطاها", value: "10", hint: "12%+" },
    ];

    return (
        <div
            className=
            "min-h-screen bg-bg-background text-text-main flex font-font-lahze-medium">
            <Sidebar
                open={open}
                setOpen={setOpen} />
            <main
                className=
                "flex-1 h-screen overflow-y-auto p-6 md:pr-80 md:pl-12 bg-orginal-color/5">
                <header
                    className=
                    "flex items-center justify-between mb-6">
                    <div
                        className=
                        "flex items-center gap-4">
                        <button
                            onClick={() => setOpen(true)}
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
                                پنل مدیریت
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
                        <input
                            placeholder="جستجو..."
                            className=
                            "rounded-xl border-2 border-text-legend-input px-3 py-2.5 text-xs shadow-sm lg:w-60 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                        />
                        <button
                            className=
                            "px-3 py-2 rounded-xl bg-orginal-color text-white shadow hover:scale-102 transform transition">
                            خروج
                        </button>
                    </div>
                </header>
                <section
                    className=
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {stats.map(s => (
                        <article
                            key={s.id}
                            className=
                            "rounded-xl bg-white p-4 shadow-lg transform transition hover:scale-102">
                            <div
                                className=
                                "flex items-center justify-between">
                                <div>
                                    <div
                                        className=
                                        "text-xs text-gray-400">
                                        {s.title}
                                    </div>
                                    <div
                                        className=
                                        "text-2xl font-bold mt-1">
                                        {s.value}
                                    </div>
                                </div>
                                <div
                                    className=
                                    "text-sm text-green-600 font-medium">
                                    {s.hint}
                                </div>
                            </div>
                            <div
                                className=
                                "mt-3 text-xs text-gray-500">
                                نمایش سریع از شاخص‌ها
                            </div>
                        </article>
                    ))}
                </section>
                <section
                    className=
                    "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        className=
                        "bg-orginal-color-support text-white rounded-2xl p-5 shadow-lg">
                        <h3
                            className=
                            "font-semibold mb-3">
                            داشبورد فروش
                        </h3>
                        <p
                            className=
                            "text-xs text-bg-forground">
                            شامل نمودارها و خلاصه‌ای از وضعیت فروش
                        </p>
                        <div
                            className=
                            "mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div
                                className=
                                "p-3 rounded-lg bg-orginal-color shadow-lg">
                                سفارشات امروز:
                                <span
                                    className=
                                    "flex text-bg-forground text-xl">
                                    230
                                </span>
                            </div>
                            <div
                                className=
                                "p-3 rounded-lg bg-orginal-color shadow-lg">
                                محصولات موجود:
                                <span
                                    className=
                                    "flex text-bg-forground text-xl">
                                    1,240
                                </span>
                            </div>
                        </div>
                        <div
                            className=
                            "mt-4 h-40 rounded-lg flex items-center justify-center text-bg-forground shadow-inner">
                            خالی
                        </div>
                    </div>
                    <div
                        className=
                        "bg-white rounded-2xl p-5 shadow-lg">
                        <h3
                            className=
                            "font-semibold mb-3">
                            سفارش‌های اخیر
                        </h3>
                        <div
                            className=
                            "overflow-x-auto">
                            <table
                                className=
                                "w-full text-sm text-right">
                                <thead
                                    className=
                                    "text-xs text-gray-400">
                                    <tr>
                                        <th
                                            className=
                                            "p-2">
                                            کاربر
                                        </th>
                                        <th
                                            className=
                                            "p-2">
                                            مبلغ
                                        </th>
                                        <th
                                            className=
                                            "p-2">
                                            وضعیت
                                        </th>
                                        <th
                                            className=
                                            "p-2">
                                            #
                                        </th>
                                    </tr>
                                </thead>
                                <tbody
                                    className=
                                    "divide-y">
                                    <tr
                                        className=
                                        "hover:bg-gray-50">
                                        <td
                                            className=
                                            "p-2">
                                            1
                                        </td>
                                        <td
                                            className=
                                            "p-2">
                                            علی
                                        </td>
                                        <td
                                            className=
                                            "p-2">
                                            $120
                                        </td>
                                        <td
                                            className=
                                            "p-2 text-green-600">
                                            تحویل
                                        </td>
                                    </tr>
                                    <tr
                                        className=
                                        "hover:bg-gray-50">
                                        <td
                                            className=
                                            "p-2">
                                            2
                                        </td>
                                        <td
                                            className=
                                            "p-2">
                                            سارا
                                        </td>
                                        <td
                                            className=
                                            "p-2">
                                            $89
                                        </td>
                                        <td
                                            className=
                                            "p-2 text-yellow-600">
                                            در انتظار
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div
                        className=
                        "bg-white rounded-2xl p-5 shadow-lg">
                        <h3 className=
                            "font-semibold mb-3">
                            اطلاعات اضافی
                        </h3>
                        <p
                            className=
                            "text-xs text-box">
                            باکس‌های اضافی برای پر کردن داشبورد و نمایش داده‌های مهم.
                        </p>
                        <div
                            className=
                            "mt-4 grid grid-cols-1 gap-4">
                            <div
                                className=
                                "p-3 rounded-lg bg-white shadow-lg">
                                کارت نمونه ۱
                            </div>
                            <div
                                className=
                                "p-3 rounded-lg bg-white shadow-lg">
                                کارت نمونه ۲
                            </div>
                            <div
                                className=
                                "p-3 rounded-lg bg-white shadow-lg">
                                کارت نمونه ۳
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminPanel;

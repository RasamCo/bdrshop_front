"use client";

import React, { useState } from "react";
import Sidebar from "../../components/admin/adminPannel/sidebarAdminPannel";
import Dashboard from "@/app/components/admin/adminPannel/Dashboard";
import AddProduct from "@/app/components/admin/adminPannel/AddProduct";

const AdminPanel: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState<"dashboard"|"add-product">("dashboard");

    return (
        <div
            className=
            "min-h-screen bg-bg-background text-text-main flex font-font-lahze-medium">
            <Sidebar
                open={open}
                setOpen={setOpen}
                setPage={setPage} />

            {page === "dashboard" && <Dashboard onToggleSidebar={() => setOpen(true)} />}
            {page === "add-product" && <AddProduct onToggleSidebar={() => setOpen(true)} />}
        </div>
    );
};

export default AdminPanel;

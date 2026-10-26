import Navbar from "@/shared/components/Navbar";
import SidebarWrapper from "@/shared/components/SidebarWrapper";
import React from "react";

export default function DashLayout({ children } : { children : React.ReactNode; }) {
    const scrollbarStyles = "[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-neutral-200 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-neutral-300";

    return (
        <main className="h-screen font-Inter antialiased flex flex-col">
            <Navbar/>

            <section className="min-w-0 flex-1 w-full flex overflow-hidden">
                <SidebarWrapper/>

                <div className={`bg-[#F4F7F9] dark:bg-slate-950 w-full flex-1 overflow-y-auto ${scrollbarStyles}`}>
                    {children}
                </div>
            </section>
        </main>
    );
}
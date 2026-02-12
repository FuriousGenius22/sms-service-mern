import { useState } from "react";
import { Outlet } from "react-router-dom";
import { AppHeader } from "@/components/app/AppHeader";
import { AppSidebar } from "@/components/app/AppSidebar";
import { SessionActivityTracker } from "@/components/app/SessionActivityTracker";

export function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#06080f] text-white">
      <SessionActivityTracker />
      {/* Ambient background effects matching landing page */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-indigo-600/[0.08] rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-pink-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute top-[40%] right-[5%] w-[300px] h-[300px] bg-cyan-600/[0.04] rounded-full blur-[100px]" />
      </div>

      {/* Sidebar - Fixed on left */}
      <AppSidebar 
        isOpen={sidebarOpen} 
        onClose={() => setSidebarOpen(false)} 
      />

      {/* Main Content Area with Header */}
      <div className="lg:pl-64">
        {/* Header - Horizontal bar at top */}
        <AppHeader onMenuClick={() => setSidebarOpen(true)} />

        {/* Page Content */}
        <main className="relative pt-20">
          <div className="p-6 md:p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

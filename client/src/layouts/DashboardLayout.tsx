import { Link, Outlet, useLocation } from "react-router-dom";
import { motion } from "motion/react";
import {
  LayoutDashboardIcon,
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  MenuIcon,
  XIcon,
} from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";

const sidebarLinks = [
  { to: ROUTES.DASHBOARD, label: "Overview", icon: LayoutDashboardIcon },
  { to: ROUTES.DASHBOARD_PROFILE, label: "Profile", icon: UserIcon },
  { to: ROUTES.DASHBOARD_SETTINGS, label: "Settings", icon: SettingsIcon },
];

export function DashboardLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar - desktop */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-56 flex-col border-r border-slate-800 bg-slate-950/80 backdrop-blur">
        <div className="p-6 border-b border-slate-800">
          <Link to={ROUTES.HOME} className="text-lg font-semibold text-pink-500">
            App
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {sidebarLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                location.pathname === to
                  ? "bg-pink-600/20 text-pink-400 border border-pink-600/30"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/50"
              }`}
            >
              <Icon className="size-5" />
              {label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Link
            to={ROUTES.HOME}
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-pink-500 transition"
          >
            <LogOutIcon className="size-5" />
            Exit
          </Link>
        </div>
      </aside>

      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-slate-800 border border-slate-700"
        aria-label="Open menu"
      >
        <MenuIcon className="size-6" />
      </button>

      {/* Sidebar - mobile overlay */}
      {sidebarOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/60 z-40"
            onClick={() => setSidebarOpen(false)}
            aria-hidden
          />
          <aside className="md:hidden fixed left-0 top-0 h-full w-64 z-50 flex flex-col border-r border-slate-800 bg-slate-950">
            <div className="p-4 flex items-center justify-between border-b border-slate-800">
              <Link to={ROUTES.HOME} className="text-lg font-semibold text-pink-500">
                App
              </Link>
              <button onClick={() => setSidebarOpen(false)} aria-label="Close menu">
                <XIcon className="size-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {sidebarLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                    location.pathname === to
                      ? "bg-pink-600/20 text-pink-400"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Icon className="size-5" />
                  {label}
                </Link>
              ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
              <Link
                to={ROUTES.HOME}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-pink-500"
              >
                <LogOutIcon className="size-5" />
                Exit
              </Link>
            </div>
          </aside>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 md:ml-56 min-h-screen">
        <motion.div
          className="p-6 md:p-8 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
}

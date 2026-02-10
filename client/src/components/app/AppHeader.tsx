import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MenuIcon, 
  BellIcon, 
  SearchIcon, 
  UserIcon,
  SettingsIcon,
  LogOutIcon,
  ChevronDownIcon
} from "lucide-react";
import { LanguageSelector } from "@/components/layout/LanguageSelector";
import { motion, AnimatePresence } from "motion/react";

interface AppHeaderProps {
  onMenuClick: () => void;
}

export function AppHeader({ onMenuClick }: AppHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const notifications = [
    { id: 1, title: "New message from John", time: "2m ago", unread: true },
    { id: 2, title: "Order #1234 completed", time: "1h ago", unread: true },
    { id: 3, title: "System update available", time: "3h ago", unread: false },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 lg:left-64 h-20 z-50">
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-[#06080f]/70 backdrop-blur-xl border-b border-white/[0.06]">
        {/* Ambient glow effects */}
        <div className="absolute top-0 left-[20%] w-[300px] h-[300px] bg-indigo-600/[0.08] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-[20%] w-[200px] h-[200px] bg-pink-600/[0.06] rounded-full blur-[80px] pointer-events-none" />
      </div>

      <div className="relative h-full px-4 lg:px-6 flex items-center justify-between gap-4">
        {/* Left: Menu button + Logo + Search */}
        <div className="flex items-center gap-4 flex-1">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2.5 hover:bg-white/[0.05] rounded-xl transition-colors border border-white/[0.06]"
            aria-label="Toggle menu"
          >
            <MenuIcon className="w-5 h-5 text-gray-300" />
          </button>
          
          <Link to="/" className="flex items-center gap-2 group lg:hidden">
            <img
              src="/logo/logo_colorful.png"
              alt="Logo"
              className="h-12 w-auto group-hover:scale-105 transition-transform"
            />
          </Link>

          {/* Search - Desktop */}
          <div className="hidden md:block flex-1 max-w-xl">
            <div className="relative group">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-indigo-400 transition-colors" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 focus:bg-white/[0.05] transition-all"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/0 via-indigo-500/0 to-pink-500/0 group-focus-within:from-indigo-500/10 group-focus-within:via-pink-500/5 group-focus-within:to-pink-500/10 pointer-events-none transition-all" />
            </div>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile search toggle */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="md:hidden p-2.5 hover:bg-white/[0.05] rounded-xl transition-colors border border-white/[0.06]"
            aria-label="Search"
          >
            <SearchIcon className="w-5 h-5 text-gray-300" />
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotificationsOpen(!notificationsOpen)}
              className="relative p-2.5 hover:bg-white/[0.05] rounded-xl transition-colors border border-white/[0.06] group"
              aria-label="Notifications"
            >
              <BellIcon className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-pink-500 rounded-full animate-pulse">
                <span className="absolute inset-0 bg-pink-500 rounded-full animate-ping opacity-75"></span>
              </span>
            </button>

            <AnimatePresence>
              {notificationsOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setNotificationsOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-white/[0.08] bg-[#06080f]/95 backdrop-blur-xl shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-white/[0.06]">
                      <h3 className="font-semibold text-white">Notifications</h3>
                      <p className="text-xs text-gray-500 mt-0.5">You have {notifications.filter(n => n.unread).length} unread messages</p>
                    </div>
                    <div className="max-h-[400px] overflow-y-auto">
                      {notifications.map((notif) => (
                        <button
                          key={notif.id}
                          className="w-full p-4 flex items-start gap-3 hover:bg-white/[0.03] transition-colors border-b border-white/[0.04] last:border-0"
                        >
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-indigo-500' : 'bg-gray-600'}`} />
                          <div className="flex-1 text-left">
                            <p className="text-sm text-white">{notif.title}</p>
                            <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <div className="p-3 border-t border-white/[0.06]">
                      <button className="w-full text-center text-sm text-indigo-400 hover:text-indigo-300 transition-colors">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector */}
          <LanguageSelector />

          {/* User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-2 p-1.5 pr-3 hover:bg-white/[0.05] rounded-xl transition-colors border border-white/[0.06] group"
              aria-label="User menu"
            >
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center ring-2 ring-white/[0.1] group-hover:ring-white/[0.2] transition-all">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <ChevronDownIcon className="w-4 h-4 text-gray-400 hidden sm:block" />
            </button>

            <AnimatePresence>
              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-56 rounded-xl border border-white/[0.08] bg-[#06080f]/95 backdrop-blur-xl shadow-2xl z-50"
                  >
                    <div className="p-4 border-b border-white/[0.06]">
                      <p className="font-medium text-white">John Doe</p>
                      <p className="text-xs text-gray-500 mt-0.5">john@example.com</p>
                    </div>
                    <div className="p-2">
                      <Link
                        to="/app/settings"
                        onClick={() => setUserMenuOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                      >
                        <SettingsIcon className="w-4 h-4" />
                        Settings
                      </Link>
                      <button
                        onClick={() => setUserMenuOpen(false)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-pink-400 hover:bg-white/[0.05] transition-colors"
                      >
                        <LogOutIcon className="w-4 h-4" />
                        Sign out
                      </button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile search dropdown */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-full left-0 right-0 bg-[#06080f]/95 backdrop-blur-xl border-b border-white/[0.06] overflow-hidden"
          >
            <div className="p-4">
              <div className="relative">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search anything..."
                  className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50"
                  autoFocus
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

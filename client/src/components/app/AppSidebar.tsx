import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboardIcon, 
  ShieldCheckIcon, 
  CoinsIcon, 
  HeadphonesIcon,
  FileTextIcon,
  XIcon
} from "lucide-react";

interface AppSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { icon: LayoutDashboardIcon, label: "Overview", path: "/app/overview" },
  { icon: ShieldCheckIcon, label: "Verification", path: "/app/verification" },
  { icon: CoinsIcon, label: "Credits", path: "/app/credits" },
  { icon: HeadphonesIcon, label: "Support", path: "/app/support" },
  { icon: FileTextIcon, label: "Blog", path: "/app/blog" },
];

export function AppSidebar({ isOpen, onClose }: AppSidebarProps) {
  const location = useLocation();

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[#06080f]/70 backdrop-blur-xl border-r border-white/[0.06] z-50 transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Header */}
        <div className="h-20 px-4 flex items-center justify-between border-b border-white/[0.06]">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo/logo_colorful.png"
              alt="Logo"
              className="h-10 w-auto"
            />
          </Link>
          <button
            onClick={onClose}
            className="lg:hidden p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <XIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-5rem)]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => onClose()}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${
                  isActive
                    ? "bg-indigo-600/20 text-indigo-400 border border-indigo-600/30 shadow-lg shadow-indigo-500/10"
                    : "text-gray-400 hover:text-white hover:bg-white/[0.05] border border-transparent"
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="flex-1 text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

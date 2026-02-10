import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";

const navItems = [
  { label: "Features", href: "#features", isRoute: false },
  { label: "Pricing", href: "#pricing", isRoute: false },
  { label: "Testimonials", href: "#testimonials", isRoute: false },
  { label: "Blog", href: "/blog", isRoute: true },
];

function NavLink({
  item,
  className,
  onClick,
}: {
  item: (typeof navItems)[number];
  className: string;
  onClick?: () => void;
}) {
  if (item.isRoute) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {item.label}
      </Link>
    );
  }
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {item.label}
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14 mt-4 px-5 rounded-2xl border border-white/[0.06] bg-[#06080f]/70 backdrop-blur-xl">
            <Link to={ROUTES.HOME} className="flex-shrink-0">
              <img
                src="/assets/logo.svg"
                alt="Logo"
                className="h-7 w-auto"
                width={120}
                height={28}
              />
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <NavLink
                  key={item.label}
                  item={item}
                  className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={ROUTES.LOGIN}
                className="hidden sm:inline-flex text-sm text-gray-300 hover:text-white transition-colors px-3 py-1.5"
              >
                Log in
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="text-sm font-medium px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors duration-200"
              >
                Get Started
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="md:hidden p-1.5 text-gray-400 hover:text-white transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon size={22} />
              </button>
            </div>
          </nav>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-[100] bg-[#06080f]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-6 md:hidden transition-all duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            onClick={() => setMobileOpen(false)}
            className="text-lg text-gray-300 hover:text-white transition-colors"
          />
        ))}
        <div className="flex flex-col items-center gap-3 mt-4">
          <Link
            to={ROUTES.LOGIN}
            onClick={() => setMobileOpen(false)}
            className="text-lg text-gray-300 hover:text-white"
          >
            Log in
          </Link>
          <Link
            to={ROUTES.REGISTER}
            onClick={() => setMobileOpen(false)}
            className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-medium"
          >
            Get Started
          </Link>
        </div>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors"
          aria-label="Close menu"
        >
          <XIcon size={22} />
        </button>
      </div>
    </>
  );
}

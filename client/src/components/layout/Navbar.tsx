import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";
import { MenuIcon, XIcon, ChevronDownIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import { blogPosts } from "@/data/blog";

const navItems = [
  { label: "Features", href: "#features", isRoute: false, hasDropdown: false },
  { label: "Pricing", href: "#pricing", isRoute: false, hasDropdown: false },
  { label: "Testimonials", href: "#testimonials", isRoute: false, hasDropdown: false },
  { label: "Blog", href: "/blog", isRoute: true, hasDropdown: true },
];

function NavLink({
  item,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  item: (typeof navItems)[number];
  className: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  const content = (
    <span className="relative inline-block group pb-2">
      <span className="flex items-center gap-1">
        {item.label}
        {item.hasDropdown && <ChevronDownIcon className="w-3 h-3" />}
      </span>
      <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-indigo-500 to-pink-500 transition-all duration-300 ease-out group-hover:w-full" />
    </span>
  );

  if (item.isRoute && !item.hasDropdown) {
    return (
      <Link to={item.href} className={className} onClick={onClick}>
        {content}
      </Link>
    );
  }
  
  if (item.hasDropdown) {
    return (
      <div 
        className={className} 
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {content}
      </div>
    );
  }
  
  return (
    <a href={item.href} className={className} onClick={onClick}>
      {content}
    </a>
  );
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-[88px] px-8 border-b border-white/[0.06] bg-[#06080f]/70 backdrop-blur-xl">
            <Link to={ROUTES.HOME} className="flex-shrink-0">
              <img
                src="/logo/logo_bright.png"
                alt="Logo"
                className="h-12 w-auto"
                width={180}
                height={48}
              />
            </Link>

            <div className="hidden md:flex items-center gap-8 relative">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  <NavLink
                    item={item}
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer"
                    onMouseEnter={() => item.hasDropdown && setBlogDropdownOpen(true)}
                    onMouseLeave={() => item.hasDropdown && setBlogDropdownOpen(false)}
                  />
                  
                  {item.hasDropdown && (
                    <AnimatePresence>
                      {blogDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[420px] rounded-2xl border border-white/[0.08] bg-[#06080f]/95 backdrop-blur-xl shadow-2xl"
                          onMouseEnter={() => setBlogDropdownOpen(true)}
                          onMouseLeave={() => setBlogDropdownOpen(false)}
                        >
                          <div className="p-4">
                            <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                              Recent Posts
                            </div>
                            <div className="space-y-1 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent hover:scrollbar-thumb-white/20">
                              {blogPosts.slice(0, 8).map((post, index) => (
                                <motion.div
                                  key={post.slug}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.03, duration: 0.2 }}
                                >
                                  <Link
                                    to={`/blog/${post.slug}`}
                                    className="block px-3 py-3 rounded-xl hover:bg-white/[0.05] transition-colors group"
                                    onClick={() => setBlogDropdownOpen(false)}
                                  >
                                    <div className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors line-clamp-1">
                                      {post.title}
                                    </div>
                                    <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                                      <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400">
                                        {post.category}
                                      </span>
                                      <span>{post.readingTime}</span>
                                    </div>
                                  </Link>
                                </motion.div>
                              ))}
                            </div>
                            <Link
                              to={ROUTES.BLOG}
                              className="block mt-3 px-3 py-2 text-center text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                              onClick={() => setBlogDropdownOpen(false)}
                            >
                              View All Posts →
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
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

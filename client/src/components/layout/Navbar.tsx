import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 w-full pointer-events-auto"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 250, damping: 70, mass: 1 }}
      >
        <div className="flex w-full items-center justify-between rounded-b-2xl bg-linear-to-b from-pink-900 to-pink-950 px-4 py-3 text-white shadow-lg md:px-8">
          <Link to={ROUTES.HOME} className="flex items-center">
            <img className="h-8 w-auto" src="/assets/logo.svg" alt="logo" width={130} height={34} />
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to={ROUTES.LOGIN}
              className="bg-linear-to-r from-white to-pink-400 bg-clip-text font-medium text-transparent hover:opacity-90 px-4 py-2 rounded-full border border-pink-400/50 text-sm md:text-base"
            >
              Log in
            </Link>
            <button onClick={() => setIsOpen(true)} className="md:hidden p-2 text-white" aria-label="Open menu">
              <MenuIcon size={26} className="active:scale-90 transition" />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu: only Login */}
      <div
        className={`fixed inset-0 z-[100] bg-black/40 backdrop-blur flex flex-col items-center justify-center gap-8 md:hidden transition-transform duration-400 ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <Link
          to={ROUTES.LOGIN}
          onClick={() => setIsOpen(false)}
          className="px-6 py-2.5 border border-pink-600 hover:bg-pink-600/20 rounded-full text-lg"
        >
          Log in
        </Link>
        <button
          onClick={() => setIsOpen(false)}
          className="aspect-square size-10 p-1 items-center justify-center bg-pink-600 hover:bg-pink-700 transition text-white rounded-md flex"
          aria-label="Close menu"
        >
          <XIcon />
        </button>
      </div>
    </>
  );
}

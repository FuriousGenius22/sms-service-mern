import { Outlet, Link } from "react-router-dom";
import { motion } from "motion/react";

export function AuthLayout() {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 bg-[#06080f]">
      {/* Ambient glow */}
      <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/[0.12] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[20%] w-[300px] h-[300px] bg-cyan-600/[0.06] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link to="/" className="inline-block">
            <img
              src="/assets/logo.svg"
              alt="Logo"
              className="h-8 w-auto mx-auto"
              width={130}
              height={32}
            />
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <Outlet />
        </motion.div>
      </div>
    </div>
  );
}

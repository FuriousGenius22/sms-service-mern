import { Outlet } from "react-router-dom";
import { motion } from "motion/react";

export function AuthLayout() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-black">
      <div className="absolute top-0 left-1/4 size-72 bg-pink-600 blur-[300px] -z-10 opacity-50" />
      <motion.div
        className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-950/90 backdrop-blur p-8 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
}

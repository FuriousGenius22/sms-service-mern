import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MailIcon, LockIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function RegisterPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-semibold text-white">Create account</h1>
        <p className="text-slate-400 mt-1 text-sm">Get started with a free trial</p>
      </motion.div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 text-slate-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-2">Name</label>
          <div className="flex items-center pl-3 rounded-xl border border-slate-700 focus-within:border-pink-500 transition">
            <UserIcon className="size-5 text-slate-500 shrink-0" />
            <input
              type="text"
              placeholder="Your name"
              className="w-full p-3 bg-transparent outline-none"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="flex items-center pl-3 rounded-xl border border-slate-700 focus-within:border-pink-500 transition">
            <MailIcon className="size-5 text-slate-500 shrink-0" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full p-3 bg-transparent outline-none"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="flex items-center pl-3 rounded-xl border border-slate-700 focus-within:border-pink-500 transition">
            <LockIcon className="size-5 text-slate-500 shrink-0" />
            <input
              type="password"
              placeholder="••••••••"
              className="w-full p-3 bg-transparent outline-none"
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-medium transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Create account
          <ArrowRightIcon className="size-5" />
        </motion.button>
      </form>

      <p className="text-center text-slate-400 text-sm mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="text-pink-500 hover:text-pink-400 font-medium">
          Sign in
        </Link>
      </p>
    </>
  );
}

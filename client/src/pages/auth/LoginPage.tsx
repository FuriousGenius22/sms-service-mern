import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MailIcon, LockIcon, ArrowRightIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function LoginPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
        <p className="text-slate-400 mt-1 text-sm">Sign in to your account</p>
      </motion.div>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-5 text-slate-300">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
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
          transition={{ delay: 0.15 }}
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

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between text-sm"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="rounded border-slate-600 bg-slate-800 text-pink-600" />
            Remember me
          </label>
          <Link to="#" className="text-pink-500 hover:text-pink-400 transition">
            Forgot password?
          </Link>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-xl font-medium transition"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          Sign in
          <ArrowRightIcon className="size-5" />
        </motion.button>
      </form>

      <p className="text-center text-slate-400 text-sm mt-6">
        Don't have an account?{" "}
        <Link to={ROUTES.REGISTER} className="text-pink-500 hover:text-pink-400 font-medium">
          Sign up
        </Link>
      </p>
    </>
  );
}

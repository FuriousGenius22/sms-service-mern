import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { MailIcon, ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export function ForgotPasswordPage() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="mx-auto w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center mb-4">
          <MailIcon className="w-6 h-6 text-indigo-400" />
        </div>
        <h1 className="text-2xl font-semibold text-white">Reset password</h1>
        <p className="text-gray-400 mt-1 text-sm max-w-xs mx-auto">
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </p>
      </motion.div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5 text-gray-300"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-2">
            Email address
          </label>
          <div className="flex items-center pl-3 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-indigo-500/50 transition-colors">
            <MailIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-3 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-600"
              autoFocus
            />
          </div>
        </motion.div>

        <motion.button
          type="submit"
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          Send reset link
          <ArrowRightIcon className="w-4 h-4" />
        </motion.button>
      </form>

      <motion.div
        className="text-center mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25 }}
      >
        <Link
          to={ROUTES.LOGIN}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          <ArrowLeftIcon className="w-3.5 h-3.5" />
          Back to sign in
        </Link>
      </motion.div>
    </>
  );
}

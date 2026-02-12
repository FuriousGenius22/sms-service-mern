import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { MailIcon, LockIcon, ArrowRightIcon } from "lucide-react";
import { useState } from "react";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth";

export function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await authService.login(formData);
      sessionStorage.removeItem("humanVerified");
      navigate('/verify-human');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 sm:mb-8"
      >
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Welcome back</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Sign in to your account to continue
        </p>
      </motion.div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="space-y-4 sm:space-y-5 text-gray-300"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="flex items-center pl-3 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-indigo-500/50 transition-colors">
            <MailIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full px-3 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-600"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="flex items-center pl-3 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-indigo-500/50 transition-colors">
            <LockIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <input
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              className="w-full px-3 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-600"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center justify-between text-sm"
        >
          <label className="flex items-center gap-2 cursor-pointer text-gray-400">
            <input
              type="checkbox"
              className="rounded border-white/[0.1] bg-white/[0.03] text-indigo-600 focus:ring-indigo-500 focus:ring-offset-0"
            />
            Remember me
          </label>
          <Link
            to={ROUTES.FORGOT_PASSWORD}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Forgot password?
          </Link>
        </motion.div>

        <motion.button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          {loading ? 'Signing in...' : 'Sign in'}
          {!loading && <ArrowRightIcon className="w-4 h-4" />}
        </motion.button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-5 sm:mt-6">
        Don&apos;t have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}

import { motion } from "motion/react";
import { UserIcon, MailIcon } from "lucide-react";

export function ProfilePage() {
  return (
    <div className="space-y-8 max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
          <UserIcon className="size-8 text-pink-500" />
          Profile
        </h1>
        <p className="text-slate-400 mt-1">Manage your account details.</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        onSubmit={(e) => e.preventDefault()}
        className="space-y-5"
      >
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Display name</label>
          <div className="flex items-center pl-3 rounded-xl border border-slate-700 focus-within:border-pink-500 transition">
            <UserIcon className="size-5 text-slate-500 shrink-0" />
            <input
              type="text"
              defaultValue="Jane Doe"
              className="w-full p-3 bg-transparent outline-none text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
          <div className="flex items-center pl-3 rounded-xl border border-slate-700 focus-within:border-pink-500 transition">
            <MailIcon className="size-5 text-slate-500 shrink-0" />
            <input
              type="email"
              defaultValue="jane@example.com"
              className="w-full p-3 bg-transparent outline-none text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 bg-pink-600 hover:bg-pink-700 rounded-full font-medium transition"
        >
          Save changes
        </button>
      </motion.form>
    </div>
  );
}

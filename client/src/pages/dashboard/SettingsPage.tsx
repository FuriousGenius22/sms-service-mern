import { motion } from "motion/react";
import { SettingsIcon, BellIcon, ShieldIcon } from "lucide-react";

export function SettingsPage() {
  return (
    <div className="space-y-8 max-w-xl">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
          <SettingsIcon className="size-8 text-pink-500" />
          Settings
        </h1>
        <p className="text-slate-400 mt-1">Configure your preferences.</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="space-y-6"
      >
        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BellIcon className="size-5 text-pink-500" />
            <div>
              <p className="font-medium text-white">Email notifications</p>
              <p className="text-sm text-slate-400">Receive updates and reminders</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" defaultChecked className="sr-only peer" />
            <div className="w-11 h-6 bg-slate-700 peer-focus:ring-2 peer-focus:ring-pink-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-600" />
          </label>
        </div>

        <div className="p-4 rounded-xl border border-slate-800 bg-slate-950/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldIcon className="size-5 text-pink-500" />
            <div>
              <p className="font-medium text-white">Two-factor authentication</p>
              <p className="text-sm text-slate-400">Add an extra layer of security</p>
            </div>
          </div>
          <button className="px-4 py-2 rounded-lg border border-pink-600 text-pink-500 hover:bg-pink-600/10 transition text-sm">
            Enable
          </button>
        </div>
      </motion.div>
    </div>
  );
}

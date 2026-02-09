import { motion } from "motion/react";
import { LayoutDashboardIcon, TrendingUpIcon, UsersIcon, ZapIcon } from "lucide-react";

const stats = [
  { label: "Total revenue", value: "$12,450", icon: TrendingUpIcon, color: "text-pink-400" },
  { label: "Active users", value: "2,847", icon: UsersIcon, color: "text-pink-400" },
  { label: "Tasks completed", value: "1,234", icon: ZapIcon, color: "text-pink-400" },
];

export function DashboardPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-2xl md:text-3xl font-semibold text-white flex items-center gap-2">
          <LayoutDashboardIcon className="size-8 text-pink-500" />
          Dashboard
        </h1>
        <p className="text-slate-400 mt-1">Welcome back. Here’s what’s happening.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="p-6 rounded-xl border border-slate-800 bg-slate-950/50 hover:border-pink-900/50 transition"
          >
            <stat.icon className={`size-8 ${stat.color} mb-3`} />
            <p className="text-slate-400 text-sm">{stat.label}</p>
            <p className="text-2xl font-semibold text-white mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="rounded-xl border border-slate-800 bg-slate-950/50 p-8"
      >
        <h2 className="text-lg font-medium text-white mb-4">Quick actions</h2>
        <p className="text-slate-400 text-sm">
          This is your dashboard. Add charts, tables, and more from here. The layout and styling match your app’s pink/slate theme.
        </p>
      </motion.div>
    </div>
  );
}

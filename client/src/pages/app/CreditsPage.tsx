import { motion } from "motion/react";
import { CoinsIcon, PlusIcon, TrendingUpIcon, TrendingDownIcon, CalendarIcon } from "lucide-react";

export function CreditsPage() {
  const currentCredits = 2450;
  
  const creditHistory = [
    { id: 1, type: "purchase", amount: 1000, balance: 2450, date: "2024-02-10", time: "14:30", description: "Credit purchase via Stripe" },
    { id: 2, type: "usage", amount: -50, balance: 1450, date: "2024-02-09", time: "11:20", description: "SMS verification service" },
    { id: 3, type: "usage", amount: -25, balance: 1500, date: "2024-02-08", time: "16:45", description: "Bulk SMS campaign" },
    { id: 4, type: "purchase", amount: 500, balance: 1525, date: "2024-02-07", time: "09:15", description: "Credit purchase via PayPal" },
    { id: 5, type: "usage", amount: -100, balance: 1025, date: "2024-02-06", time: "13:50", description: "Premium number verification" },
    { id: 6, type: "bonus", amount: 200, balance: 1125, date: "2024-02-05", time: "10:00", description: "Referral bonus" },
    { id: 7, type: "usage", amount: -75, balance: 925, date: "2024-02-04", time: "15:30", description: "International SMS" },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Credits</h1>
        <p className="text-gray-400">Manage your credit balance and view transaction history</p>
      </motion.div>

      {/* Current Balance Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.15] to-pink-600/[0.1] rounded-2xl blur-xl" />
        <div className="relative p-8 border border-white/[0.08] rounded-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-600/[0.08] to-pink-600/[0.05]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-pink-500 rounded-2xl blur-lg opacity-50" />
                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 shadow-2xl">
                  <img 
                    src="https://cdn-icons-png.flaticon.com/128/3135/3135706.png" 
                    alt="Credits"
                    className="w-12 h-12"
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Current Balance</p>
                <div className="flex items-baseline gap-2">
                  <motion.h2 
                    className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent"
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    {currentCredits.toLocaleString()}
                  </motion.h2>
                  <span className="text-xl text-gray-400">credits</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">≈ ${(currentCredits * 0.01).toFixed(2)} USD</p>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl text-white font-semibold shadow-xl">
                <PlusIcon className="w-5 h-5" />
                Buy Credits
              </div>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Credit History Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl" />
        <div className="relative border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
          {/* Table Header */}
          <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-indigo-600/[0.05] to-pink-600/[0.05]">
            <h2 className="text-xl font-bold text-white">Transaction History</h2>
            <p className="text-xs text-gray-400 mt-1">All credit changes in chronological order</p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.08] bg-white/[0.02]">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Date & Time</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-gray-400">Description</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Amount</th>
                  <th className="text-right py-4 px-6 text-sm font-semibold text-gray-400">Balance</th>
                </tr>
              </thead>
              <tbody>
                {creditHistory.map((transaction, index) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="w-4 h-4 text-gray-500" />
                        <div>
                          <p className="text-sm text-white font-medium">{transaction.date}</p>
                          <p className="text-xs text-gray-500">{transaction.time}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          transaction.type === "purchase" 
                            ? "bg-green-600/20 border border-green-600/30" 
                            : transaction.type === "bonus"
                            ? "bg-purple-600/20 border border-purple-600/30"
                            : "bg-red-600/20 border border-red-600/30"
                        }`}>
                          {transaction.type === "purchase" || transaction.type === "bonus" ? (
                            <TrendingUpIcon className={`w-4 h-4 ${
                              transaction.type === "purchase" ? "text-green-400" : "text-purple-400"
                            }`} />
                          ) : (
                            <TrendingDownIcon className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm text-white">{transaction.description}</p>
                          <p className="text-xs text-gray-500 capitalize">{transaction.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`text-sm font-semibold ${
                        transaction.amount > 0 ? "text-green-400" : "text-red-400"
                      }`}>
                        {transaction.amount > 0 ? "+" : ""}{transaction.amount}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="text-sm font-medium text-white">{transaction.balance.toLocaleString()}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { motion } from "motion/react";
import { ShieldCheckIcon, PlusIcon, PhoneIcon, CalendarIcon, CheckCircleIcon, ClockIcon } from "lucide-react";

export function VerificationPage() {
  const verifiedNumbers = [
    { 
      id: 1, 
      number: "+1 (555) 123-4567", 
      country: "United States",
      flag: "https://flagcdn.com/w80/us.png",
      purchaseDate: "2024-02-10", 
      status: "active",
      expiryDate: "2024-03-10",
      cost: 50
    },
    { 
      id: 2, 
      number: "+44 20 7946 0958", 
      country: "United Kingdom",
      flag: "https://flagcdn.com/w80/gb.png",
      purchaseDate: "2024-02-08", 
      status: "active",
      expiryDate: "2024-03-08",
      cost: 50
    },
    { 
      id: 3, 
      number: "+49 30 12345678", 
      country: "Germany",
      flag: "https://flagcdn.com/w80/de.png",
      purchaseDate: "2024-02-05", 
      status: "expired",
      expiryDate: "2024-02-20",
      cost: 50
    },
    { 
      id: 4, 
      number: "+33 1 23 45 67 89", 
      country: "France",
      flag: "https://flagcdn.com/w80/fr.png",
      purchaseDate: "2024-02-01", 
      status: "active",
      expiryDate: "2024-03-01",
      cost: 50
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Verification</h1>
          <p className="text-gray-400">Purchase and manage phone number verifications</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl text-white font-semibold shadow-xl">
            <PlusIcon className="w-5 h-5" />
            Buy New Verification
          </div>
        </motion.button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/[0.1] to-emerald-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative p-6 border border-white/[0.08] rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                <ShieldCheckIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Numbers</p>
                <p className="text-2xl font-bold text-white">3</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.1] to-cyan-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative p-6 border border-white/[0.08] rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <PhoneIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Purchased</p>
                <p className="text-2xl font-bold text-white">4</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/[0.1] to-pink-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative p-6 border border-white/[0.08] rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg">
                <img 
                  src="https://cdn-icons-png.flaticon.com/128/3135/3135706.png" 
                  alt="Credits"
                  className="w-6 h-6"
                />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Spent</p>
                <p className="text-2xl font-bold text-white">200</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Verification History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl" />
        <div className="relative border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-green-600/[0.05] to-emerald-600/[0.05]">
            <h2 className="text-xl font-bold text-white">Purchase History</h2>
            <p className="text-xs text-gray-400 mt-1">All verified phone numbers</p>
          </div>

          {/* Numbers Grid */}
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {verifiedNumbers.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-5 border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all bg-[#06080f]/50 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.flag} 
                        alt={item.country}
                        className="w-10 h-10 rounded-lg object-cover border border-white/[0.1]"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.number}</p>
                        <p className="text-xs text-gray-500">{item.country}</p>
                      </div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "active" 
                        ? "bg-green-600/20 text-green-400 border border-green-600/30" 
                        : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
                    }`}>
                      {item.status === "active" ? (
                        <div className="flex items-center gap-1">
                          <CheckCircleIcon className="w-3 h-3" />
                          Active
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          Expired
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="w-3 h-3" />
                        Purchased
                      </span>
                      <span className="text-white">{item.purchaseDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400">
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        Expires
                      </span>
                      <span className="text-white">{item.expiryDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-400 pt-2 border-t border-white/[0.06]">
                      <span>Cost</span>
                      <span className="text-indigo-400 font-semibold">{item.cost} credits</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

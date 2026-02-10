import { motion } from "motion/react";
import { InboxIcon, ActivityIcon, MessageSquareIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from "lucide-react";

export function OverviewPage() {
  const smsEvents = [
    { 
      id: 1, 
      type: "received", 
      from: "+1 (555) 123-4567", 
      message: "Your verification code is 123456", 
      time: "2 minutes ago",
      status: "delivered"
    },
    { 
      id: 2, 
      type: "sent", 
      to: "+1 (555) 987-6543", 
      message: "Welcome to our service! Your account has been created.", 
      time: "15 minutes ago",
      status: "delivered"
    },
    { 
      id: 3, 
      type: "received", 
      from: "+1 (555) 456-7890", 
      message: "Thank you for your order #12345", 
      time: "1 hour ago",
      status: "delivered"
    },
    { 
      id: 4, 
      type: "sent", 
      to: "+1 (555) 321-0987", 
      message: "Your package has been shipped!", 
      time: "2 hours ago",
      status: "failed"
    },
    { 
      id: 5, 
      type: "received", 
      from: "+1 (555) 111-2222", 
      message: "Reminder: Your appointment is tomorrow at 3 PM", 
      time: "3 hours ago",
      status: "delivered"
    },
  ];

  const accountActivities = [
    { 
      id: 1, 
      action: "Credit Purchase", 
      description: "Purchased 1000 credits", 
      amount: "+1000", 
      time: "1 hour ago",
      icon: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png"
    },
    { 
      id: 2, 
      action: "Number Verification", 
      description: "Verified +1 (555) 123-4567", 
      amount: "-50", 
      time: "3 hours ago",
      icon: "https://cdn-icons-png.flaticon.com/128/5290/5290058.png"
    },
    { 
      id: 3, 
      action: "SMS Sent", 
      description: "Sent 25 messages", 
      amount: "-25", 
      time: "5 hours ago",
      icon: "https://cdn-icons-png.flaticon.com/128/2983/2983788.png"
    },
    { 
      id: 4, 
      action: "Profile Updated", 
      description: "Changed account settings", 
      amount: "", 
      time: "1 day ago",
      icon: "https://cdn-icons-png.flaticon.com/128/3524/3524659.png"
    },
    { 
      id: 5, 
      action: "Credit Purchase", 
      description: "Purchased 500 credits", 
      amount: "+500", 
      time: "2 days ago",
      icon: "https://cdn-icons-png.flaticon.com/128/3135/3135706.png"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-white mb-2">Overview</h1>
        <p className="text-gray-400">Monitor your SMS events and account activities</p>
      </motion.div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inbox */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.08] to-purple-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative h-[calc(100vh-16rem)] flex flex-col border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-indigo-600/10 to-purple-600/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 shadow-lg">
                  <InboxIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Inbox</h2>
                  <p className="text-xs text-gray-400">SMS Events</p>
                </div>
              </div>
            </div>

            {/* SMS Events List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {smsEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-4 border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all bg-[#06080f]/50 backdrop-blur-sm">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        event.type === "received" 
                          ? "bg-green-600/20 border border-green-600/30" 
                          : "bg-blue-600/20 border border-blue-600/30"
                      }`}>
                        <MessageSquareIcon className={`w-4 h-4 ${
                          event.type === "received" ? "text-green-400" : "text-blue-400"
                        }`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="text-sm font-medium text-white truncate">
                            {event.type === "received" ? `From: ${event.from}` : `To: ${event.to}`}
                          </p>
                          {event.status === "delivered" ? (
                            <CheckCircleIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                          ) : (
                            <XCircleIcon className="w-4 h-4 text-red-400 flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mb-2 line-clamp-2">{event.message}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <ClockIcon className="w-3 h-3" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: Account Activities */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-pink-600/[0.08] to-orange-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative h-[calc(100vh-16rem)] flex flex-col border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-pink-600/10 to-orange-600/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-pink-500 to-orange-500 shadow-lg">
                  <ActivityIcon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">Account Activities</h2>
                  <p className="text-xs text-gray-400">Recent Actions</p>
                </div>
              </div>
            </div>

            {/* Activities List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {accountActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative p-4 border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all bg-[#06080f]/50 backdrop-blur-sm">
                    <div className="flex items-center gap-4">
                      <img 
                        src={activity.icon} 
                        alt={activity.action}
                        className="w-10 h-10 rounded-lg p-2 bg-white/[0.05] border border-white/[0.08]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white mb-0.5">{activity.action}</p>
                        <p className="text-xs text-gray-400 truncate">{activity.description}</p>
                        <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                          <ClockIcon className="w-3 h-3" />
                          {activity.time}
                        </div>
                      </div>
                      {activity.amount && (
                        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          activity.amount.startsWith("+") 
                            ? "bg-green-600/20 text-green-400 border border-green-600/30" 
                            : "bg-red-600/20 text-red-400 border border-red-600/30"
                        }`}>
                          {activity.amount}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

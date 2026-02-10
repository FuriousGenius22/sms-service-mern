import { motion } from "motion/react";
import { useState } from "react";
import { HeadphonesIcon, PlusIcon, PaperclipIcon, SendIcon, CheckCircleIcon, ClockIcon, MessageSquareIcon, XIcon } from "lucide-react";

export function SupportPage() {
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);

  const tickets = [
    { 
      id: 1, 
      subject: "Cannot receive SMS verification codes", 
      status: "open",
      priority: "high",
      created: "2024-02-10 14:30",
      lastUpdate: "2024-02-10 15:45",
      messages: 3
    },
    { 
      id: 2, 
      subject: "Credit purchase failed", 
      status: "in-progress",
      priority: "medium",
      created: "2024-02-09 11:20",
      lastUpdate: "2024-02-09 16:30",
      messages: 5
    },
    { 
      id: 3, 
      subject: "How to integrate API?", 
      status: "resolved",
      priority: "low",
      created: "2024-02-08 09:15",
      lastUpdate: "2024-02-08 18:00",
      messages: 8
    },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAttachments(Array.from(e.target.files));
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle ticket submission
    console.log({ subject, message, attachments });
    setShowNewTicket(false);
    setSubject("");
    setMessage("");
    setAttachments([]);
  };

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
          <h1 className="text-3xl font-bold text-white mb-2">Support</h1>
          <p className="text-gray-400">Get help from our support team</p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowNewTicket(true)}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
          <div className="relative flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold shadow-xl">
            <PlusIcon className="w-5 h-5" />
            Create New Ticket
          </div>
        </motion.button>
      </motion.div>

      {/* New Ticket Modal */}
      {showNewTicket && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowNewTicket(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/[0.1] to-cyan-600/[0.05] rounded-2xl blur-xl" />
            <div className="relative bg-[#06080f] border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
              {/* Modal Header */}
              <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-blue-600/[0.08] to-cyan-600/[0.05]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                      <HeadphonesIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">Create Support Ticket</h2>
                      <p className="text-xs text-gray-400">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowNewTicket(false)}
                    className="p-2 hover:bg-white/[0.05] rounded-lg transition-colors"
                  >
                    <XIcon className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                {/* Subject */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Subject *</label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of your issue"
                    required
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Message *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your issue in detail..."
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none"
                  />
                </div>

                {/* File Attachments */}
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Attachments (Optional)</label>
                  <div className="relative">
                    <input
                      type="file"
                      multiple
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileChange}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-white/[0.03] border border-white/[0.08] border-dashed rounded-xl text-gray-400 hover:text-white hover:border-white/[0.12] transition-all cursor-pointer"
                    >
                      <PaperclipIcon className="w-5 h-5" />
                      <span className="text-sm">Click to attach files (images, PDF, documents)</span>
                    </label>
                  </div>

                  {/* Attachment Preview */}
                  {attachments.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {attachments.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-white/[0.03] border border-white/[0.08] rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt={file.name}
                                className="w-10 h-10 rounded object-cover"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded bg-blue-600/20 border border-blue-600/30 flex items-center justify-center">
                                <PaperclipIcon className="w-5 h-5 text-blue-400" />
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-white truncate max-w-xs">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeAttachment(index)}
                            className="p-1.5 hover:bg-red-600/20 rounded-lg transition-colors"
                          >
                            <XIcon className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowNewTicket(false)}
                    className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-white hover:bg-white/[0.05] transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl text-white font-semibold hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg"
                  >
                    <SendIcon className="w-5 h-5" />
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Support Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600/[0.1] to-red-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative p-6 border border-white/[0.08] rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <ClockIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Open Tickets</p>
                <p className="text-2xl font-bold text-white">1</p>
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
                <MessageSquareIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">In Progress</p>
                <p className="text-2xl font-bold text-white">1</p>
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
          <div className="absolute inset-0 bg-gradient-to-br from-green-600/[0.1] to-emerald-600/[0.05] rounded-2xl blur-xl" />
          <div className="relative p-6 border border-white/[0.08] rounded-2xl backdrop-blur-xl">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 shadow-lg">
                <CheckCircleIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Resolved</p>
                <p className="text-2xl font-bold text-white">1</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tickets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl" />
        <div className="relative border border-white/[0.08] rounded-2xl backdrop-blur-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/[0.08] bg-gradient-to-r from-blue-600/[0.05] to-cyan-600/[0.05]">
            <h2 className="text-xl font-bold text-white">Your Tickets</h2>
            <p className="text-xs text-gray-400 mt-1">Track all your support requests</p>
          </div>

          {/* Tickets */}
          <div className="p-6 space-y-4">
            {tickets.map((ticket, index) => (
              <motion.div
                key={ticket.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative p-5 border border-white/[0.06] rounded-xl hover:border-white/[0.12] transition-all bg-[#06080f]/50 backdrop-blur-sm">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-base font-semibold text-white mb-1">{ticket.subject}</h3>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span>Ticket #{ticket.id}</span>
                        <span>•</span>
                        <span>Created: {ticket.created}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.status === "open" 
                          ? "bg-orange-600/20 text-orange-400 border border-orange-600/30"
                          : ticket.status === "in-progress"
                          ? "bg-blue-600/20 text-blue-400 border border-blue-600/30"
                          : "bg-green-600/20 text-green-400 border border-green-600/30"
                      }`}>
                        {ticket.status === "in-progress" ? "In Progress" : ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        ticket.priority === "high" 
                          ? "bg-red-600/20 text-red-400 border border-red-600/30"
                          : ticket.priority === "medium"
                          ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                          : "bg-gray-600/20 text-gray-400 border border-gray-600/30"
                      }`}>
                        {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                    <div className="flex items-center gap-4 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <MessageSquareIcon className="w-3 h-3" />
                        {ticket.messages} messages
                      </span>
                      <span className="flex items-center gap-1">
                        <ClockIcon className="w-3 h-3" />
                        Updated: {ticket.lastUpdate}
                      </span>
                    </div>
                    <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Help Resources */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/[0.08] to-pink-600/[0.05] rounded-2xl blur-xl" />
        <div className="relative p-6 border border-white/[0.08] rounded-2xl backdrop-blur-xl">
          <div className="flex items-center gap-3 mb-4">
            <img 
              src="https://cdn-icons-png.flaticon.com/128/2991/2991148.png" 
              alt="Help"
              className="w-10 h-10"
            />
            <div>
              <h3 className="text-lg font-bold text-white">Need Quick Help?</h3>
              <p className="text-xs text-gray-400">Check out our resources</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <a href="#" className="p-4 rounded-xl border border-white/[0.08] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center group">
              <img 
                src="https://cdn-icons-png.flaticon.com/128/2991/2991235.png" 
                alt="Documentation"
                className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <p className="text-sm font-medium text-white">Documentation</p>
            </a>
            <a href="#" className="p-4 rounded-xl border border-white/[0.08] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center group">
              <img 
                src="https://cdn-icons-png.flaticon.com/128/2991/2991148.png" 
                alt="FAQ"
                className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <p className="text-sm font-medium text-white">FAQ</p>
            </a>
            <a href="#" className="p-4 rounded-xl border border-white/[0.08] hover:border-white/[0.12] bg-white/[0.02] hover:bg-white/[0.05] transition-all text-center group">
              <img 
                src="https://cdn-icons-png.flaticon.com/128/3524/3524659.png" 
                alt="Community"
                className="w-8 h-8 mx-auto mb-2 group-hover:scale-110 transition-transform"
              />
              <p className="text-sm font-medium text-white">Community</p>
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

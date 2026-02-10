import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-20 overflow-hidden">
      {/* Ambient background gradients */}
      <div className="absolute top-[-20%] left-[10%] w-[500px] h-[500px] bg-indigo-600/[0.15] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[15%] w-[400px] h-[400px] bg-cyan-600/[0.08] rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[30%] right-[5%] w-[300px] h-[300px] bg-violet-600/[0.08] rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] text-xs text-gray-400 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Trusted by 10,000+ developers worldwide
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold tracking-tight leading-[1.1]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Phone Verification{" "}
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent">
                Made Simple
              </span>
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-gray-400 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Rent virtual phone numbers from 50+ countries. Send and receive
              SMS for verification and testing — no hardware needed, just a
              simple API call.
            </motion.p>

            <motion.div
              className="flex flex-wrap items-center gap-4 mt-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Link
                to={ROUTES.REGISTER}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-200"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#features"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-white/[0.1] hover:border-white/[0.2] text-gray-300 hover:text-white font-medium text-sm transition-all duration-200"
              >
                View Documentation
              </a>
            </motion.div>

            {/* Stats row */}
            <motion.div
              className="flex items-center gap-8 mt-12 pt-8 border-t border-white/[0.06]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <div>
                <p className="text-2xl font-bold text-white">50+</p>
                <p className="text-xs text-gray-500 mt-0.5">Countries</p>
              </div>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div>
                <p className="text-2xl font-bold text-white">99.9%</p>
                <p className="text-xs text-gray-500 mt-0.5">Uptime</p>
              </div>
              <div className="w-px h-8 bg-white/[0.06]" />
              <div>
                <p className="text-2xl font-bold text-white">&lt;5s</p>
                <p className="text-xs text-gray-500 mt-0.5">Delivery</p>
              </div>
            </motion.div>
          </div>

          {/* Right: API Preview Terminal */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            <div className="rounded-xl border border-white/[0.08] bg-[#0d1117] overflow-hidden shadow-2xl">
              {/* Terminal tab bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0d1117]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-[11px] text-gray-500 ml-2 font-mono">
                  api-request.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-[13px] leading-6 overflow-x-auto">
                <div>
                  <span className="text-emerald-400">$</span>{" "}
                  <span className="text-gray-300">curl</span>{" "}
                  <span className="text-cyan-400">-X POST</span>{" "}
                  <span className="text-yellow-200/80">
                    https://api.verify.dev/v1/send
                  </span>{" "}
                  <span className="text-gray-600">\</span>
                </div>
                <div className="text-gray-400 pl-4">
                  -H{" "}
                  <span className="text-orange-300/80">
                    "Authorization: Bearer sk_live_..."
                  </span>{" "}
                  <span className="text-gray-600">\</span>
                </div>
                <div className="text-gray-400 pl-4">
                  -d{" "}
                  <span className="text-orange-300/80">
                    {"'"}
                    {`{"phone": "+1 555 012 3456"}`}
                    {"'"}
                  </span>
                </div>

                <div className="mt-5 mb-2 text-gray-600 text-[12px]">
                  {"── Response ──────────────────────"}
                </div>
                <div className="text-gray-400">{"{"}</div>
                <div className="pl-4">
                  <span className="text-indigo-400">"id"</span>
                  <span className="text-gray-600">: </span>
                  <span className="text-emerald-400/90">"ver_9xK2mP7qLn"</span>
                  <span className="text-gray-600">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">"code"</span>
                  <span className="text-gray-600">: </span>
                  <span className="text-emerald-400/90">"482901"</span>
                  <span className="text-gray-600">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">"status"</span>
                  <span className="text-gray-600">: </span>
                  <span className="text-emerald-400/90">"delivered"</span>
                  <span className="text-gray-600">,</span>
                </div>
                <div className="pl-4">
                  <span className="text-indigo-400">"expires_at"</span>
                  <span className="text-gray-600">: </span>
                  <span className="text-emerald-400/90">
                    "2026-02-10T14:30:00Z"
                  </span>
                </div>
                <div className="text-gray-400">{"}"}</div>
              </div>
            </div>

            {/* Glow behind terminal */}
            <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-cyan-500/[0.08] blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

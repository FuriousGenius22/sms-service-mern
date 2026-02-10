import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ROUTES } from "@/constants/routes";

export default function CTASection() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-indigo-500/[0.08] via-transparent to-cyan-500/[0.05] overflow-hidden p-12 md:p-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Background glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-indigo-500/[0.15] blur-[100px] rounded-full pointer-events-none" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Ready to get started?
            </h2>
            <p className="mt-4 text-gray-400 text-lg max-w-lg mx-auto">
              Join thousands of developers using our platform for phone
              verification. Start free — no credit card required.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
              <Link
                to={ROUTES.REGISTER}
                className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors duration-200"
              >
                Create Free Account
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg border border-white/[0.1] hover:border-white/[0.2] text-gray-300 hover:text-white font-medium transition-all duration-200"
              >
                View Pricing
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

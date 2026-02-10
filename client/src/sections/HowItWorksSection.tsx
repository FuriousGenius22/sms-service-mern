import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Choose a Number",
    description:
      "Select a virtual phone number from our inventory spanning 50+ countries. Numbers are provisioned instantly.",
  },
  {
    number: "02",
    title: "Send Verification",
    description:
      "Use our REST API to send an SMS verification code to any phone number. One simple API call is all it takes.",
  },
  {
    number: "03",
    title: "Receive the Code",
    description:
      "Get the verification code delivered in real-time via webhooks, or retrieve it with a simple API poll.",
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-indigo-400 tracking-wide uppercase">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Three steps to verify any number
          </h2>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[2.25rem] left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-indigo-500/20 via-indigo-500/10 to-indigo-500/20" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="inline-flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-2xl border border-indigo-500/20 bg-indigo-500/[0.07] text-indigo-400 text-lg font-bold mb-6 relative z-10">
                {step.number}
              </div>
              <h3 className="text-lg font-semibold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

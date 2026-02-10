import { motion } from "motion/react";
import { CheckIcon } from "lucide-react";
import { pricingData } from "../data/pricing";
import { Link } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import type { IPricing } from "../types";

export default function PricingSection() {
  return (
    <section id="pricing" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-indigo-400 tracking-wide uppercase">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            Start free, scale as you grow. No hidden fees.
          </p>
        </motion.div>

        <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingData.map((plan: IPricing, index: number) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-xl p-6 flex flex-col ${
                plan.mostPopular
                  ? "border-2 border-indigo-500/50 bg-indigo-500/[0.05]"
                  : "border border-white/[0.06] bg-white/[0.02]"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {plan.mostPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-indigo-500 text-white text-xs font-medium">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white">
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-1 text-sm text-gray-500">
                    {plan.description}
                  </p>
                )}
              </div>

              <div className="mb-6">
                {plan.price === 0 ? (
                  <p className="text-4xl font-bold text-white">Custom</p>
                ) : (
                  <p className="text-4xl font-bold text-white">
                    ${plan.price}
                    <span className="text-base font-normal text-gray-500">
                      /{plan.period}
                    </span>
                  </p>
                )}
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-300"
                  >
                    <CheckIcon className="w-4 h-4 text-indigo-400 mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                to={plan.price === 0 ? "#" : ROUTES.REGISTER}
                className={`block text-center py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  plan.mostPopular
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white"
                    : "border border-white/[0.1] hover:border-white/[0.2] text-gray-300 hover:text-white"
                }`}
              >
                {plan.price === 0 ? "Contact Sales" : "Get Started"}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

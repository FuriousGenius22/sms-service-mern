import { motion } from "motion/react";
import {
  Globe,
  Zap,
  Code2,
  Shield,
  CreditCard,
  Clock,
} from "lucide-react";
import { useT } from "@/hooks/useT";

export default function FeaturesSection() {
  const t = useT();
  
  const features = [
    {
      icon: Globe,
      title: t.features.globalCoverage,
      description: t.features.globalCoverageDesc,
    },
    {
      icon: Zap,
      title: t.features.instantActivation,
      description: t.features.instantActivationDesc,
    },
    {
      icon: Code2,
      title: t.features.developerApi,
      description: t.features.developerApiDesc,
    },
    {
      icon: Shield,
      title: t.features.enterpriseSecurity,
      description: t.features.enterpriseSecurityDesc,
    },
    {
      icon: CreditCard,
      title: t.features.payAsYouGo,
      description: t.features.payAsYouGoDesc,
    },
    {
      icon: Clock,
      title: t.features.realTimeDelivery,
      description: t.features.realTimeDeliveryDesc,
    },
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-indigo-400 tracking-wide uppercase">
            {t.features.title}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            {t.features.subtitle}
          </h2>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            {t.features.description}
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                className="group relative p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h3 className="font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  );
}

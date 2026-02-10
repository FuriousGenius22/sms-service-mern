import { motion } from "motion/react";
import { testimonialsData } from "../data/testimonial";
import { Star } from "lucide-react";
import { useT } from "@/hooks/useT";

export default function TestimonialSection() {
  const t = useT();
  
  return (
    <section id="testimonials" className="py-24 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-indigo-400 tracking-wide uppercase">
            {t.testimonials.title}
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
            {t.testimonials.subtitle}
          </h2>
          <p className="mt-4 text-gray-400 text-lg">
            {t.testimonials.description}
          </p>
        </motion.div>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonialsData.map((testimonial, index) => (
            <motion.div
              key={index}
              className="p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] flex flex-col"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              <p className="text-sm text-gray-300 leading-relaxed flex-1 mb-5">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.06]">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-9 h-9 rounded-full object-cover"
                  width={36}
                  height={36}
                />
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

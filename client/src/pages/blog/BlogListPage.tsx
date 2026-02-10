import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { blogPosts, blogCategories } from "@/data/blog";

export function BlogListPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-medium text-indigo-400 tracking-wide uppercase">
            Blog
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            Insights & Guides
          </h1>
          <p className="mt-4 text-gray-400 text-lg leading-relaxed">
            Deep dives into phone verification, SMS APIs, security best
            practices, and industry trends.
          </p>
        </motion.div>

        {/* Category filter */}
        <motion.div
          className="flex flex-wrap gap-2 mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {blogCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-colors duration-200 ${
                activeCategory === cat
                  ? "bg-indigo-600 text-white"
                  : "border border-white/[0.08] text-gray-400 hover:text-white hover:border-white/[0.15]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Post grid */}
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, index) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
            >
              <Link
                to={`/blog/${post.slug}`}
                className="group block h-full p-6 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
              >
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                  <span className="px-2 py-0.5 rounded-full border border-indigo-500/30 text-indigo-400 text-[11px] font-medium">
                    {post.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>

                <h2 className="text-lg font-semibold text-white leading-snug group-hover:text-indigo-300 transition-colors duration-200">
                  {post.title}
                </h2>

                <p className="mt-3 text-sm text-gray-400 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/[0.06]">
                  <span className="flex items-center gap-1 text-xs text-gray-500">
                    <Clock className="w-3 h-3" />
                    {post.readingTime}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-indigo-400 group-hover:gap-2 transition-all duration-200">
                    Read
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

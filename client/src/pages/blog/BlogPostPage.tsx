import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blog";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, excluding current)
  const related = blogPosts
    .filter((p) => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  return (
    <div className="pt-28 pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-10"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Article */}
        <article className="max-w-3xl">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-6">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-indigo-500/30 text-indigo-400 text-xs font-medium">
                <Tag className="w-3 h-3" />
                {post.category}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-[2.75rem] font-bold tracking-tight leading-tight">
              {post.title}
            </h1>

            <p className="mt-5 text-lg text-gray-400 leading-relaxed">
              {post.excerpt}
            </p>

            <div className="mt-8 h-px bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent" />
          </motion.header>

          {/* Content */}
          <motion.div
            className="mt-10 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            {post.content.map((section, i) => (
              <div key={i}>
                {section.heading && (
                  <h2 className="text-xl sm:text-2xl font-semibold text-white mb-4 mt-2">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((p, j) => (
                  <p
                    key={j}
                    className="text-gray-300 leading-[1.8] text-[15px] mb-4 last:mb-0"
                  >
                    {p}
                  </p>
                ))}
              </div>
            ))}
          </motion.div>
        </article>

        {/* Related posts */}
        {related.length > 0 && (
          <motion.div
            className="mt-20 pt-12 border-t border-white/[0.06]"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-semibold text-white mb-8">
              Related Articles
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((relPost) => (
                <Link
                  key={relPost.slug}
                  to={`/blog/${relPost.slug}`}
                  className="group block p-5 rounded-xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300"
                >
                  <span className="text-xs text-indigo-400 font-medium">
                    {relPost.category}
                  </span>
                  <h4 className="mt-2 font-semibold text-white group-hover:text-indigo-300 transition-colors leading-snug">
                    {relPost.title}
                  </h4>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {relPost.excerpt}
                  </p>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

export function BlogPage() {
  const blogPosts = [
    {
      slug: "what-is-phone-verification-and-why-it-matters",
      title: "What Is Phone Verification and Why It Matters",
      excerpt: "Phone verification is one of the most reliable methods to confirm user identity online. Learn how it works and why businesses rely on it.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=500&fit=crop",
      author: "Sarah Johnson",
      date: "Feb 8, 2024",
      readTime: "5 min read",
      category: "Guides"
    },
    {
      slug: "how-sms-otp-verification-works-complete-guide",
      title: "How SMS OTP Verification Works: A Complete Guide",
      excerpt: "A deep dive into the OTP verification flow — from code generation to delivery, validation, and expiry. Everything developers need to know.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=500&fit=crop",
      author: "Michael Chen",
      date: "Feb 6, 2024",
      readTime: "7 min read",
      category: "Engineering"
    },
    {
      slug: "virtual-phone-numbers-everything-you-need-to-know",
      title: "Virtual Phone Numbers: Everything You Need to Know",
      excerpt: "Virtual phone numbers enable businesses to send and receive SMS without physical SIM cards. Here is how they work and when to use them.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop",
      author: "Emily Rodriguez",
      date: "Feb 4, 2024",
      readTime: "6 min read",
      category: "Guides"
    },
    {
      slug: "building-two-factor-authentication-with-sms-api",
      title: "Building Two-Factor Authentication with SMS API",
      excerpt: "Step-by-step guide to adding SMS-based two-factor authentication to your application using a REST API.",
      image: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=500&fit=crop",
      author: "David Park",
      date: "Feb 1, 2024",
      readTime: "8 min read",
      category: "Engineering"
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Blog</h1>
          <p className="text-sm sm:text-base text-gray-400">Read our latest articles and updates</p>
        </div>
        <Link
          to="/blog"
          className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors self-start sm:self-auto"
        >
          View All Posts
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Link
              to={`/blog/${post.slug}`}
              className="relative block border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all bg-[#06080f]/50 backdrop-blur-sm"
            >
              {/* Image */}
              <div className="relative h-40 sm:h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/50 to-transparent" />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4">
                  <span className="px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/80 text-white backdrop-blur-sm border border-white/[0.1]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mb-3 sm:mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2 sm:gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      <span className="hidden sm:inline">{post.author}</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <CalendarIcon className="w-3 h-3" />
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ClockIcon className="w-3 h-3" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/[0.15] to-pink-600/[0.1] rounded-2xl blur-xl" />
        <div className="relative p-6 sm:p-8 border border-white/[0.08] rounded-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-600/[0.08] to-pink-600/[0.05] text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Want to Read More?</h2>
          <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">Visit our main blog page for all articles and resources</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl text-white text-sm sm:text-base font-semibold hover:from-indigo-500 hover:to-pink-500 transition-all shadow-lg"
          >
            Go to Blog
            <ArrowRightIcon className="w-4 sm:w-5 h-4 sm:h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

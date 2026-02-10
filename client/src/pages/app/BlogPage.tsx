import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ArrowRightIcon, CalendarIcon, ClockIcon, UserIcon } from "lucide-react";

export function BlogPage() {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with SMS Verification",
      excerpt: "Learn how to implement SMS verification in your application with our comprehensive guide.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop",
      author: "John Doe",
      date: "Feb 10, 2024",
      readTime: "5 min read",
      category: "Tutorial"
    },
    {
      id: 2,
      title: "Best Practices for SMS Marketing",
      excerpt: "Discover the most effective strategies to engage your customers through SMS campaigns.",
      image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=400&fit=crop",
      author: "Jane Smith",
      date: "Feb 8, 2024",
      readTime: "7 min read",
      category: "Marketing"
    },
    {
      id: 3,
      title: "Understanding SMS API Integration",
      excerpt: "A technical deep-dive into integrating our SMS API with your existing infrastructure.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
      author: "Mike Johnson",
      date: "Feb 5, 2024",
      readTime: "10 min read",
      category: "Development"
    },
    {
      id: 4,
      title: "Security Best Practices for SMS",
      excerpt: "Protect your users and your business with these essential SMS security guidelines.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=400&fit=crop",
      author: "Sarah Williams",
      date: "Feb 1, 2024",
      readTime: "6 min read",
      category: "Security"
    },
  ];

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
          <h1 className="text-3xl font-bold text-white mb-2">Blog</h1>
          <p className="text-gray-400">Read our latest articles and updates</p>
        </div>
        <Link
          to="/blog"
          className="flex items-center gap-2 px-4 py-2 text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          View All Posts
          <ArrowRightIcon className="w-4 h-4" />
        </Link>
      </motion.div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-white/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <Link
              to={`/blog/${post.id}`}
              className="relative block border border-white/[0.06] rounded-2xl overflow-hidden hover:border-white/[0.12] transition-all bg-[#06080f]/50 backdrop-blur-sm"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#06080f] via-[#06080f]/50 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-600/80 text-white backdrop-blur-sm border border-white/[0.1]">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-white/[0.06]">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <UserIcon className="w-3 h-3" />
                      {post.author}
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
        <div className="relative p-8 border border-white/[0.08] rounded-2xl backdrop-blur-xl bg-gradient-to-br from-indigo-600/[0.08] to-pink-600/[0.05] text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Want to Read More?</h2>
          <p className="text-gray-400 mb-6">Visit our main blog page for all articles and resources</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-pink-600 rounded-xl text-white font-semibold hover:from-indigo-500 hover:to-pink-500 transition-all shadow-lg"
          >
            Go to Blog
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

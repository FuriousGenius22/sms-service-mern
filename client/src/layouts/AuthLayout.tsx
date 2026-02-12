import { Outlet, Link } from "react-router-dom";
import { motion } from "motion/react";

export function AuthLayout() {
  return (
    <div className="relative h-screen flex overflow-hidden bg-[#06080f]">
      {/* Left Side - Image */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden">
        <img 
          src="/auth.jpg"
          alt="Authentication"
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Overlay gradient for better transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#06080f]/30" />
      </div>

      {/* Right Side - Auth Form */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-8 md:px-12 py-8 overflow-y-auto">
        {/* Ambient glow */}
        <div className="absolute top-[-10%] left-[20%] w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-indigo-600/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[20%] w-[200px] sm:w-[300px] h-[200px] sm:h-[300px] bg-cyan-600/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md lg:max-w-xl my-auto">
          {/* Logo */}
          <motion.div
            className="mb-8 sm:mb-10 lg:mb-12"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="inline-block">
              <img
                src="/logo/logo_colorful.png"
                alt="Logo"
                className="h-12 sm:h-14 lg:h-16 w-auto"
              />
            </Link>
          </motion.div>

          {/* Form - No Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <Outlet />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

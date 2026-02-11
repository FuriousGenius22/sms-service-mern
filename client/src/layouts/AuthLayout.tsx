import { Outlet, Link } from "react-router-dom";
import { motion } from "motion/react";

export function AuthLayout() {
  return (
    <div className="relative min-h-screen flex bg-[#06080f]">
      {/* Left Side - Video */}
      <div className="hidden lg:block relative w-1/2 overflow-hidden bg-black">
        {/* Full-screen video */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://videos.pexels.com/video-files/7579981/7579981-uhd_2560_1440_25fps.mp4" type="video/mp4" />
          <source src="https://videos.pexels.com/video-files/5473739/5473739-uhd_2560_1440_25fps.mp4" type="video/mp4" />
        </video>
        
        {/* Overlay gradient for better text readability on form side */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#06080f]/50" />
      </div>

      {/* Right Side - Auth Form */}
      <div className="relative w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        {/* Ambient glow */}
        <div className="absolute top-[-10%] left-[20%] w-[400px] h-[400px] bg-indigo-600/[0.12] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[20%] w-[300px] h-[300px] bg-cyan-600/[0.06] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 w-full max-w-md">
          {/* Logo */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link to="/" className="inline-block">
              <img
                src="/logo/logo_colorful.png"
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
          </motion.div>

          {/* Form Card */}
          <motion.div
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl p-8 shadow-xl"
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

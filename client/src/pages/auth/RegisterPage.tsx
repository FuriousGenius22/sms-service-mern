import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LockIcon,
  UserIcon,
  ArrowRightIcon,
  XIcon,
  MailIcon,
} from "lucide-react";
import { useState, useRef, useEffect, useCallback } from "react";
import { ROUTES } from "@/constants/routes";
import { authService } from "@/services/auth";

const OTP_LENGTH = 6;
const RESEND_COOLDOWN = 60;

export function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Modal
  const [showModal, setShowModal] = useState(false);
  const [otpDigits, setOtpDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [modalError, setModalError] = useState("");
  const [modalLoading, setModalLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  useEffect(() => {
    if (showModal) setTimeout(() => inputRefs.current[0]?.focus(), 180);
  }, [showModal]);

  const code = otpDigits.join("");

  const handleOtpChange = useCallback(
    (i: number, val: string) => {
      if (!/^\d*$/.test(val)) return;
      const next = [...otpDigits];
      if (val.length > 1) {
        const chars = val.replace(/\D/g, "").slice(0, OTP_LENGTH).split("");
        for (let j = 0; j < OTP_LENGTH; j++) next[j] = chars[j] || "";
        setOtpDigits(next);
        inputRefs.current[Math.min(chars.length, OTP_LENGTH - 1)]?.focus();
        return;
      }
      next[i] = val;
      setOtpDigits(next);
      if (val && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
    },
    [otpDigits]
  );

  const handleOtpKeyDown = useCallback(
    (i: number, e: React.KeyboardEvent) => {
      if (e.key === "Backspace" && !otpDigits[i] && i > 0) inputRefs.current[i - 1]?.focus();
    },
    [otpDigits]
  );

  // ── Submit form → send code → open modal ──
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authService.sendVerificationCode({ email: formData.email });
      setModalError("");
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setCooldown(RESEND_COOLDOWN);
      setShowModal(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ── Verify code + register ──
  const handleVerify = async () => {
    if (code.length !== OTP_LENGTH) { setModalError("Enter the full 6-digit code"); return; }
    setModalError("");
    setModalLoading(true);
    try {
      await authService.verifyEmailCode({ email: formData.email, code });
      await authService.register(formData);
      sessionStorage.removeItem("humanVerified");
      navigate("/verify-human");
    } catch (err: any) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setModalLoading(true);
    setModalError("");
    try {
      await authService.sendVerificationCode({ email: formData.email });
      setOtpDigits(Array(OTP_LENGTH).fill(""));
      setCooldown(RESEND_COOLDOWN);
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setModalError(err.message);
    } finally {
      setModalLoading(false);
    }
  };

  const closeModal = () => { if (!modalLoading) setShowModal(false); };

  return (
    <>
      {/* ── Page header ── */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-white">Create account</h1>
        <p className="text-gray-400 mt-1 text-sm">Get started with a free account today</p>
      </motion.div>

      {error && (
        <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>
      )}

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5 text-gray-300">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <label className="block text-sm font-medium mb-2">Full name</label>
          <div className="flex items-center pl-3 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-indigo-500/50 transition-colors">
            <UserIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <input type="text" placeholder="Your name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full px-3 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-600" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
          <label className="block text-sm font-medium mb-2">Email</label>
          <div className="flex items-center pl-3 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-indigo-500/50 transition-colors">
            <MailIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <input type="email" placeholder="you@example.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full px-3 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-600" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          <label className="block text-sm font-medium mb-2">Password</label>
          <div className="flex items-center pl-3 rounded-lg border border-white/[0.08] bg-white/[0.02] focus-within:border-indigo-500/50 transition-colors">
            <LockIcon className="w-4 h-4 text-gray-500 shrink-0" />
            <input type="password" placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required minLength={8} pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}" title="At least 8 characters, including uppercase, lowercase, and a number" className="w-full px-3 py-2.5 bg-transparent outline-none text-sm placeholder:text-gray-600" />
          </div>
          <p className="text-xs text-gray-600 mt-1.5">At least 8 characters, with uppercase, lowercase, and a number</p>
        </motion.div>

        <motion.button type="submit" disabled={loading} className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 disabled:cursor-not-allowed text-white py-2.5 rounded-lg font-medium text-sm transition-colors duration-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
          {loading ? "Sending code..." : "Create account"}
          {!loading && <ArrowRightIcon className="w-4 h-4" />}
        </motion.button>
      </form>

      <p className="text-center text-gray-500 text-sm mt-5 sm:mt-6">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors">Sign in</Link>
      </p>

      {/* ══════════════════ Verification Modal ══════════════════ */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closeModal} />

            {/* Card */}
            <motion.div
              className="relative w-full max-w-[400px] rounded-2xl bg-[#0c1020] border border-white/[0.06] shadow-[0_32px_64px_rgba(0,0,0,0.5)] overflow-hidden"
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            >
              {/* ── Gradient header ── */}
              <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 px-6 pt-6 pb-8 text-center overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 25% 25%, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

                {/* Close */}
                <button type="button" onClick={closeModal} disabled={modalLoading} className="absolute top-3 right-3 p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 disabled:opacity-50 transition-colors">
                  <XIcon className="w-4 h-4" />
                </button>

                {/* Company icon */}
                <div className="relative mx-auto w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center mb-4 shadow-lg">
                  <img src="/logo/icon_colorful.png" alt="TrustSMS" className="w-9 h-9 rounded-lg" />
                </div>

                <h2 className="relative text-xl font-bold text-white mb-1">Email verification</h2>
                <p className="relative text-sm text-white/70">
                  We sent a 6-digit code to<br />
                  <span className="text-white font-semibold">{formData.email}</span>
                </p>
              </div>

              {/* ── Body ── */}
              <div className="px-6 pt-6 pb-6">
                {/* Error */}
                <AnimatePresence mode="wait">
                  {modalError && (
                    <motion.div
                      key="err"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="mb-4 p-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
                    >
                      {modalError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* OTP label */}
                <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 text-center">Verification code</p>

                {/* OTP Boxes */}
                <div className="flex justify-center gap-2 mb-6">
                  {otpDigits.map((digit, i) => (
                    <input
                      key={i}
                      ref={(el) => { inputRefs.current[i] = el; }}
                      type="text"
                      inputMode="numeric"
                      maxLength={i === 0 ? OTP_LENGTH : 1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      onFocus={(e) => e.target.select()}
                      disabled={modalLoading}
                      className={`
                        w-12 h-14 text-center text-2xl font-bold rounded-xl outline-none
                        transition-all duration-200 disabled:opacity-40
                        ${digit
                          ? "bg-indigo-500/10 border-2 border-indigo-500/50 text-white shadow-[0_0_20px_rgba(99,102,241,0.12)]"
                          : "bg-white/[0.03] border-2 border-white/[0.08] text-gray-300"
                        }
                        focus:border-indigo-400 focus:bg-indigo-500/10 focus:shadow-[0_0_24px_rgba(99,102,241,0.2)]
                      `}
                    />
                  ))}
                </div>

                {/* Verify button */}
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={modalLoading || code.length !== OTP_LENGTH}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all duration-200 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-[length:200%_100%] hover:bg-right disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-indigo-500/20"
                >
                  {modalLoading ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Verifying...
                    </>
                  ) : "Verify & create account"}
                </button>

                {/* Resend */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    Didn&apos;t receive a code?{" "}
                    {cooldown > 0 ? (
                      <span className="text-gray-400">Resend in <span className="text-indigo-400 font-semibold tabular-nums">{cooldown}s</span></span>
                    ) : (
                      <button type="button" onClick={handleResend} disabled={modalLoading} className="text-indigo-400 hover:text-indigo-300 font-semibold disabled:opacity-50 transition-colors">
                        Resend code
                      </button>
                    )}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

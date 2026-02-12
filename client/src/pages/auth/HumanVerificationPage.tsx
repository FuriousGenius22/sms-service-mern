import { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ShieldCheckIcon,
  CheckCircleIcon,
  RefreshCwIcon,
  LoaderIcon,
  AlertCircleIcon,
} from "lucide-react";
import { API_URL } from "@/config";

export function HumanVerificationPage() {
  const navigate = useNavigate();
  const [captchaId, setCaptchaId] = useState("");
  const [captchaSvg, setCaptchaSvg] = useState("");
  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchCaptcha = useCallback(async () => {
    setLoading(true);
    setError("");
    setUserInput("");
    try {
      const res = await fetch(`${API_URL}/captcha/generate`);
      if (!res.ok) throw new Error("Failed to load CAPTCHA");
      const data = await res.json();
      setCaptchaId(data.captchaId);
      setCaptchaSvg(data.svg);
    } catch {
      setError("Could not load CAPTCHA. Please refresh.");
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, []);

  useEffect(() => {
    fetchCaptcha();
  }, [fetchCaptcha]);

  const handleVerify = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!userInput.trim() || verifying) return;

    setVerifying(true);
    setError("");

    try {
      const res = await fetch(`${API_URL}/captcha/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ captchaId, captchaText: userInput.trim() }),
      });

      const data = await res.json();

      if (data.verified) {
        setVerified(true);
        sessionStorage.setItem("humanVerified", "true");
        setTimeout(() => navigate("/app/overview"), 1200);
      } else {
        setAttempts((a) => a + 1);
        setError(data.message || "Incorrect CAPTCHA. Please try again.");
        // Auto-refresh on failure
        fetchCaptcha();
      }
    } catch {
      setError("Verification failed. Please try again.");
      fetchCaptcha();
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06080f] flex items-center justify-center p-4">
      {/* Ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[20%] left-[15%] w-[400px] h-[400px] bg-indigo-600/[0.06] rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[20%] w-[300px] h-[300px] bg-purple-600/[0.05] rounded-full blur-[100px]" />
      </div>

      <motion.div
        className="relative w-full max-w-[400px]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Card */}
        <div className="rounded-2xl border border-white/[0.08] bg-[#0c1020] shadow-2xl overflow-hidden">
          {/* Gradient top bar */}
          <div className="h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />

          {/* Header */}
          <div className="px-6 pt-6 pb-4 text-center">
            <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
              <ShieldCheckIcon className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-lg font-bold text-white mb-1">
              Security Verification
            </h2>
            <p className="text-sm text-gray-400">
              Enter the characters you see below
            </p>
          </div>

          {/* CAPTCHA display */}
          <div className="px-6">
            <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-[#0c1020] flex items-center justify-center min-h-[100px]">
              {loading ? (
                <div className="flex items-center gap-2 py-8 text-gray-500">
                  <LoaderIcon className="w-5 h-5 animate-spin" />
                  <span className="text-sm">Loading...</span>
                </div>
              ) : (
                <div
                  className="w-full flex items-center justify-center py-2"
                  dangerouslySetInnerHTML={{ __html: captchaSvg }}
                />
              )}

              {/* Refresh button */}
              {!loading && !verified && (
                <button
                  onClick={fetchCaptcha}
                  className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="Refresh CAPTCHA"
                  title="Load new CAPTCHA"
                >
                  <RefreshCwIcon className="w-4 h-4" />
                </button>
              )}

              {/* Verified overlay */}
              <AnimatePresence>
                {verified && (
                  <motion.div
                    className="absolute inset-0 bg-emerald-500/20 backdrop-blur-sm flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.4 }}
                    >
                      <CheckCircleIcon className="w-16 h-16 text-emerald-400" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Input + Submit */}
          <div className="px-6 pt-4 pb-6">
            {!verified ? (
              <form onSubmit={handleVerify} className="space-y-3">
                <div className="relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    placeholder="Type the characters above"
                    maxLength={8}
                    autoComplete="off"
                    spellCheck={false}
                    className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-center text-lg font-mono tracking-widest placeholder:text-gray-600 placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                    disabled={verifying || loading}
                  />
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="flex items-center gap-2 text-red-400 text-sm"
                    >
                      <AlertCircleIcon className="w-4 h-4 flex-shrink-0" />
                      <span>{error}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={verifying || loading || !userInput.trim()}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {verifying ? (
                    <>
                      <LoaderIcon className="w-4 h-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify"
                  )}
                </button>

                {attempts > 0 && (
                  <p className="text-xs text-gray-500 text-center">
                    {attempts} failed attempt{attempts > 1 ? "s" : ""}
                  </p>
                )}
              </form>
            ) : (
              <motion.div
                className="flex items-center justify-center gap-2 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <CheckCircleIcon className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-medium text-emerald-400">
                  Verified! Redirecting...
                </span>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-gray-600 mt-4">
          This verification protects against automated access.
        </p>
      </motion.div>
    </div>
  );
}

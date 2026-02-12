import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/auth";

const INACTIVITY_TIMEOUT_MS = 3 * 60 * 60 * 1000; // 3 hours
const HEARTBEAT_INTERVAL_MS = 5 * 60 * 1000; // send heartbeat every 5 min on activity

/**
 * Tracks user mouse/keyboard activity.
 * - Sends a heartbeat to the server periodically while the user is active.
 * - Auto-logs out and redirects to /login after 3 hours of inactivity.
 */
export function SessionActivityTracker() {
  const navigate = useNavigate();
  const lastActivityRef = useRef(Date.now());
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) return;

    const resetInactivityTimer = () => {
      lastActivityRef.current = Date.now();

      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
      inactivityTimerRef.current = setTimeout(async () => {
        await authService.logout();
        sessionStorage.removeItem("humanVerified");
        navigate("/login", { replace: true });
      }, INACTIVITY_TIMEOUT_MS);
    };

    // Activity events
    const onActivity = () => resetInactivityTimer();
    const events = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];
    events.forEach((evt) => window.addEventListener(evt, onActivity, { passive: true }));

    // Start inactivity timer
    resetInactivityTimer();

    // Heartbeat — ping server every 5 min if there was activity
    let lastHeartbeatAt = 0;
    heartbeatTimerRef.current = setInterval(() => {
      if (!authService.isAuthenticated()) return;
      const now = Date.now();
      // Only send if there has been activity since last heartbeat
      if (lastActivityRef.current > lastHeartbeatAt) {
        lastHeartbeatAt = now;
        authService.heartbeat();
      }
    }, HEARTBEAT_INTERVAL_MS);

    return () => {
      events.forEach((evt) => window.removeEventListener(evt, onActivity));
      if (heartbeatTimerRef.current) clearInterval(heartbeatTimerRef.current);
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [navigate]);

  return null;
}

import { Navigate, Outlet, useLocation } from "react-router-dom";
import { authService } from "@/services/auth";

/**
 * Route guard: only logged-in users can enter the main app.
 * - Not authenticated → redirect to /login
 * - Authenticated but not human-verified → redirect to /verify-human
 * - Otherwise → render app routes
 */
export function RequireHumanVerification() {
  const location = useLocation();
  const isAuthenticated = authService.isAuthenticated();
  const isHumanVerified = sessionStorage.getItem("humanVerified") === "true";

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (!isHumanVerified) {
    return <Navigate to="/verify-human" state={{ from: location }} replace />;
  }

  return <Outlet />;
}

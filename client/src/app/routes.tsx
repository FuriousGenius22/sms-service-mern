import { Route, Routes, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AuthLayout } from "@/layouts/AuthLayout";
import { AppLayout } from "@/layouts/AppLayout";
import HomePage from "@/pages/HomePage";
import { BlogListPage } from "@/pages/blog/BlogListPage";
import { BlogPostPage } from "@/pages/blog/BlogPostPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { OverviewPage } from "@/pages/app/OverviewPage";
import { VerificationPage } from "@/pages/app/VerificationPage";
import { CreditsPage } from "@/pages/app/CreditsPage";
import { SupportPage } from "@/pages/app/SupportPage";
import { BlogPage } from "@/pages/app/BlogPage";
import { BuyCreditPage } from "@/pages/app/BuyCreditPage";
import { ROUTES } from "@/constants/routes";

/**
 * Central route configuration. Add new routes here and create the corresponding page in pages/.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.BLOG} element={<BlogListPage />} />
        <Route path={ROUTES.BLOG_POST} element={<BlogPostPage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
        <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
      </Route>

      <Route path="/app" element={<AppLayout />}>
        <Route path="overview" element={<OverviewPage />} />
        <Route path="verification" element={<VerificationPage />} />
        <Route path="credits" element={<CreditsPage />} />
        <Route path="buy-credit" element={<BuyCreditPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="blog" element={<BlogPage />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}

import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LenisScroll } from "@/components/layout/LenisScroll";

export function MainLayout() {
  return (
    <>
      <LenisScroll />
      <Navbar />
      <main className="w-full min-w-0 overflow-x-hidden">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

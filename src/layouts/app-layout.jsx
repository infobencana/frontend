import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { scrollToTop } from "@/utils/helpers";

export default function AppLayout() {
  const { pathname } = useLocation();

  useEffect(() => {
    scrollToTop();
  }, [pathname]);

  return (
    <div className="w-full min-h-full h-auto flex flex-col gap">
      <Header />
      <main className="flex-1 w-full mt-24 mb-10 sm:mt-28 sm:mb-12 px-4 sm:px-5">
        <div className="w-full max-w-[1320px] 2xl:max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

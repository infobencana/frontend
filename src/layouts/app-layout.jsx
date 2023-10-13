import { Outlet } from "react-router-dom";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function AppLayout() {
  return (
    <div className="w-full min-h-full h-auto flex flex-col gap">
      <Header />
      <main className="flex-1 w-full mt-28 mb-12 px-5">
        <div className="w-full max-w-[1320px] 2xl:max-w-[1400px] mx-auto">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}

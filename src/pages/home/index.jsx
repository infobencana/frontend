import { useState } from "react";
import { DropdownFilterDisaster } from "@/components/dropdown/dropdown-filter-disaster";
import { DisasterPostCard } from "@/components/card/disaster-post-card";

export default function Home() {
  const [filter, setFilter] = useState("laporan terbaru");

  return (
    <div className="w-full font-inter">
      <div className="w-full h-[400px] bg-slate-200/50 rounded-lg"></div>
      <div className="my-4 sm:my-12">
        <div className="flex items-center justify-between">
          <h1 className="text-black text-base sm:text-2xl font-bold">
            Laporan Bencana Terkini
          </h1>
          <div className="w-fit sm:w-[200px]">
            <DropdownFilterDisaster
              defaultValue={filter}
              onChange={(v) => setFilter(v)}
            />
          </div>
        </div>
        <div className="w-full mt-5 sm:mt-8 grid grid-cols-[1fr] gap-5 auto-rows-auto  sm:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] sm:gap-8">
          <DisasterPostCard />
          <DisasterPostCard />
          <DisasterPostCard />
          <DisasterPostCard />
        </div>
      </div>
    </div>
  );
}

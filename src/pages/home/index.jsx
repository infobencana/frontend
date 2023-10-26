import { DisasterList } from "@/components/disaster/disaster-list";

export default function Home() {
  return (
    <div className=" w-full font-inter flex flex-col space-y-10 mt-3 mb-10 sm:mt-6 sm:mb-20  sm:space-y-14">
      <div className="w-full h-[400px] bg-slate-200/50 rounded-lg animate-pulse"></div>
      <div className="w-full min-h-[300px] h-auto flex flex-col justify-center">
        <DisasterList
          title={
            <h1 className="text-black text-base sm:text-2xl font-bold">
              Laporan Bencana Terkini
            </h1>
          }
        />
      </div>
    </div>
  );
}

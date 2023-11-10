import { useEffect, useMemo, lazy } from "react";
import { useApi } from "@/hooks/use-api";
import { getActiveDisaster } from "@/api/disaster";
import { Spinner } from "@/components/ui/spinner";
import { Helmet } from "react-helmet";
import DisasterList from "@/components/disaster/disaster-list";

const DisasterMap = lazy(() => import("@/components/disaster/disaster-map"));

export default function Home() {
  const { loading, error, data, request } = useApi(getActiveDisaster);

  const summaryDisaster = useMemo(() => {
    if (!data) return null;

    return {
      darurat: data.filter((disaster) => disaster.status === "darurat").length,
      waspada: data.filter((disaster) => disaster.status === "waspada").length,
      totalKorban: data.reduce((acc, cur) => acc + cur.victim, 0),
    };
  }, [JSON.stringify(data)]);

  useEffect(() => {
    request();
  }, []);

  if (loading || error) {
    return (
      <div className="w-full flex items-center justify-center h-[350px] sm:h-[450px] lg:h-[500px]">
        {loading ? (
          <Spinner className="w-6 h-6 lg:w-10 lg:h-10 text-green" />
        ) : (
          <p className="text-sm font-semibold text-black font-inter">
            Tidak dapat menampilkan data bencana alam
          </p>
        )}
      </div>
    );
  }

  return (
    <div className=" w-full font-inter flex flex-col space-y-8 lg:space-y-0 mb-10 sm:mt-6 sm:mb-20 justify-center items-center">
      <Helmet>
        <title>Home - Infobencana</title>
      </Helmet>
      <div className="w-full grid grid-cols-[1fr] auto-rows-auto lg:grid-cols-[1fr,375px] lg:auto-rows-[500px] gap-8 xl:gap-20">
        <div className="flex justify-center items-center w-full h-[350px] sm:h-[450px] lg:h-[full]">
          <DisasterMap data={data} />
        </div>
        <div className="h-full">
          <div className="w-full mx-auto pb-4 border-b border-b-snow">
            <h1 className="text-base lg:text-lg font-bold text-black">
              Peta Bencana
            </h1>
            <p className="text-sm text-gray mt-0.5">
              Laporan bencana alam aktif
            </p>
          </div>
          <div className="mt-4 lg:mt-6 flex flex-col space-y-3 lg:space-y-4">
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 mt-0.5 w-4 h-4 bg-red-500"></div>
                <p className="text-black text-sm font-medium">
                  Bencana Status Darurat
                </p>
              </div>
              <p className="text-black text-sm font-medium">
                {summaryDisaster?.darurat}
              </p>
            </div>
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 mt-0.5 w-4 h-4 bg-orange-500"></div>
                <p className="text-black text-sm font-medium">
                  Bencana Status Waspada
                </p>
              </div>
              <p className="text-black text-sm font-medium">
                {summaryDisaster?.waspada}
              </p>
            </div>
            <div className="flex justify-between items-center space-x-2">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 mt-0.5 w-4 h-4 bg-gray"></div>
                <p className="text-black text-sm font-medium">
                  Total Korban Bencana
                </p>
              </div>
              <p className="text-black text-sm font-medium">
                {summaryDisaster?.totalKorban}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full min-h-[300px] h-auto flex flex-col justify-center">
        <DisasterList
          title={
            <h2 className="text-black text-base sm:text-2xl font-bold">
              Laporan Bencana Terkini
            </h2>
          }
        />
      </div>
    </div>
  );
}

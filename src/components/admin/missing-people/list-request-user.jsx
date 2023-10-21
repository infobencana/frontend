import { useEffect } from "react";
import { PanelCard } from "@/components/card/panel-card";
import { IconBellFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useApi } from "@/hooks/use-api";
import { getAllReqMissingPoeple } from "@/api/missing-people";
import { Spinner } from "@/components/ui/spinner";
import { getTimeFromNow } from "@/utils/date";

export function ListRequestUser() {
  const { error, loading, data, request } = useApi(getAllReqMissingPoeple);

  const filterListRequest = (data) => {
    if (!data || !data.length) return;
    return data.filter((item) => item.req_status === "requested");
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <PanelCard
      title={
        <div className="flex items-center">
          <IconBellFilled size={18} className="flex-shrink-0 mr-2" />
          <h2 className="line-clamp-1">Laporan Pengguna</h2>
        </div>
      }
    >
      <div className="flex flex-col space-y-7 overflow-y-auto h-[500px] custom-scroll pr-1">
        {loading ||
        error ||
        (!loading && !filterListRequest(data?.data)?.length) ? (
          <div className="w-full flex items-center justify-center h-full">
            {loading ? <Spinner className="mr-2 text-gray/50" /> : false}
            <p className="text-black text-sm">
              {loading
                ? "memuat data"
                : error
                ? "Terjadi sebuah kesalahan"
                : "Tidak ada laporan saat ini"}
            </p>
          </div>
        ) : (
          filterListRequest(data?.data)?.map((item) => (
            <Link
              to={`../people-gone/req/${item._id}`}
              className="text-sm cursor-pointer"
              key={item._id}
            >
              <div className="flex items-center space-x-2 font-medium">
                <div className="max-w-[200px] w-fit overflow-hidden">
                  <h2 className="font-semibold text-black">{item.req_by}</h2>
                </div>
                <span className="text-xs text-gray ">
                  {getTimeFromNow(item.timestamp)}
                </span>
              </div>
              <div className="mt-2">
                <p className="leading-6">
                  meminta perubahan data orang hilang pada laporan
                  <span className="underline lowercase ml-1">
                    {item.bencana_name}
                  </span>
                </p>
              </div>
            </Link>
          ))
        )}
      </div>
    </PanelCard>
  );
}

import { useState, useEffect } from "react";
import { PanelCard } from "@/components/card/panel-card";
import { IconBellFilled } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useApi } from "@/hooks/use-api";
import { getAllMissingPeople } from "@/api/missing-people";
import { Spinner } from "@/components/ui/spinner";
import { getTimeFromNow } from "@/utils/date";

const dummy = [
  {
    id: "5fbbc4f40f39d7f3dc0b5d22",
    request_by: "John Doe",
    title_bencana:
      "Bencana Banjir Besar yang Melanda Wilayah Tropis pada Tanggal 19 Oktober 2023",
    timestamp: "2023-10-19T07:13:23.304Z",
  },
  {
    id: "5fbbc4f40f39d7f3dc0b5d23",
    request_by: "Jane Smith",
    title_bencana:
      "Gempa Bumi Dahsyat dengan Tsunami Mengerikan di Pantai Barat pada Tanggal 19 Oktober 2023",
    timestamp: "2023-10-19T07:16:51.368Z",
  },
  {
    id: "5fbbc4f40f39d7f3dc0b5d24",
    request_by: "Michael Johnson",
    title_bencana:
      "Kebakaran Hutan Luas di Pegunungan Hijau pada Tanggal 19 Oktober 2023",
    timestamp: "2023-10-17T13:15:45.123Z",
  },
  {
    id: "5fbbc4f40f39d7f3dc0b5d25",
    request_by: "Sarah Williams",
    title_bencana:
      "Tsunami Mengerikan yang Mengguncang Pesisir Pantai pada Tanggal 19 Oktober 2023",
    timestamp: "2023-10-19T15:45:20.987Z",
  },
  {
    id: "5fbbc4f40f39d7f3dc0b5d26",
    request_by: "Robert Brown",
    title_bencana:
      "Tanah Longsor Mematikan yang Melanda Desa Terpencil pada Tanggal 19 Oktober 2023",
    timestamp: "2022-10-19T18:20:15.534Z",
  },
];

export function ListRequestUser() {
  //   const { error, loading, data, request } = useApi();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetching() {
      setLoading(true);

      await new Promise((resolve) => setTimeout(() => resolve(dummy), 1500))
        .then((res) => setData(res))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }

    fetching();
  }, []);

  return (
    <PanelCard
      title={
        <div className="flex items-center">
          <IconBellFilled size={18} className="flex-shrink-0 mr-2" />
          <h2 className="line-clamp-1">Laporan Pengguna</h2>
        </div>
      }
      action={<p className="text-xs font-semibold">Lainnya</p>}
    >
      <div className="flex flex-col space-y-7 overflow-y-auto h-[500px] custom-scroll pr-1">
        {loading || error || (!loading && !data) ? (
          <div className="w-full flex items-center justify-center h-full">
            {loading ? <Spinner className="mr-2 text-gray/50" /> : false}
            <p className="text-black text-sm">
              {loading
                ? "memuat data"
                : !data
                ? "Tidak ada laporan saat ini"
                : "terjadi sebuah kesalahan"}
            </p>
          </div>
        ) : (
          data.map((item) => (
            <Link
              to={`../people-gone/req/${item.id}`}
              className="text-sm cursor-pointer"
              key={item.id}
            >
              <div className="flex items-center space-x-2 font-medium">
                <div className="max-w-[200px] w-fit overflow-hidden">
                  <h2 className="font-semibold text-black">
                    {item.request_by}
                  </h2>
                </div>
                <span className="text-xs text-gray ">
                  {getTimeFromNow(item.timestamp)}
                </span>
              </div>
              <div className="mt-2">
                <p className="leading-6">
                  meminta perubahan data orang hilang pada laporan
                  <span className="underline lowercase ml-1">
                    {item.title_bencana}
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

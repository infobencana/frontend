import { useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getAllDisasters } from "@/api/disaster";
import { useApi } from "@/hooks/use-api";
import { Spinner } from "@/components/ui/spinner";

function DisasterTable() {
  const { data, loading, request } = useApi(getAllDisasters);

  const filterDisasterData = () => {
    if (!data || loading) return;

    return data.map((item) => {
      const { name, place, detail } = item;

      return {
        id: item._id,
        name,
        place,
        date: detail?.date,
        status: detail?.status,
      };
    });
  };

  useEffect(() => {
    request();
  }, []);

  if (loading || !data) {
    return (
      <div className="w-full h-[500px] flex items-center justify-center">
        <Spinner className="mr-2 text-gray/50" />
        <p className="text-sm font-inter text-black">Sedang Memuat Data</p>
      </div>
    );
  }

  return (
    <DataTable
      data={filterDisasterData()}
      columns={columns}
      refetch={request}
    />
  );
}

export default DisasterTable;

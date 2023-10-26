import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Spinner } from "@/components/ui/spinner";
import { DropdownFilterDisaster } from "@/components/dropdown/dropdown-filter-disaster";
import { DisasterPostCard } from "@/components/card/disaster-post-card";

export function DisasterList({ search, title, allowParams }) {
  const [query, setQuery] = useState({ sort: "newest" });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [searchParam, setSearchParams] = useSearchParams();

  // fetching simulation

  const fetching = async () => {
    setLoading(true);
    return new Promise((res, rej) => {
      setTimeout(() => {
        res([1, 2, 3, 4, 5, 6]);
      }, 2000);
    })
      .then((data) => setData(data))
      .catch(() => setError("Gagal mengambil data laporan bencana"))
      .finally(() => setLoading(false));
  };

  // will move to parent

  const initialSearchParams = useMemo(() => {
    const params = {};
    const statusParam = searchParam.get("status");
    const sortParam = searchParam.get("sort") || "newest";

    if (statusParam) params["status"] = statusParam;
    if (sortParam) params["sort"] = sortParam;
    if (search) params["name"] = search;

    return params;
  }, []);

  const onFilterChange = (value) => {
    const params = {};
    const sort = ["newest ", "oldest"].includes(value);

    params[sort ? "sort" : "status"] = value;

    if (search) params["name"] = search;
    if (allowParams) setSearchParams(params);

    if (JSON.stringify(params) !== JSON.stringify(query)) {
      setQuery(params);
      fetching();
    }
  };

  useEffect(() => {
    // if intiial params not ready will use query
    fetching(initialSearchParams);
  }, []);

  return (
    <>
      <div className="flex items-center">
        {title}
        <div className="ml-auto w-fit sm:w-[200px]">
          <DropdownFilterDisaster
            defaultValue={query}
            onChange={onFilterChange}
          />
        </div>
      </div>
      {loading || error || (!loading && !data?.length) ? (
        <div className="w-full h-[350px] flex justify-center items-center">
          {loading ? (
            <Spinner className="text-green w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <p className="text-sm font-semibold text-gray font-inter">
              {error || "Tidak ada laporan saat ini"}
            </p>
          )}
        </div>
      ) : (
        <div className="w-full mt-5 sm:mt-8 grid grid-cols-[1fr] gap-5 auto-rows-auto sm:grid-cols-[repeat(auto-fit,minmax(500px,1fr))] sm:gap-8">
          {data.map((item) => (
            <DisasterPostCard key={item} />
          ))}
        </div>
      )}
    </>
  );
}

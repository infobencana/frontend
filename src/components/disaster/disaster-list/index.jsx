import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useApi } from "@/hooks/use-api";
import { getDisasterByQuery } from "@/api/disaster";

import { Spinner } from "@/components/ui/spinner";
import { DropdownFilterDisaster } from "@/components/dropdown/dropdown-filter-disaster";
import { DisasterPostCard } from "@/components/card/disaster-post-card";

export function DisasterList({ search, title, allowParams, initialParams }) {
  const [query, setQuery] = useState({ sort: "newest" });
  const [setSearchParams] = useSearchParams();
  const { loading, error, data, request } = useApi(getDisasterByQuery);

  const onFilterChange = (value) => {
    const params = {};
    const sort = ["newest", "oldest"].includes(value);

    params[sort ? "sort" : "status"] = value;

    if (search) params["search"] = search;
    if (allowParams) setSearchParams(params);

    if (JSON.stringify(params) !== JSON.stringify(query)) {
      setQuery(params);
      request(params);
    }
  };

  useEffect(() => {
    request(initialParams || query);
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
        <div className="w-full mt-5 sm:mt-8 grid grid-cols-[1fr] gap-5 auto-rows-auto sm:grid-cols-[repeat(auto-fill,minmax(500px,1fr))] sm:gap-8">
          {data.map((disasterData) => (
            <DisasterPostCard disaster={disasterData} key={disasterData._id} />
          ))}
        </div>
      )}
    </>
  );
}

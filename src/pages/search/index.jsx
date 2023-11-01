import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import DisasterList from "@/components/disaster/disaster-list";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialParams = () => {
    const params = {
      search: searchParams.get("bencana") || "",
      sort: searchParams.get("sort") || "newest",
    };

    const statusParam = searchParams.get("status");

    if (statusParam) {
      delete params.sort;
      params["status"] = statusParam;
    }

    return params;
  };

  const replaceEmptyQueryParams = () => {
    const searchParam = searchParams.get("bencana");
    const sortParam = searchParams.get("sort");

    if (!searchParam) searchParams.set("bencana", "");
    if (!sortParam) searchParams.set("sort", "newest");

    setSearchParams(searchParams);
  };

  useEffect(() => {
    replaceEmptyQueryParams();
  }, []);

  return (
    <>
      <Helmet>
        <title>
          Bencana {searchParams.get("bencana") || " "} - Infobencana
        </title>
      </Helmet>
      <DisasterList modifyParamsOnChange initialParams={initialParams()} />
    </>
  );
}

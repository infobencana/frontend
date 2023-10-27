import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();

  const initialSearchParams = useMemo(() => {
    const params = {};

    const statusParam = searchParams.get("status");
    const sortParam = searchParams.get("sort") || "newest";
    const searchParams = searchParams.get("search");

    if (statusParam) params["status"] = statusParam;
    if (sortParam) params["sort"] = sortParam;
    if (searchParams) params["search"] = searchParams || "";

    return params;
  }, []);

  return <p>Keyword pencarian : {searchParams.get("bencana")}</p>;
}

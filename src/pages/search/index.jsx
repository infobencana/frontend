import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();

  return <p>Keyword pencarian : {searchParams.get("bencana")}</p>;
}

import { IconSearch } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Input } from "./input";

export function Search({ onSearchSubmit }) {
  const navigate = useNavigate();

  const search = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { search } = Object.fromEntries(formData);
    const encodeURI = encodeURIComponent(search);

    if (onSearchSubmit) onSearchSubmit();
    navigate(`/search?bencana=${encodeURI}`);
  };

  return (
    <form
      className="min-w-[100px] w-full lg:max-w-[290px] relative h-fit"
      onSubmit={search}
    >
      <Input
        name="search"
        type="text"
        placeholder="Cari disini..."
        className="w-full pl-11 pr-6 rounded-3xl font-inter"
      />
      <IconSearch
        size={20}
        className="text-gray absolute -translate-y-1/2 top-1/2 left-4"
      />
    </form>
  );
}

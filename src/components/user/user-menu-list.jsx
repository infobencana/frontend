import { listMenu } from "@/constants/user-list-menu";
import { DialogTrigger } from "../ui/dialog";
import { Link } from "react-router-dom";
import { cn } from "@/utils/cn";

export function UserMenuList() {
  const render = (list) => {
    if (list.name === "keluar") {
      return (
        <DialogTrigger key={list.id}>
          <List list={list} />
        </DialogTrigger>
      );
    }

    if (list.disabled) {
      return <List list={list} key={list.id} />;
    }

    return (
      <Link to={list.url} key={list.id}>
        <List list={list} />
      </Link>
    );
  };

  return (
    <ul className="flex flex-col justify-stretch">
      {listMenu.map((list) => render(list))}
    </ul>
  );
}

export function List({ list }) {
  return (
    <li
      className={cn(
        "group w-full flex items-center space-x-3 py-3 px-5",
        list.disabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-snow/30 ",
      )}
    >
      <div className="w-fit h-fit">
        <list.icon
          size={20}
          className={cn(
            "text-black transition-all duration-200 ",
            !list.disabled ? "group-hover:text-green" : "",
          )}
        />
      </div>
      <div>
        <p
          className={cn(
            "text-sm font-medium text-black transition-all duration-200 font-inter capitalize",
            !list.disabled ? "group-hover:text-green" : "",
          )}
        >
          {list.name}
        </p>
      </div>
    </li>
  );
}

import { useNavigate } from "react-router-dom";
import { listMenu } from "@/constants/user-list-menu";
import { cn } from "@/utils/cn";
import { useUser } from "@/context/user-context";

export function MenuList({ onSignOutMenuClick }) {
  const { user } = useUser();
  const navigate = useNavigate();

  const render = (list) => {
    if (
      user.role !== "admin" &&
      ["buat laporan", "dashboard"].includes(list.name)
    ) {
      return;
    }
    if (list.name === "keluar") {
      return <List key={list.id} list={list} onClick={onSignOutMenuClick} />;
    }

    if (list.disabled) {
      return <List list={list} key={list.id} />;
    }

    return (
      <List key={list.id} list={list} onClick={() => navigate(list.url)} />
    );
  };

  return (
    <ul className="flex flex-col justify-stretch">
      {listMenu.map((list) => render(list))}
    </ul>
  );
}

export function List({ list, ...props }) {
  return (
    <li
      className={cn(
        "group w-full flex items-center space-x-3 py-3 px-5",
        list.disabled
          ? "cursor-not-allowed"
          : "cursor-pointer hover:bg-snow/30 ",
      )}
      {...props}
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

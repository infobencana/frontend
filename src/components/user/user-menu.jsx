import { useUser } from "@/context/user-context";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from "@/components/ui/popover";
import { UserAvatar } from "./user-avatar";
import { MenuList } from "./user-menu-list";
import { ModalSignOut } from "../modal/modal-signout";

export function UserMenu() {
  const { user } = useUser();

  return (
    <ModalSignOut>
      {({ openModal }) => (
        <Popover>
          <PopoverTrigger>
            <UserAvatar
              src={user.photo_profile}
              alt={user.full_name}
              fallback={user.email}
              className="ring-1 ring-snow ring-offset-2 ring-offset-white"
            />
          </PopoverTrigger>
          <PopoverContent
            align="end"
            sideOffset={15}
            className="w-64 px-0 py-2 space-y-2"
          >
            <UserInfo user={user} />
            <PopoverClose className="w-full h-fit">
              <div className="w-full h-fit">
                <MenuList onSignOutMenuClick={openModal} />
              </div>
            </PopoverClose>
          </PopoverContent>
        </Popover>
      )}
    </ModalSignOut>
  );
}

export function UserInfo({ user }) {
  return (
    <div className="w-full px-5">
      <div className="w-full flex items-center space-x-3 py-5 border-b border-b-snow">
        <UserAvatar
          src={user.photo_profile}
          alt={user.full_name}
          fallback={user.email}
          fallBackSize={40}
          className="w-10 h-10 ring-1 ring-snow ring-offset-2 ring-offset-white"
        />
        <div className="w-full font-inter overflow-hidden">
          <h2 className="line-clamp-1 text-sm text-black font-semibold">
            {user.full_name}
          </h2>
          <p className="line-clamp-1 text-gray text-[11px] font-light">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
}

import { useUser } from "@/context/user-context";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UserAvatar } from "./user-avatar";

export function UserMenuNavbar() {
  const { user } = useUser();

  return (
    <TooltipProvider>
      <Tooltip delayDuration={200}>
        <TooltipTrigger>
          <UserAvatar
            src={user.photo_profile}
            alt={user.full_name}
            fallback={user.email}
          />
        </TooltipTrigger>
        <TooltipContent align="end">
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

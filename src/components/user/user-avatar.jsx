import Avvvatars from "avvvatars-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/utils/cn";

export function UserAvatar({
  className,
  fallback,
  fallBackSize = 46,
  ...props
}) {
  return (
    <Avatar
      className={cn(
        "w-11 h-11 transition-all duration-300 fade-in-50",
        className,
      )}
    >
      <AvatarImage {...props} />
      <AvatarFallback delayMs={0}>
        <Avvvatars value={fallback} size={fallBackSize} />
      </AvatarFallback>
    </Avatar>
  );
}

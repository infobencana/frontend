import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "@/utils/cn";

export function Spinner({ className, props }) {
  return (
    <IconLoader2
      size={20}
      className={cn("animate-spin text-white", className)}
      stroke={2.5}
      {...props}
    />
  );
}

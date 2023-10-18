import { Badge } from "./badge";
import { cn } from "@/utils/cn";

export function DisasterStatusBadge({ status, className }) {
  const statusColor = {
    pemulihan: "bg-[#1DB261]",
    darurat: "bg-[#DD2323]",
    waspada: "bg-[#FF862F]",
    aman: "bg-[#008DE9]",
  };

  return (
    <Badge
      className={cn(
        "uppercase text-white text-xs font-bold px-[6px] py-[3px] bg-gray rounded-sm min-w-[90px]",
        statusColor[status],
        className,
      )}
    >
      <div className="w-full h-full flex items-center justify-center">
        {status}
      </div>
    </Badge>
  );
}

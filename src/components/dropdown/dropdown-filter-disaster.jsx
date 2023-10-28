import { IconAdjustmentsFilled } from "@tabler/icons-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMediaQuery } from "@/hooks/use-media-query";

export function DropdownFilterDisaster({
  open,
  setOpen,
  onChange,
  defaultValue,
}) {
  const matches = useMediaQuery("(min-width: 640px)");

  return (
    <Select
      open={open}
      setOpen={setOpen}
      onValueChange={(v) => onChange(v)}
      onOpenChange={() => {
        setTimeout(() => {
          setOpen(!open);
        }, 0);
      }}
      defaultValue={defaultValue || "newest"}
    >
      <SelectTrigger
        dropdown={matches}
        className="w-8 h-8 rounded-lg justify-center ml-auto border-snow text-black font-semibold font-inter sm:w-full sm:h-12 sm:justify-between"
      >
        {!matches ? (
          <IconAdjustmentsFilled className="text-black w-4 h-4 flex-shrink-0" />
        ) : (
          <SelectValue placeholder="Filter Bencana" />
        )}
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Waktu</SelectLabel>
          <SelectItem value="newest">Laporan Terbaru</SelectItem>
          <SelectItem value="oldest">Laporan Lama</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Status Bencana</SelectLabel>
          <SelectItem value="darurat">Darurat</SelectItem>
          <SelectItem value="waspada">Waspada</SelectItem>
          <SelectItem value="pemulihan">Pemulihan</SelectItem>
          <SelectItem value="aman">Aman</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

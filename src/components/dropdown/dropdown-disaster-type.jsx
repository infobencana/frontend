import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/utils/cn";

export function DropdownDisasterType() {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState("detail.type");

  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">Jenis Bencana</Label>
      <Controller
        name="detail.type"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              className={cn("w-full", error ? "border border-[#ef4444]" : "")}
            >
              <SelectValue placeholder="Pilih Jenis Bencana" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bencana</SelectLabel>
                <SelectItem value="banjir">Banjir</SelectItem>
                <SelectItem value="gempa bumi">Gempa Bumi</SelectItem>
                <SelectItem value="gunung meletus">Gunung Meletus</SelectItem>
                <SelectItem value="tanah longsor">Tanah Longsor</SelectItem>
                <SelectItem value="tsunami">Tsunami</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

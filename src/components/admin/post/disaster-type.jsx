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

export function DisasterType() {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">Jenis Bencana</Label>
      <Controller
        name="detail.type"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Jenis Bencana" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Bencana</SelectLabel>
                <SelectItem value="gempa bumi">Gempa Bumi</SelectItem>
                <SelectItem value="gunung meletus">Gunung Meletus</SelectItem>
                <SelectItem value="tsunami">Tsunami</SelectItem>
                <SelectItem value="banjir">Banjir</SelectItem>
                <SelectItem value="tanah longsor">Tanah Longsor</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

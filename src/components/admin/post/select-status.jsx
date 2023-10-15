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

export function SelectStatus() {
  const { control } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">Status Bencana</Label>
      <Controller
        name="detail.status"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Status Bencana" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="aman">Aman</SelectItem>
                <SelectItem value="waspada">Waspada</SelectItem>
                <SelectItem value="darurat">Darurat</SelectItem>
                <SelectItem value="pemulihan">Pemulihan</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}

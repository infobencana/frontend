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

export function DropdownStatusDisaster() {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState("detail.status");
  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">Status Bencana</Label>
      <Controller
        name="detail.status"
        control={control}
        render={({ field }) => (
          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <SelectTrigger
              className={cn("w-full", error ? "border border-[#ef4444]" : "")}
            >
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

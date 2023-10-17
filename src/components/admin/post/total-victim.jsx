import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TotalVictim() {
  const { register } = useFormContext();
  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">Total Korban</Label>
      <Input
        type="number"
        placeholder="Total Korban Bencana"
        name="victim"
        min="0"
        {...register("victim")}
      />
    </div>
  );
}

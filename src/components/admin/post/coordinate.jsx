import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Coordinate() {
  const { register } = useFormContext();
  return (
    <div className="space-y-2">
      <Label className="text-sm text-black capitalize">Koordinat Bencana</Label>
      <div className="w-full flex justify-between items-center gap-2">
        <Input
          type="number"
          placeholder="Latitude"
          name="latitude"
          min="-99"
          pattern="\[[+-]?[0-9]*\.?[0-9]+,[+-]?[0-9]*\.?[0-9]+]"
          {...register("latitude")}
        />
        <Input
          type="number"
          placeholder="Longitude"
          name="longitude"
          min="-99"
          max="-99"
          pattern="\[[+-]?[0-9]*\.?[0-9]+,[+-]?[0-9]*\.?[0-9]+]"
          {...register("longitude")}
        />
      </div>
    </div>
  );
}

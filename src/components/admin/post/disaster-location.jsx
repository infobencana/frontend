import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function DisasterLocation() {
  const { register } = useFormContext();
  return (
    <Input
      label="Lokasi Bencana"
      placeholder="Masukan Lokasi Bencana"
      name="place"
      {...register("place")}
    />
  );
}

import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";

export function DisasterTime() {
  const { register } = useFormContext();
  return (
    <Input
      label="Tanggal & Waktu Bencana"
      placeholder="25 April 2023, 03.09 AM WIB"
      name="detail.date"
      {...register("detail.date")}
    />
  );
}

import { Controller, useFormContext } from "react-hook-form";
import { TextArea } from "@/components/ui/text-area";

export function TitlePost() {
  const form = useFormContext();
  return (
    <Controller
      control={form.control}
      name="title"
      render={({ field }) => (
        <TextArea
          {...field}
          className="text-3xl font-bold outline-none placeholder:italic leading-[40px]"
          placeholder="Judul Laporan"
        />
      )}
    />
  );
}

import { Controller, useFormContext } from "react-hook-form";
import { TextArea } from "@/components/ui/text-area";
import { cn } from "@/utils/cn";

export function TitlePost() {
  const { control, getFieldState } = useFormContext();
  const { error } = getFieldState("name");
  return (
    <Controller
      control={control}
      name="name"
      render={({ field }) => (
        <TextArea
          {...field}
          className={cn(
            "text-3xl font-bold outline-none placeholder:italic leading-[40px]",
            error ? "bg-red-500/10" : "",
          )}
          placeholder="Judul Laporan"
        />
      )}
    />
  );
}

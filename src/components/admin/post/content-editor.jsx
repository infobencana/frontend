import { Controller, useFormContext } from "react-hook-form";
import Editor from "@/components/editor";

export function ContentEditor() {
  const form = useFormContext();

  return (
    <Controller
      control={form.control}
      name="detail.description"
      render={({ field }) => <Editor onChange={field.onChange} />}
    />
  );
}

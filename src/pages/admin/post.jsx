import { FormProvider, Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextArea } from "@/components/ui/text-area";
import { disasterFormSchema } from "@/utils/schema";

import { SelectStatus } from "@/components/admin/post/select-status";
import { DisasterLocation } from "@/components/admin/post/disaster-location";
import { Coordinate } from "@/components/admin/post/coordinate";
import { DisasterTime } from "@/components/admin/post/disaster-time";

import Editor from "@/components/editor";
import { TotalVictim } from "@/components/admin/post/total-victim";

export default function AdminPost() {
  const form = useForm({ resolver: yupResolver(disasterFormSchema) });

  const saveDisasterPost = (data) => {
    console.log(data);
  };

  console.log(form.getValues("detail.description"));

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(saveDisasterPost)}>
        <div className="sm:px-8 xl:px-0 my-5 grid grid-cols-[300px_1fr] gap-24">
          {/* left */}

          {/* right */}
          <div className="space-y-5">
            <SelectStatus />
            <DisasterLocation />
            <Coordinate />
            <DisasterTime />
            <TotalVictim />
          </div>
          <div>
            <Controller
              control={form.control}
              name="title"
              render={({ field }) => (
                <TextArea
                  {...field}
                  className="text-3xl font-bold outline-none placeholder:italic leading-[45px]"
                  placeholder="Judul Laporan"
                />
              )}
            />
            <div className="mt-2">
              <Controller
                control={form.control}
                name="detail.description"
                render={({ field }) => <Editor onChange={field.onChange} />}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

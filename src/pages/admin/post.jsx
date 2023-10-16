import { FormProvider, Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextArea } from "@/components/ui/text-area";
import { disasterFormSchema } from "@/utils/schema";

import { SelectStatus } from "@/components/admin/post/select-status";
import { DisasterLocation } from "@/components/admin/post/disaster-location";
import { Coordinate } from "@/components/admin/post/coordinate";
import { DisasterTime } from "@/components/admin/post/disaster-time";
import { Donation } from "@/components/admin/post/donation";

import Editor from "@/components/editor";
import { TotalVictim } from "@/components/admin/post/total-victim";

export default function AdminPost() {
  const form = useForm({ resolver: yupResolver(disasterFormSchema) });

  return (
    <FormProvider {...form}>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-16">
          {/* Detail Info & Description */}

          <div className="mt-5 grid grid-cols-[300px_1fr] auto-rows-auto gap-20">
            <div className="space-y-6 border-r border-r-snow pr-10">
              <SelectStatus />
              <DisasterLocation />
              <Coordinate />
              <DisasterTime />
              <TotalVictim />
              <Donation />
            </div>
            <div>
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
              <div className="mt-3">
                <Controller
                  control={form.control}
                  name="detail.description"
                  render={({ field }) => <Editor onChange={field.onChange} />}
                />
              </div>
            </div>
          </div>
          <div className="w-full bg-slate-200 h-96"></div>
        </div>
      </form>
    </FormProvider>
  );
}

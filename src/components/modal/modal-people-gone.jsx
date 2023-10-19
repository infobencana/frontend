import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { MissingPeopleScehma } from "@/utils/schema";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import { cn } from "@/utils/cn";

export function ModalPeopleGone({
  children,
  initialValue,
  onSubmit,
  confirmText,
  actionOnClose,
}) {
  const [open, setOpen] = useState(false);
  const form = useForm({
    defaultValues: initialValue || { gender: "laki-laki", status: false },
    resolver: yupResolver(MissingPeopleScehma),
  });

  const openModal = () => setOpen(true);

  const closeModal = () => {
    form.reset({ gender: "laki-laki", status: false });
    setTimeout(() => form.clearErrors(), 0);
    setOpen(false);
  };

  const handleFormSubmit = (data) => {
    onSubmit(data);
    setOpen(false);
    form.reset();
  };

  useEffect(() => {
    if (!open) actionOnClose();
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {children({ openModal, closeModal, form })}
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className={cn(
          "w-full h-[540px] max-w-[530px] max-h-screen",
          "p-10 rounded-[14px] border border-snow overflow-y-auto custom-scroll",
        )}
      >
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            <div className="w-full flex flex-col space-y-5">
              <Input
                label="Name"
                placeholder="Masukan nama korban"
                {...form.register("name")}
              />
              <Input
                label="Lokasi Terakhir"
                placeholder="Lokasi terakhir korban"
                {...form.register("last_seen")}
              />
              <Input
                label="Alamat"
                placeholder="Masukan alamat korban"
                {...form.register("address")}
              />
              <div className="flex flex-wrap gap-x-4">
                <div className="space-y-2 w-[110px] min-w-[100px]">
                  <Label className="text-sm text-black capitalize">Umur</Label>
                  <Input
                    type="number"
                    placeholder="Umur"
                    min="0"
                    {...form.register("age", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2 w-[110px] min-w-[100px]">
                  <Label className="text-sm text-black capitalize">
                    Tinggi(cm)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Tinggi"
                    min="0"
                    {...form.register("height", { valueAsNumber: true })}
                  />
                </div>
                <div className="space-y-2 w-[110px] min-w-[100px]">
                  <Label className="text-sm text-black capitalize">
                    Berat(kg)
                  </Label>
                  <Input
                    type="number"
                    placeholder="Berat"
                    min="0"
                    {...form.register("weight", { valueAsNumber: true })}
                  />
                </div>
              </div>
              <Controller
                name="gender"
                control={form.control}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <div className="flex flex-col space-y-4 mt-2">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="laki-laki" id="laki-laki" />
                        <Label htmlFor="laki-laki">Laki - Laki</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="perempuan" id="perempuan" />
                        <Label htmlFor="perempuan">Perempuan</Label>
                      </div>
                    </div>
                  </RadioGroup>
                )}
              />
              <div>
                <Controller
                  name="status"
                  control={form.control}
                  render={({ field }) => (
                    <div className="flex items-center space-x-3 mt-4">
                      <Switch
                        id="missing-status"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <Label htmlFor="missing-status">Korban Ditemukan</Label>
                    </div>
                  )}
                />
              </div>
              <div>
                <div className="space-y-2.5 mt-5">
                  <Button size="lg" className="w-full capitalize">
                    {confirmText}
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    className="bg-gray/10 w-full"
                    onClick={() => closeModal()}
                    asChild
                  >
                    <p className="cursor-pointer">Batal</p>
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

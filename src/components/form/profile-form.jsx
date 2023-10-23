import { IconAlertTriangle } from "@tabler/icons-react";
import { useForm, Controller, FormProvider } from "react-hook-form";
import { useUser } from "@/context/user-context";
import { useApi } from "@/hooks/use-api";
import { useToast } from "@/hooks/use-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";
import { profileSchema } from "@/utils/schema";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { profileFields } from "@/constants/form-field";
import { updateProfile } from "@/api/user";
import { Spinner } from "../ui/spinner";
import { FormField, FormItem, FormControl, FormMessage } from "./form";

export function ProfileForm() {
  const { user, getUserData } = useUser();
  const { toast } = useToast();
  const { loading, request } = useApi(updateProfile);

  const form = useForm({
    mode: "onTouched",
    resolver: yupResolver(profileSchema),
    defaultValues: {
      email: user.email,
      gender: user.gender,
      full_name: user.full_name,
      phone_number: user.phone_number,
    },
  });

  const saveProfile = async (data) => {
    const { email, created_at, _id, ...userData } = data;
    const response = await request(userData);

    if (response.status) {
      toast({
        title: "Bershasil memperbarui profil",
      });
      await getUserData();
    } else {
      toast({
        variant: "destructive",
        title: "Gagal memperbarui profil",
        description: "Silahkan coba kembali",
      });
    }
  };

  const requiredField = {
    full_name: user.full_name,
    email: user.email,
    phone_number: user.phone_number,
  };

  return (
    <div className="font-inter text-black w-full my-16 lg:mt-0 lg:max-w-[80%]">
      {!Object.values(requiredField).every((value) => value !== "") ? (
        <div className="flex items-center space-x-2 py-2.5 lg:py-4 px-4 mb-6 bg-red-300/10 border border-red-400 text-red-500 rounded-xl">
          <IconAlertTriangle size={20} />
          <h2 className="text-sm font-semibold">Tolong lengkapi profil anda</h2>
        </div>
      ) : (
        false
      )}
      <div>
        <h1 className="text-base lg:text-lg font-bold pb-2 border-b border-b-snow">
          Detail Akun
        </h1>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(saveProfile)}
            className="w-full flex flex-col space-y-6 mt-5"
          >
            {profileFields.map((field) => (
              <FormField key={field.name} name={field.name}>
                <FormItem>
                  <FormControl>
                    <Input
                      key={field.name}
                      {...field}
                      {...form.register(field.name)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              </FormField>
            ))}
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
            <div className="w-full h-fit">
              <Button
                size="lg"
                className="w-full lg:w-40 mt-4 rounded-md"
                disabled={loading}
              >
                {loading ? <Spinner className="mr-2" /> : false}
                Perbarui Profil
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

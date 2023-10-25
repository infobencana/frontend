import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useSearchParams } from "react-router-dom";

import { FormField, FormItem, FormControl, FormMessage } from "./form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Spinner } from "../ui/spinner";
import { useApi } from "@/hooks/use-api";
import { toast } from "@/hooks/use-toast";
import { registerSchema, loginSchema } from "@/utils/schema";
import { handleAuth } from "@/utils/auth";

import authApi from "@/api/auth";

export function AuthForm({ fields, submitText }) {
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  const authType = pathname.replace("/auth/", "");
  const authSchema = {
    register: registerSchema,
    login: loginSchema,
  };

  const { loading, request } = useApi(authApi[authType]);

  const form = useForm({
    resolver: yupResolver(authSchema[authType]),
  });

  const requestAuth = async (data) => {
    const response = await request(data);

    toast({
      variant: response.status ? "default" : "destructive",
      title: response.status ? "Authentikasi berhasil" : "Authentikasi gagal",
      description: response.message,
    });

    if (response.status) {
      const redirectURI = searchParams.get("redirect");
      handleAuth(response.data.token, redirectURI);
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(requestAuth)}>
        <div className="flex flex-col space-y-4">
          {fields.length
            ? fields.map((input) => (
                <FormField key={input.name} name={input.name}>
                  <FormItem>
                    <FormControl>
                      <Input
                        label={input.displayName}
                        {...form.register(input.name)}
                        {...input}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </FormField>
              ))
            : false}
        </div>
        <Button
          text={submitText}
          disabled={loading}
          size="lg"
          className="w-full mt-8"
        >
          {loading ? <Spinner className="mr-2" /> : false}
          {submitText}
        </Button>
      </form>
    </FormProvider>
  );
}

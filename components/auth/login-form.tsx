"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/schemas/auth";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { PasswordInput } from "@/components/auth/password-input";
import { FormStateMessage } from "@/components/auth/form-state-message";
import { login } from "@/actions/auth";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function LoginForm() {
  const searchParams = useSearchParams();

  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "El correo ya está en uso con otra cuenta!"
      : "";

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { isSubmitting, isValid } = form.formState;

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    setError("");
    setSuccess("");

    try {
      const response = await login(values);

      setError(response?.error);
      if (response?.error) {
        toast.error(response.error);
      }

      if (!response?.error) {
        form.reset();
      }
    } catch {
      toast.error("Ocurrió un problema con tu solicitud.");
    }
  }

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-full">
      <FormWrapper
        headerTitle="Iniciar sesión"
        headerSubtitle="Introduce tu correo y contraseña para acceder"
        showSocial
        isLogin
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4">
              <FormField
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Correo electrónico</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="ej. jhon@gmail.com"
                        disabled={isSubmitting}
                        className={cn(
                          fieldState.invalid &&
                            "focus-visible:ring-[#ef4444] border-[#ef4444]"
                        )}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Contraseña</FormLabel>
                    <FormControl>
                      <PasswordInput
                        field={field}
                        isSubmitting={isSubmitting}
                        className={cn(
                          fieldState.invalid &&
                            "focus-visible:ring-[#ef4444] border-[#ef4444]"
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormStateMessage type="Success" message={success} />
              {/* <FormStateMessage type="Error" message={error || urlError} /> */}

              <div className="pt-3 pb-2">
                <Button
                  variant="primary"
                  type="submit"
                  size="lg"
                  disabled={isSubmitting || !isValid}
                  className="w-full font-semibold rounded-lg"
                >
                  {isSubmitting && (
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  )}
                  Iniciar sesión
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}

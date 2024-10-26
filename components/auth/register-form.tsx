"use client";

import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Router } from "lucide-react";
import { toast } from "sonner";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormWrapper } from "@/components/auth/form-wrapper";
import { PasswordInput } from "@/components/auth/password-input";
import { RegisterSchema } from "@/schemas/auth";
import { FormStateMessage } from "@/components/auth/form-state-message";
import { register } from "@/actions/auth";
import { cn } from "@/lib/utils";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import ModalVerified from "./modal-verified";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    try {
      const response = await register(values);

      if (response?.error) {
        setError(response?.error);
      }

      form.reset();
      toast.success("Código de verificación enviado a su correo electrónico.", {
        description: "Compruebe su bandeja de entrada o de spam.",
      });
      router.push("/email-verified");
    } catch (error) {
      toast.error("Algo salió mal!");
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center w-full min-h-full">
      <FormWrapper
        headerTitle="Crea tu cuenta"
        headerSubtitle="Rellena los datos para empezar"
        showSocial
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 mt-4">
              <FormField
                name="name"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Jhon Doe"
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
                name="phone"
                control={form.control}
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Teléfono</FormLabel>
                    <FormControl>
                      <PhoneInput
                        defaultCountry="co"
                        hideDropdown
                        value={field.value}
                        onChange={(phone) => {
                          field.onChange(phone);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                    <FormDescription className="text-[13.5px]">
                      La contraseña debe tener un mínimo de 8 caracteres,
                      incluyendo al menos 1 letra, 1 número y 1 carácter
                      especial.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormStateMessage type="Success" message={success} />
              <FormStateMessage type="Error" message={error} />
              <div className="pt-3 pb-2">
                <Button
                  variant="primary"
                  type="submit"
                  disabled={
                    isSubmitting || !isValid || form.watch("phone").length < 13
                  }
                  className="w-full font-semibold"
                >
                  {isSubmitting && (
                    <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                  )}
                  Registrarse
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}

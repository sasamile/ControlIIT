"use client";
import * as React from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { otpSchema } from "@/schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { verifyOTP } from "@/actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function EmailVerified() {
  const router = useRouter();
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    const result = await verifyOTP(values);

    if (result.success) {
      otpForm.reset();
      toast.success("Código válido. Tu cuenta ha sido verificada.");
      router.push("/login");
      // Redirigir al usuario o realizar otras acciones necesarias
    } else if (result.error) {
      otpForm.reset();

      toast.error(result.error);
    } else {
      otpForm.reset();
      toast.error("Código inválido. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="flex items-center justify-center z-50 h-full">
      <div className="sm:max-w-[425px] flex flex-col justify-center items-center bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <div className="flex flex-col w-full items-center justify-center mb-4 text-center gap-4">
          <Mail className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-2" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Escribe el código de verificación
          </h2>
        </div>
        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onOtpSubmit)}
            className="space-y-6"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 dark:text-gray-200">
                    Código de verificación
                  </FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup className="flex justify-center space-x-2">
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Verificar código
            </Button>
          </form>
        </Form>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
          Hemos enviado un código de verificación a tu correo electrónico. Por
          favor, revísalo e ingrésalo aquí.
        </p>
      </div>
    </div>
  );
}

export default EmailVerified;

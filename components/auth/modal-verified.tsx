"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Mail } from "lucide-react";
import { OTPInput } from "input-otp";
import { Button } from "../ui/button";
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
} from "../ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";

interface ModalVerifiedProps {
  setShowOtpModal: (value: boolean) => void;
  showOtpModal: boolean;
}

function ModalVerified({ setShowOtpModal, showOtpModal }: ModalVerifiedProps) {
  const otpForm = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });
  const onOtpSubmit = async (values: z.infer<typeof otpSchema>) => {
    // Aquí iría la lógica para verificar el OTP
    console.log(values);
    setShowOtpModal(false);
    // Mostrar mensaje de éxito o redirigir al usuario
  };

  return (
    <div className="flex items-center justify-center z-50">
    <Dialog open={showOtpModal} onOpenChange={setShowOtpModal}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <DialogHeader className="flex items-center justify-center mb-4">
          <Mail className="w-8 h-8 text-blue-500 dark:text-blue-400 mr-2" />
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            Escribe el código de verificación
          </DialogTitle>
        </DialogHeader>
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
                  <FormLabel className="text-gray-700 dark:text-gray-200">Código de verificación</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      render={({ slots }) => (
                        <InputOTPGroup className="flex justify-center space-x-2">
                          <InputOTPSlot
                            index={0}
                            {...slots[0]}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <InputOTPSlot
                            index={1}
                            {...slots[1]}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <InputOTPSlot
                            index={2}
                            {...slots[2]}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <InputOTPSeparator />
                          <InputOTPSlot
                            index={3}
                            {...slots[3]}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <InputOTPSlot
                            index={4}
                            {...slots[4]}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                          <InputOTPSlot
                            index={5}
                            {...slots[5]}
                            className="w-12 h-12 text-2xl text-center rounded-lg border-2 border-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                          />
                        </InputOTPGroup>
                      )}
                      {...field}
                    />
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
          Hemos enviado un código de verificación a tu correo electrónico. Por favor, revísalo e ingrésalo aquí.
        </p>
      </DialogContent>
    </Dialog>
  </div>
  );
}

export default ModalVerified;

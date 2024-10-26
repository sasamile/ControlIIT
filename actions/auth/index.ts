"use server";

import { z } from "zod";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/actions/user";
import { LoginSchema, otpSchema, RegisterSchema } from "@/schemas/auth";
import { DEFAULT_AUTH_REDIRECT } from "@/routes";
import { SendEmail } from "@/lib/brevo";

export async function login(credentials: z.infer<typeof LoginSchema>) {
  const result = LoginSchema.safeParse(credentials);

  if (result.error) {
    return { error: "Credenciales invalidas!" };
  }

  const { email, password } = result.data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: process.env.DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" };
        default:
          return { error: error.cause?.err?.message };
      }
    }

    throw error;
  }
}

export async function register(credentials: z.infer<typeof RegisterSchema>) {
  const result = RegisterSchema.safeParse(credentials);

  if (result.error) {
    return { error: "Datos invalidos!" };
  }

  const { name, phone, email, password } = result.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return { error: "El correo ingresado ya esta en uso!" };
    }

    await db.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
      },
    });

    const res = await generateAndSendOTP(email);

    await SendEmail(email, name, res);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Credenciales inválidas!" };
        default:
          return { error: "Algo salió mal en el proceso!" };
      }
    }

    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: DEFAULT_AUTH_REDIRECT });
}

// Validacion de Email por OTP
export async function generateAndSendOTP(email: string) {
  const existingUser = await getUserByEmail(email);

  // Generar código OTP de 6 dígitos
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  // Establecer expiración en 15 minutos
  const otpExpires = new Date(Date.now() + 15 * 60 * 1000);

  // Guardar OTP en el usuario
  await db.user.update({
    where: { id: existingUser?.id },
    data: {
      otpToken: otp,
      otpExpires,
    },
  });
  return otp;
}

export async function verifyOTP(values: z.infer<typeof otpSchema>) {
  const { otp } = values;

  const userOTP = await db.user.findFirst({
    where: {
      otpToken: otp,
    },
  });

  if (!userOTP) {
    return { error: "Código OTP inválido!" };
  }

  if (!userOTP.otpToken || !userOTP.otpExpires) {
    throw new Error("No hay código de verificación pendiente");
  }
  if (userOTP.otpExpires < new Date()) {
    if (userOTP.email) {
      // Generate a new OTP and update the database only if email is not null
      const newOTP = await generateAndSendOTP(userOTP.email);
      const newExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      await db.user.update({
        where: { id: userOTP.id },
        data: {
          otpToken: newOTP,
          otpExpires: newExpiration,
        },
      });
    }

    return {
      error:
        "El código OTP ha expirado. Se ha generado un nuevo código y se ha enviado a tu correo electrónico.",
    };
  }

  // El código OTP es válido y no ha expirado
  await db.user.update({
    where: { id: userOTP.id },
    data: {
      otpToken: null,
      otpExpires: null,
      emailVerified: new Date(),
    },
  });

  return { success: true };
}

import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { NextAuthConfig } from "next-auth";
import bcrypt from "bcryptjs";

import { LoginSchema } from "./schemas/auth";
import { getUserByEmail } from "./actions/user";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      authorize: async (credentials) => {
        const result = LoginSchema.safeParse(credentials);

        if (result.success) {
          const { email, password } = result.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            throw new Error("Credenciales inválidas!");
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            throw new Error("Credenciales inválidas");
          }
          if (!user.emailVerified) {
            throw new Error("Usuario no Verificado");
          }

          if (passwordMatch) return user;
        }

        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "tuemail@email.com" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        // Simulando una base de datos con usuario y contraseña
        const usuarioValido = {
          email: "admin@email.com",
          password: "1234",
        };

        if (
          credentials?.email === usuarioValido.email &&
          credentials?.password === usuarioValido.password
        ) {
          return { id: "1", name: "Admin", email: usuarioValido.email };
        }

        return null; // Retorna `null` si las credenciales son incorrectas
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

// Configurar NextAuth correctamente en Next.js 15
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (
          credentials?.email === (process.env.ADMIN_EMAIL || "admin@example.com") &&
          credentials?.password === (process.env.ADMIN_PASSWORD || "adminpassword123")
        ) {
          return { id: "1", name: "Admin", email: process.env.ADMIN_EMAIL || "admin@example.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
})

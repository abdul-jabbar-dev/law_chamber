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
        // Match with environment variables
        if (
          credentials?.email === process.env.ADMIN_EMAIL &&
          credentials?.password === process.env.ADMIN_PASSWORD
        ) {
          // Return admin user object if credentials match
          return { id: "1", name: "Admin", email: process.env.ADMIN_EMAIL }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login", // Custom login page route
  },
})

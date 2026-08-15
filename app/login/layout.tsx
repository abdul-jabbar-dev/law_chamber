import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  // If the user is already logged in, redirect them to the dashboard
  if (session?.user) {
    redirect("/dashboard")
  }

  return <>{children}</>
}

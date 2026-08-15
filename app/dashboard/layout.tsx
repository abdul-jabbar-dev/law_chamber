import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Scale, LogOut } from "lucide-react"
import BackButton from "./BackButton"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <header className="bg-slate-900 text-white shadow-md z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo / Brand */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Scale className="w-5 h-5 text-white" strokeWidth={2} />
              </div>
               <Link href="/" className="font-bold text-xl tracking-tight hover:text-blue-400 transition-colors">
                Home Page
              </Link>/
              <Link href="/dashboard" className="font-bold text-xl tracking-tight hover:text-blue-400 transition-colors">
                Admin Dashboard
              </Link>  
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">
              <div className="hidden sm:block text-sm text-slate-300">
                Logged in as <span className="font-semibold text-white">{session.user.email}</span>
              </div>

              {/* Logout Button via Server Action */}
              <form action={async () => {
                "use server"
                await signOut({ redirectTo: "/login" })
              }}>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors border border-transparent focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <BackButton />
        {children}
      </main>
    </div>
  )
}

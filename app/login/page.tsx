"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Scale, Lock, Mail, ArrowRight, ShieldCheck } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      alert("Invalid credentials. Please try again.")
      setIsLoading(false)
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans">
      
      {/* Left Column: Branding / Aesthetics */}
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-slate-900 text-slate-50 p-12 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />

        <div className="relative z-10 flex items-center gap-3">
          <div className="p-3 bg-blue-600 rounded-xl shadow-lg">
            <Scale className="w-8 h-8 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Legal Portfolio Admin</h1>
        </div>

        <div className="relative z-10 max-w-lg mt-auto mb-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6">
            Secure Access to <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
              Your Practice.
            </span>
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Manage your legal portfolio, cases, and client inquiries from a centralized, secure dashboard. 
          </p>
        </div>

        <div className="relative z-10 flex items-center gap-3 text-sm text-slate-500 font-medium tracking-wide">
          <ShieldCheck className="w-5 h-5 text-blue-500" />
          <span>AES-256 ENCRYPTED CONNECTION</span>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6 md:p-12 relative z-10 bg-white shadow-[-20px_0_40px_-10px_rgba(0,0,0,0.05)]">
        
        {/* Mobile Header (Hidden on Desktop) */}
        <div className="flex lg:hidden items-center gap-2 mb-12">
          <div className="p-2 bg-slate-900 rounded-lg">
            <Scale className="w-6 h-6 text-white" strokeWidth={1.5} />
          </div>
          <h1 className="text-xl font-bold text-slate-900">Legal Portfolio</h1>
        </div>

        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Welcome Back</h2>
            <p className="text-slate-500">Please enter your admin credentials to continue.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              
              {/* Email Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="email">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 ease-in-out placeholder:text-slate-400 outline-none"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl bg-slate-50 text-slate-900 focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all duration-200 ease-in-out placeholder:text-slate-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isLoading}
              className="group relative w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-white font-semibold bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed mt-4 shadow-lg shadow-slate-900/20"
            >
              {isLoading ? 'Authenticating...' : 'Sign In to Dashboard'}
              {!isLoading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Law Chamber Portfolio. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  )
}

"use client"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    if (result?.error) {
      alert("Invalid Email or Password!")
    } else {
      router.push("/dashboard") // Redirect to dashboard on success
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleLogin} className="p-8 bg-gray-800 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-gray-700 rounded border border-gray-600 focus:outline-none focus:border-blue-500 transition-colors"
          required
        />
        <button type="submit" className="w-full bg-blue-600 p-3 rounded font-bold hover:bg-blue-700 transition-colors">
          Login
        </button>
      </form>
    </div>
  )
}

import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"
import BlogList from "./components/BlogList"

async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data; // assuming { success: true, data: [...] }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return null;
  }
}

export default async function BlogsPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/login")
  }

  const blogs = await getBlogs();

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
       
          <h1 className="text-3xl font-bold text-slate-900">Blog Management</h1>
        </div>

        <div className="bg-white rounded-t-2xl shadow-sm border-x border-t border-slate-200 overflow-hidden">
          <div className="px-6 py-5 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">All Published Articles</h2>
            <Link 
              href="/dashboard/blogs/create" 
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              New Blog
            </Link>
          </div>
        </div>
        <BlogList initialBlogs={blogs || []} />
      </div>
    </div>
  )
}

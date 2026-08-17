import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import BlogForm from "../../components/BlogForm"

async function getBlogBySlug(slug: string) {
  try {
    const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/${slug}`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

export default async function EditBlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans p-8 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">Blog not found</h1>
        <Link href="/dashboard/blogs" className="text-blue-600 hover:underline">
          Return to Blog Management
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/dashboard/blogs" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Edit Blog</h1>
        </div>

        <BlogForm isEdit={true} initialData={blog} />
      </div>
    </div>
  )
}

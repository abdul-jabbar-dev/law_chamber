"use client"

import { useState } from "react"
import Link from "next/link"
import { Edit, Trash2, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

type BlogListProps = {
  initialBlogs: any[]
}

export default function BlogList({ initialBlogs }: BlogListProps) {
  const [blogs, setBlogs] = useState(initialBlogs)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (slug: string, id: string) => {
    if (!confirm("Are you sure you want to delete this blog? This action cannot be undone.")) {
      return
    }

    setDeletingId(id)
    setError(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs/${slug}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete blog")
      }

      // Remove from UI
      setBlogs(blogs.filter(b => b._id !== id))
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  if (!blogs || blogs.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 bg-white rounded-b-2xl border-x border-b border-slate-200">
        <p>No blogs found. Create your first blog post to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 p-0">
      {error && (
        <div className="m-4 bg-rose-50/50 backdrop-blur-sm text-rose-600 p-4 rounded-xl text-sm border border-rose-200/50 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {blogs.map((blog: any) => (
              <tr key={blog._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">
                  {blog.title}
                  {blog.featured && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                      Featured
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4">{blog.author}</td>
                <td className="px-6 py-4" suppressHydrationWarning>
                  {new Date(blog.date || blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right flex justify-end gap-3">
                  <Link href={`/dashboard/blogs/edit/${blog.slug}`} className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="w-4 h-4" />
                  </Link>
                  <button 
                    onClick={() => handleDelete(blog.slug, blog._id)}
                    disabled={deletingId === blog._id}
                    className="p-2 text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {deletingId === blog._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

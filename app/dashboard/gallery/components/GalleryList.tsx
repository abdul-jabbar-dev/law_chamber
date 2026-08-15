"use client"

import { useState } from "react"
import { Trash2, Loader2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

type GalleryListProps = {
  initialItems: any[]
}

export default function GalleryList({ initialItems }: GalleryListProps) {
  const [items, setItems] = useState(initialItems)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image? It will be permanently removed from Cloudinary as well.")) {
      return
    }

    setDeletingId(id)
    setError(null)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/gallery/${id}`, {
        method: "DELETE",
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete image")
      }

      setItems(items.filter(item => item._id !== id))
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setDeletingId(null)
    }
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center py-16 text-slate-400 bg-white rounded-b-2xl border-x border-b border-slate-200">
        <p>No images found in the gallery. Upload your first image to get started!</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-b-2xl border-x border-b border-slate-200 p-6">
      {error && (
        <div className="mb-6 bg-rose-50/50 backdrop-blur-sm text-rose-600 p-4 rounded-xl text-sm border border-rose-200/50 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item: any) => (
          <div key={item._id} className="group relative bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:shadow-md transition-all">
            <div className="relative w-full aspect-square">
              <Image 
                src={item.image} 
                alt={item.title} 
                fill 
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform bg-white/95 backdrop-blur flex justify-between items-center border-t border-slate-100">
              <div className="truncate pr-2">
                <h4 className="text-sm font-semibold text-slate-800 truncate">{item.title}</h4>
                <p className="text-xs text-slate-500 truncate" suppressHydrationWarning>{new Date(item.createdAt).toLocaleDateString()}</p>
              </div>
              <button 
                onClick={() => handleDelete(item._id)}
                disabled={deletingId === item._id}
                className="p-2 text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition-colors disabled:opacity-50 flex-shrink-0 bg-rose-50"
              >
                {deletingId === item._id ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Trash2 className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

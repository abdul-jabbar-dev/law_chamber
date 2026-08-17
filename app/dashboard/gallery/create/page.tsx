"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2, Image as ImageIcon, UploadCloud, X } from "lucide-react"

export default function GalleryUploadPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!imageFile) {
      setError("Please select an image to upload")
      return
    }

    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("title", title)
      if (description) formData.append("description", description)
      formData.append("image", imageFile)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/gallery`, {
        method: 'POST',
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to upload image")
      }

      router.push("/dashboard/gallery")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/dashboard/gallery" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft className="w-5 h-5 text-slate-600" />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Upload to Gallery</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-rose-50 text-rose-600 p-4 rounded-xl text-sm flex items-center gap-3">
              <X className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium">{error}</p>
            </div>
          )}

          <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200">
            <div className="space-y-6">

              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">Image File *</label>
                <input type="file" accept="image/*" onChange={handleImageChange} required className="hidden" ref={fileInputRef} />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="relative w-full h-64 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-purple-400 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group"
                >
                  {previewImage ? (
                    <>
                      <img src={previewImage} alt="Preview" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-white font-medium flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Change Image</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="w-14 h-14 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-400 group-hover:text-purple-500 transition-colors">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <p className="text-sm font-semibold text-slate-700">Click to browse or drag & drop</p>
                      <p className="text-xs text-slate-500 mt-2">SVG, PNG, JPG or WEBP (max. 10MB)</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Image Title *</label>
                <input
                  required
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. Annual Legal Conference 2026"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Description (Optional)</label>
                <textarea
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-purple-500/10 focus:border-purple-500 outline-none transition-all placeholder:text-slate-400 resize-none"
                  placeholder="A short caption or description of the image..."
                />
              </div>

            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button type="button" onClick={() => router.back()} className="px-6 py-3 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-purple-600 rounded-xl hover:bg-purple-700 transition-colors disabled:opacity-50 shadow-sm">
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              Upload Image
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

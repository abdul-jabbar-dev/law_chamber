"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Plus, X, Image as ImageIcon, UploadCloud, FileText, User, LayoutList, Type, Settings2 } from "lucide-react"

type BlogFormProps = {
  initialData?: any;
  isEdit?: boolean;
}

export default function BlogForm({ initialData, isEdit }: BlogFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(initialData?.title || "")
  const [category, setCategory] = useState(initialData?.category || "")
  const [excerpt, setExcerpt] = useState(initialData?.excerpt || "")
  const [author, setAuthor] = useState(initialData?.author || "")
  const [authorRole, setAuthorRole] = useState(initialData?.authorRole || "")
  const [readTime, setReadTime] = useState(initialData?.readTime || "")
  const [contentHtml, setContentHtml] = useState(initialData?.contentHtml || "")
  const [quote, setQuote] = useState(initialData?.quote || "")
  const [featured, setFeatured] = useState(initialData?.featured || false)
  const [takeaways, setTakeaways] = useState<string[]>(initialData?.takeaways || [""])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(initialData?.image || null)

  const handleAddTakeaway = () => setTakeaways([...takeaways, ""])
  const handleRemoveTakeaway = (index: number) => setTakeaways(takeaways.filter((_, i) => i !== index))
  const handleTakeawayChange = (index: number, value: string) => {
    const newTakeaways = [...takeaways]
    newTakeaways[index] = value
    setTakeaways(newTakeaways)
  }

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
    setLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("category", category)
      formData.append("excerpt", excerpt)
      formData.append("author", author)
      formData.append("authorRole", authorRole)
      formData.append("readTime", readTime)
      formData.append("contentHtml", contentHtml)
      formData.append("featured", String(featured))
      if (quote) formData.append("quote", quote)

      const filteredTakeaways = takeaways.filter(t => t.trim() !== "")
      formData.append("takeaways", JSON.stringify(filteredTakeaways))

      if (imageFile) {
        formData.append("image", imageFile)
      }

      const url = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs${isEdit ? `/${initialData.slug}` : ''}`
      const method = isEdit ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        body: formData,
      })

      const data = await res.json()

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Something went wrong")
      }

      router.push("/dashboard/blogs")
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="bg-rose-50/50 backdrop-blur-sm text-rose-600 p-4 rounded-xl text-sm border border-rose-200/50 flex items-center gap-3">
          <X className="w-5 h-5 flex-shrink-0" />
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Section: Basic Details */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <FileText className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Basic Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Article Title *</label>
            <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 font-medium" placeholder="e.g. Understanding Corporate Tax Laws in 2026" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Category *</label>
            <input required type="text" value={category} onChange={e => setCategory(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Corporate Law" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Read Time *</label>
            <input required type="text" value={readTime} onChange={e => setReadTime(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. 5 min read" />
          </div>

          <div className="space-y-2 col-span-1 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">Short Excerpt *</label>
            <textarea required value={excerpt} onChange={e => setExcerpt(e.target.value)} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 resize-none" placeholder="A brief summary of the article..." />
          </div>
        </div>
      </div>

      {/* Section: Author Information */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
            <User className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Author Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Author Name *</label>
            <input required type="text" value={author} onChange={e => setAuthor(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Jane Doe" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Author Role *</label>
            <input required type="text" value={authorRole} onChange={e => setAuthorRole(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 outline-none transition-all placeholder:text-slate-400" placeholder="e.g. Senior Partner" />
          </div>
        </div>
      </div>

      {/* Section: Media & Content */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 transition-shadow hover:shadow-md">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
            <LayoutList className="w-5 h-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-800">Media & Content</h2>
        </div>

        <div className="space-y-8">
          {/* Cover Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Cover Image {isEdit ? '(Optional)' : '*'}</label>
            <input type="file" accept="image/*" onChange={handleImageChange} required={!isEdit} className="hidden" ref={fileInputRef} />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="relative w-full h-48 border-2 border-dashed border-slate-300 rounded-2xl bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-all cursor-pointer flex flex-col items-center justify-center overflow-hidden group"
            >
              {previewImage ? (
                <>
                  <img src={previewImage} alt="Preview" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white font-medium flex items-center gap-2"><UploadCloud className="w-5 h-5" /> Change Image</span>
                  </div>
                </>
              ) : (
                <div className="text-center">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center mx-auto mb-3 text-slate-400 group-hover:text-blue-500 transition-colors">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <p className="text-sm font-medium text-slate-700">Click to upload cover image</p>
                  <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or WEBP</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Type className="w-4 h-4 text-slate-400" />
              Article Body (HTML/Markdown) *
            </label>
            <textarea required value={contentHtml} onChange={e => setContentHtml(e.target.value)} rows={12} className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-mono text-sm leading-relaxed" placeholder="<p>Write your beautiful article here...</p>" />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-semibold text-slate-700">Highlight Quote (Optional)</label>
            <textarea value={quote} onChange={e => setQuote(e.target.value)} rows={2} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400 italic" placeholder="An impactful quote from the article..." />
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-100">
            <label className="text-sm font-semibold text-slate-700">Key Takeaways</label>
            <div className="space-y-3">
              {takeaways.map((takeaway, index) => (
                <div key={index} className="flex gap-3 items-center group">
                  <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 flex-shrink-0">
                    {index + 1}
                  </div>
                  <input type="text" value={takeaway} onChange={e => handleTakeawayChange(index, e.target.value)} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400" placeholder="Enter a key takeaway..." />
                  {takeaways.length > 1 && (
                    <button type="button" onClick={() => handleRemoveTakeaway(index)} className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={handleAddTakeaway} className="inline-flex items-center gap-2 px-4 py-2 text-sm text-slate-600 font-medium bg-slate-100 hover:bg-slate-200 hover:text-slate-900 rounded-lg transition-colors mt-2">
              <Plus className="w-4 h-4" /> Add Takeaway
            </button>
          </div>
        </div>
      </div>

      {/* Section: Settings & Actions */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Featured Article</h3>
            <p className="text-xs text-slate-500 mt-0.5">Highlight this article on the homepage</p>
          </div>
          <div className="ml-4">
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={featured} onChange={e => setFeatured(e.target.checked)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto">
          <button type="button" onClick={() => router.back()} className="flex-1 sm:flex-none px-6 py-3 text-sm font-semibold text-slate-600 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md shadow-blue-500/20 disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5 active:translate-y-0">
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {isEdit ? "Update Blog Post" : "Publish Blog Post"}
          </button>
        </div>
      </div>
    </form>
  )
}

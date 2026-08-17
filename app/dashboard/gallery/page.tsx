import { auth } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Plus, ArrowLeft } from "lucide-react"
import GalleryList from "./components/GalleryList"

async function getGalleryItems() {
  try {
    const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/gallery`, { cache: 'no-store' });
    if (!res.ok) return null;
    const data = await res.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return null;
  }
}

export default async function GalleryPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const items = await getGalleryItems();

  return (
    <div className="min-h-screen bg-slate-50 font-sans p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">

          <h1 className="text-3xl font-bold text-slate-900">Gallery Management</h1>
        </div>

        <div className="bg-white rounded-t-2xl shadow-sm border-x border-t border-slate-200 overflow-hidden">
          <div className="px-6 py-5 flex justify-between items-center bg-slate-50/50">
            <h2 className="font-semibold text-slate-800">Uploaded Images</h2>
            <Link
              href="/dashboard/gallery/create"
              className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Upload Image
            </Link>
          </div>
        </div>
        <GalleryList initialItems={items || []} />
      </div>
    </div>
  )
}

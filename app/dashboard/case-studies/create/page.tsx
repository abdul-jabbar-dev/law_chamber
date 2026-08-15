"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

export default function CreateCaseStudy() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        router.push("/dashboard/case-studies");
        router.refresh();
      } else {
        alert(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Submission error", error);
      alert("Failed to submit the form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/dashboard/case-studies"
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Add New Case Study</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Title *</label>
              <input 
                type="text" 
                name="title" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Corporate Merger Defense"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Practice Area *</label>
              <input 
                type="text" 
                name="practiceArea" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
                placeholder="e.g. Corporate Law"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Client Name / Description</label>
            <input 
              type="text" 
              name="clientName" 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
              placeholder="e.g. Fortune 500 Tech Company (Optional)"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">The Challenge *</label>
            <textarea 
              name="challenge" 
              required 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
              placeholder="Describe the client's problem..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Our Solution *</label>
            <textarea 
              name="solution" 
              required 
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
              placeholder="Describe the strategy and actions taken..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">The Result *</label>
            <textarea 
              name="result" 
              required 
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
              placeholder="Describe the outcome..."
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Featured Case Study</label>
            <div className="flex items-center gap-2">
              <input type="checkbox" name="featured" id="featured" value="true" className="w-4 h-4 text-[#A07D5A]" />
              <label htmlFor="featured" className="text-sm text-gray-600">Highlight this on the homepage or public list</label>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100">
            <label className="text-sm font-semibold text-gray-700">Featured Image *</label>
            <div className="flex items-start gap-6">
              <label className="flex flex-col items-center justify-center w-full max-w-xs h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 font-semibold">Click to upload</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input type="file" name="image" className="hidden" accept="image/*" onChange={handleImageChange} required />
              </label>

              {imagePreview && (
                <div className="relative w-40 h-40 rounded-lg overflow-hidden border border-gray-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end gap-4">
            <Link 
              href="/dashboard/case-studies"
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 rounded-lg bg-[#A07D5A] hover:bg-[#866645] text-white font-medium transition-colors flex items-center gap-2 disabled:opacity-70"
            >
              {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isSubmitting ? 'Saving...' : 'Publish Case Study'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

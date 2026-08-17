"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

export default function EditCaseStudy({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    practiceArea: "",
    clientName: "",
    challenge: "",
    solution: "",
    result: "",
    featured: false,
    image: ""
  });

  useEffect(() => {
    const fetchCaseStudy = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies`);
        const data = await res.json();
        if (data.success) {
          const study = data.data.find((item: any) => item._id === id);
          if (study) {
            setFormData({
              title: study.title,
              practiceArea: study.practiceArea,
              clientName: study.clientName || "",
              challenge: study.challenge,
              solution: study.solution,
              result: study.result,
              featured: study.featured || false,
              image: study.image
            });
            setImagePreview(study.image);
          }
        }
      } catch (error) {
        console.error("Failed to fetch case study", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudy();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("practiceArea", formData.practiceArea);
      submitData.append("clientName", formData.clientName);
      submitData.append("challenge", formData.challenge);
      submitData.append("solution", formData.solution);
      submitData.append("result", formData.result);
      submitData.append("featured", String(formData.featured));

      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput && fileInput.files && fileInput.files[0]) {
        submitData.append("image", fileInput.files[0]);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies/${id}`, {
        method: "PUT",
        body: submitData,
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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#A07D5A]" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/dashboard/case-studies"
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-800">Edit Case Study</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Title *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Practice Area *</label>
              <input
                type="text"
                name="practiceArea"
                value={formData.practiceArea}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Client Name / Description</label>
            <input
              type="text"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">The Challenge *</label>
            <textarea
              name="challenge"
              value={formData.challenge}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Our Solution *</label>
            <textarea
              name="solution"
              value={formData.solution}
              onChange={handleChange}
              required
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">The Result *</label>
            <textarea
              name="result"
              value={formData.result}
              onChange={handleChange}
              required
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#A07D5A] focus:border-transparent outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">Featured Case Study</label>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                id="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 text-[#A07D5A]"
              />
              <label htmlFor="featured" className="text-sm text-gray-600">Highlight this on the homepage or public list</label>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t border-gray-100">
            <label className="text-sm font-semibold text-gray-700">Featured Image (Leave blank to keep existing)</label>
            <div className="flex items-start gap-6">
              <label className="flex flex-col items-center justify-center w-full max-w-xs h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500 font-semibold">Click to upload new image</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input type="file" name="image" className="hidden" accept="image/*" onChange={handleImageChange} />
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
              href="/dashboard"
              className="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium transition-colors"
            >
              Dashboard
            </Link>
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
              {isSubmitting ? 'Saving...' : 'Update Case Study'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

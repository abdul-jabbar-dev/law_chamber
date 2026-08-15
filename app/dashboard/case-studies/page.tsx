"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Plus, Trash2, Edit, Loader2, RefreshCw, ArrowLeft, ArrowUp, ArrowDown } from "lucide-react";

export default function CaseStudiesDashboard() {
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchCaseStudies = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies`);
      const data = await res.json();
      if (data.success) {
        setCaseStudies(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch case studies", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReorder = async (newOrder: any[]) => {
    setCaseStudies(newOrder); // Optimistic UI update
    
    const updates = newOrder.map((study, index) => ({
      id: study._id,
      order: index
    }));

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies/reorder`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      });
    } catch (error) {
      console.error("Failed to save new order", error);
    }
  };

  const moveUp = (index: number) => {
    if (index === 0) return;
    const newItems = [...caseStudies];
    const temp = newItems[index];
    newItems[index] = newItems[index - 1];
    newItems[index - 1] = temp;
    handleReorder(newItems);
  };

  const moveDown = (index: number) => {
    if (index === caseStudies.length - 1) return;
    const newItems = [...caseStudies];
    const temp = newItems[index];
    newItems[index] = newItems[index + 1];
    newItems[index + 1] = temp;
    handleReorder(newItems);
  };

  useEffect(() => {
    fetchCaseStudies();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this case study?")) return;
    
    setDeletingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/case-studies/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setCaseStudies(caseStudies.filter((c) => c._id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Error deleting case study.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
      
          <h1 className="text-2xl font-bold text-gray-800">Case Studies Management</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={fetchCaseStudies}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link
            href="/dashboard/case-studies/create"
            className="flex items-center gap-2 bg-[#A07D5A] hover:bg-[#866645] text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add New Case Study
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-[#A07D5A]" />
        </div>
      ) : caseStudies.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500 mb-4">No case studies found.</p>
          <Link
            href="/dashboard/case-studies/create"
            className="inline-flex items-center gap-2 text-[#A07D5A] hover:underline font-medium"
          >
            <Plus className="w-4 h-4" /> Create your first case study
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                <th className="p-4 font-semibold w-16">Image</th>
                <th className="p-4 font-semibold">Title</th>
                <th className="p-4 font-semibold">Practice Area</th>
                <th className="p-4 font-semibold">Client</th>
                <th className="p-4 font-semibold">Featured</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {caseStudies.map((study, index) => (
                <tr key={study._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4">
                    <div className="relative w-12 h-12 rounded overflow-hidden bg-gray-100">
                      <Image src={study.image} alt={study.title} fill className="object-cover" />
                    </div>
                  </td>
                  <td className="p-4 font-medium text-gray-800">{study.title}</td>
                  <td className="p-4 text-sm text-gray-600">{study.practiceArea}</td>
                  <td className="p-4 text-sm text-gray-600">{study.clientName || '-'}</td>
                  <td className="p-4">
                    {study.featured ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-semibold">Yes</span>
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">No</span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-1">
                      <div className="flex flex-col justify-center mr-2">
                        <button
                          onClick={() => moveUp(index)}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-30 transition-colors"
                          title="Move Up"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => moveDown(index)}
                          disabled={index === caseStudies.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-800 disabled:opacity-30 transition-colors"
                          title="Move Down"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <Link
                        href={`/dashboard/case-studies/edit/${study._id}`}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors flex items-center"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => handleDelete(study._id)}
                        disabled={deletingId === study._id}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 flex items-center"
                        title="Delete"
                      >
                        {deletingId === study._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

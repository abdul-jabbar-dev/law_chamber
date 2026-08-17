"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Trash2, Loader2, Star } from "lucide-react";
import Image from "next/image";

interface Testimonial {
    _id: string;
    name: string;
    message: string;
    rating: number;
    image: string;
    createdAt: string;
}

export default function TestimonialsManagement() {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [message, setMessage] = useState({ text: "", type: "" });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/testimonials`);
            const data = await res.json();
            if (data.success && data.data) {
                setTestimonials(data.data);
            }
        } catch (error) {
            console.error("Error fetching testimonials:", error);
            setMessage({ text: "Failed to load testimonials", type: "error" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this testimonial?")) return;

        setIsDeleting(id);
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/testimonials/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await res.json();
            if (data.success) {
                setTestimonials(prev => prev.filter(t => t._id !== id));
                setMessage({ text: "Testimonial deleted successfully", type: "success" });
            } else {
                setMessage({ text: data.message || "Failed to delete testimonial", type: "error" });
            }
        } catch (error) {
            console.error("Error deleting testimonial:", error);
            setMessage({ text: "An error occurred while deleting", type: "error" });
        } finally {
            setIsDeleting(null);
            setTimeout(() => setMessage({ text: "", type: "" }), 3000);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6">
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                        <MessageSquare className="w-8 h-8 text-blue-600" />
                        Testimonials Management
                    </h1>
                    <p className="text-gray-500 mt-2">View and manage client reviews.</p>
                </div>
            </div>

            {message.text && (
                <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {message.text}
                </div>
            )}

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th scope="col" className="px-6 py-4">Client Info</th>
                                <th scope="col" className="px-6 py-4">Rating</th>
                                <th scope="col" className="px-6 py-4">Review Message</th>
                                <th scope="col" className="px-6 py-4">Date</th>
                                <th scope="col" className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {testimonials.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No testimonials found.
                                    </td>
                                </tr>
                            ) : (
                                testimonials.map((testimonial) => (
                                    <tr key={testimonial._id} className="bg-white border-b hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                                                    {testimonial.image ? (
                                                        <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                                                    ) : (
                                                        <span className="flex items-center justify-center w-full h-full text-gray-500 font-bold">
                                                            {testimonial.name.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <span>{testimonial.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex text-yellow-400">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star key={i} className={`w-3.5 h-3.5 ${i < testimonial.rating ? 'fill-current' : 'text-gray-300'}`} />
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 max-w-xs truncate" title={testimonial.message}>
                                            {testimonial.message}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(testimonial.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(testimonial._id)}
                                                disabled={isDeleting === testimonial._id}
                                                className="font-medium text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors disabled:opacity-50"
                                                title="Delete"
                                            >
                                                {isDeleting === testimonial._id ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

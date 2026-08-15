"use client";

import { useState, useRef } from "react";
import { Star, Upload, Loader2, User, MessageSquare } from "lucide-react";

const ReviewForm = () => {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [rating, setRating] = useState(5);
    const [image, setImage] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState("");
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | '', text: string }>({ type: '', text: '' });
    
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus({ type: '', text: '' });

        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("message", message);
            formData.append("rating", rating.toString());
            
            if (image) {
                formData.append("image", image);
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/testimonials`, {
                method: "POST",
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                setSubmitStatus({ type: 'success', text: 'Thank you for your review!' });
                setName("");
                setMessage("");
                setRating(5);
                setImage(null);
                setPreviewUrl("");
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            } else {
                setSubmitStatus({ type: 'error', text: data.message || 'Something went wrong.' });
            }
        } catch (error) {
            console.error(error);
            setSubmitStatus({ type: 'error', text: 'Failed to submit review. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white p-8 md:p-10 rounded-xl border border-gray-100 shadow-md flex flex-col justify-between font-sans">
            <div className="mb-6 pb-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-[#1A1A1A] uppercase tracking-wide font-serif">
                    Leave a Review
                </h2>
                <div className="flex items-center gap-1.5 text-xs text-[#A07D5A] font-medium">
                    <Star className="w-4 h-4 fill-[#A07D5A]" />
                    <span>Rate Your Experience</span>
                </div>
            </div>
            
            {submitStatus.text && (
                <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${submitStatus.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                    {submitStatus.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                {/* Your Name */}
                <div className="relative flex items-center bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                    <User className="text-[#A07D5A] w-5 h-5 mr-3 shrink-0" />
                    <input 
                        type="text" 
                        required 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-sm font-medium"
                        placeholder="Your Name *"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Select Rating</label>
                    <div className="flex gap-2 bg-gray-50 p-3 rounded-lg border border-gray-100 w-fit">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button 
                                key={star} 
                                type="button" 
                                onClick={() => setRating(star)}
                                className={`p-1 rounded-full hover:scale-110 transition-transform focus:outline-none`}
                            >
                                <Star className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Your Review */}
                <div className="relative flex items-start bg-white rounded-lg border border-gray-200 shadow-2xs px-4 py-3.5 focus-within:border-[#A07D5A] focus-within:ring-1 focus-within:ring-[#A07D5A] transition-all">
                    <MessageSquare className="text-[#A07D5A] w-5 h-5 mr-3 mt-1 shrink-0" />
                    <textarea 
                        required 
                        rows={4}
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-transparent outline-none text-gray-900 placeholder:text-gray-500 text-sm font-medium resize-none"
                        placeholder="Share your experience working with us *"
                    ></textarea>
                </div>

                {/* Profile Image */}
                <div>
                    <label className="block text-xs uppercase font-bold tracking-widest text-gray-500 mb-2">Profile Image (Optional)</label>
                    <div className="flex items-center gap-4">
                        {previewUrl && (
                            <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-[#A07D5A]/30">
                                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                            </div>
                        )}
                        <label className="flex items-center gap-2 px-6 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors text-sm font-medium">
                            <Upload className="w-4 h-4 text-[#A07D5A]" />
                            <span>Choose Image</span>
                            <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                ref={fileInputRef}
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#A07D5A] hover:bg-[#866645] text-white font-medium py-4 rounded text-xs uppercase tracking-widest transition-colors shadow-sm cursor-pointer mt-4 disabled:opacity-70 flex justify-center items-center"
                >
                    {isSubmitting ? (
                        <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                    ) : "SUBMIT REVIEW"}
                </button>
            </form>
        </div>
    );
};

export default ReviewForm;

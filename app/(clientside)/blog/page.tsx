"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Tag, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import BookAppointmentBtn from "@/src/components/common/BookAppointmentBtn";

export default function BlogListPage() {
    const [blogs, setBlogs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/blogs`);
                const data = await res.json();
                if (data.success) {
                    // Sort blogs by newest first
                    const sortedBlogs = data.data.sort((a: any, b: any) => new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime());
                    setBlogs(sortedBlogs);
                }
            } catch (err) {
                console.error("Error fetching blogs:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBlogs();
    }, []);

    const handlePageChange = (pageNum: number) => {
        setCurrentPage(pageNum);
        const section = document.getElementById("recent-publications");
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center font-serif">
                <Loader2 className="w-10 h-10 animate-spin text-[#A07D5A] mb-4" />
                <p className="text-gray-500 font-sans">Loading legal insights...</p>
            </div>
        );
    }

    if (blogs.length === 0) {
        return (
            <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center justify-center font-serif">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">No Publications Yet</h2>
                <p className="text-gray-500 font-sans mb-6">Check back later for new legal insights and articles.</p>
                <Link href="/" className="px-6 py-2 bg-[#A07D5A] text-white rounded-lg hover:bg-[#866645] transition-colors font-sans font-medium">
                    Return to Homepage
                </Link>
            </div>
        );
    }

    const featuredPost = blogs.find((post: any) => post.featured);
    const regularPosts = featuredPost
        ? blogs.filter((post: any) => post._id !== featuredPost._id)
        : blogs;

    const totalPages = Math.ceil(regularPosts.length / postsPerPage) || 1;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = regularPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif">
            {/* Header Section with Marble Texture */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
                            Legal Insights & Articles
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto mb-6"></div>
                        <p className="text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed font-sans">
                            Explore expert legal analysis, regulatory updates, case breakdowns, and strategic counsel authored by Advocate Abdullah.
                        </p>
                    </div>

                    {/* FEATURED POST BANNER */}
                    {featuredPost && (
                        <div className="bg-white rounded-xl border border-gray-100 shadow-md overflow-hidden mb-16 grid grid-cols-1 lg:grid-cols-12 gap-0">
                            {/* Featured Image */}
                            <div className="lg:col-span-7 relative h-72 lg:h-auto min-h-[350px]">
                                <Image
                                    src={featuredPost.image}
                                    alt={featuredPost.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Featured Content */}
                            <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-3 mb-4">
                                        <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest font-sans bg-[#A07D5A]/10 px-3 py-1 rounded">
                                            Featured Insight
                                        </span>
                                        <span className="text-xs text-gray-500 font-sans flex items-center gap-1">
                                            <Clock className="w-3.5 h-3.5" />
                                            {featuredPost.readTime}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 leading-snug hover:text-[#A07D5A] transition-colors">
                                        <Link href={`/blog/${featuredPost.slug}`}>
                                            {featuredPost.title}
                                        </Link>
                                    </h2>

                                    <p className="text-sm text-gray-600 font-sans leading-relaxed mb-6">
                                        {featuredPost.excerpt}
                                    </p>
                                </div>

                                <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-[#A07D5A]/10 border border-[#A07D5A]/30 flex items-center justify-center font-bold text-[#A07D5A] text-xs">
                                            {featuredPost.author?.slice(0, 2).toUpperCase() || 'AA'}
                                        </div>
                                        <div>
                                            <h4 className="text-xs font-bold text-gray-900 font-sans">{featuredPost.author}</h4>
                                            <p className="text-[10px] text-gray-500 font-sans">{new Date(featuredPost.date || featuredPost.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>

                                    <Link
                                        href={`/blog/${featuredPost.slug}`}
                                        className="bg-[#A07D5A] hover:bg-[#866645] text-white text-xs font-semibold py-2.5 px-4 rounded-lg transition-colors flex items-center gap-1.5 font-sans"
                                    >
                                        Read Article <ArrowRight className="w-3.5 h-3.5" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* ARTICLES GRID & PAGINATION */}
                    <div id="recent-publications" className="mb-12 scroll-mt-24">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-200 pb-3 mb-8 gap-2">
                            <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                <Tag className="w-5 h-5 text-[#A07D5A]" />
                                Recent Publications
                            </h3>
                            <span className="text-xs text-gray-500 font-sans font-medium">
                                Showing Page {currentPage} of {totalPages} ({regularPosts.length} Publications)
                            </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {currentPosts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
                                >
                                    {/* Image */}
                                    <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                                        <Image
                                            src={post.image}
                                            alt={post.title}
                                            fill
                                            className="object-cover hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex flex-col flex-grow justify-between">
                                        <div>
                                            <div className="flex items-center justify-between text-xs mb-3 font-sans">
                                                <span className="font-bold text-[#A07D5A] uppercase tracking-widest">
                                                    {post.category}
                                                </span>
                                                <span className="text-gray-400 flex items-center gap-1">
                                                    <Clock className="w-3 h-3" />
                                                    {post.readTime}
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-[#A07D5A] transition-colors">
                                                <Link href={`/blog/${post.slug}`}>
                                                    {post.title}
                                                </Link>
                                            </h4>

                                            <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed mb-6">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                            <span className="text-xs text-gray-500 font-sans font-medium">
                                                {new Date(post.date || post.createdAt).toLocaleDateString()}
                                            </span>

                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="text-xs font-bold text-[#A07D5A] hover:underline flex items-center gap-1 font-sans"
                                            >
                                                Read <ArrowRight className="w-3.5 h-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* PAGINATION CONTROLS */}
                        {totalPages > 1 && (
                            <div className="flex items-center justify-center gap-2 mt-12 font-sans">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-[#A07D5A] hover:text-[#A07D5A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white shadow-sm flex items-center gap-1 text-xs font-semibold"
                                    aria-label="Previous Page"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Prev
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${currentPage === pageNum
                                            ? "bg-[#A07D5A] text-white shadow-md"
                                            : "bg-white border border-gray-200 text-gray-700 hover:border-[#A07D5A] hover:text-[#A07D5A]"
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                ))}

                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2.5 rounded-lg border border-gray-200 text-gray-700 hover:border-[#A07D5A] hover:text-[#A07D5A] disabled:opacity-30 disabled:cursor-not-allowed transition-colors bg-white shadow-sm flex items-center gap-1 text-xs font-semibold"
                                    aria-label="Next Page"
                                >
                                    Next <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        )}
                    </div>

                </div>
            </section>

            {/* CTA Section */}
            <section className="w-full bg-[#1E1B18] py-16 px-4 sm:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 tracking-wide text-white">
                        Need Strategic Legal Advice on a Complex Issue?
                    </h2>
                    <p className="text-xs md:text-sm text-gray-300 font-sans mb-8 max-w-xl mx-auto">
                        Partner directly with Advocate Abdullah to safeguard your corporate interests and achieve favorable legal resolution.
                    </p>
                    <BookAppointmentBtn 
                        className="inline-block px-8 py-3.5 bg-[#A07D5A] hover:bg-[#866645] text-white transition-colors rounded text-xs uppercase tracking-widest font-semibold font-sans"
                        text="Book Appointment"
                    />
                </div>
            </section>
        </div>
    );
}

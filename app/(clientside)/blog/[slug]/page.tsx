
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, CheckCircle2, ShieldCheck } from "lucide-react";
import { blogPosts } from "@/src/data/blogPosts";
import ConsultCalloutClient from "@/src/components/blog/ConsultCalloutClient";
import ShareButtonsClient from "@/src/components/blog/ShareButtonsClient";

export const dynamic = "force-dynamic";

export default async function BlogDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);

    if (!post) {
        notFound();
    }

    const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif">
            {/* Header Section with Marble Texture */}
            <section className="w-full relative py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-4xl mx-auto flex flex-col">
                    {/* Back Link */}
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#A07D5A] hover:underline mb-8 font-sans uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to All Articles
                    </Link>

                    {/* Category */}
                    <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest mb-3 font-sans">
                        {post.category}
                    </span>

                    {/* Article Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        {post.title}
                    </h1>

                    {/* Author & Date Metadata */}
                    <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-200 text-xs text-gray-600 font-sans">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-[#A07D5A]/15 border border-[#A07D5A]/30 flex items-center justify-center font-bold text-[#A07D5A]">
                                {post.author.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900">{post.author}</h4>
                                <p className="text-[11px] text-gray-500">{post.authorRole}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Calendar className="w-4 h-4 text-[#A07D5A]" />
                            <span>{post.date}</span>
                        </div>

                        <div className="flex items-center gap-1.5 text-gray-500">
                            <Clock className="w-4 h-4 text-[#A07D5A]" />
                            <span>{post.readTime}</span>
                        </div>
                    </div>
                    <ShareButtonsClient title={post.title} />
                </div>
            </section>

            {/* Main Content Area */}
            <section className="w-full py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* LEFT COLUMN: Article Dynamic Content (8 cols) */}
                    <div className="lg:col-span-8 bg-white p-8 md:p-12 rounded-xl border border-gray-100 shadow-sm space-y-8">
                        {/* Hero Image */}
                        <div className="relative w-full h-[320px] sm:h-[420px] rounded-lg overflow-hidden border border-gray-200">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Article Lead */}
                        <p className="text-base sm:text-lg text-gray-800 font-sans leading-relaxed font-medium">
                            {post.excerpt}
                        </p>

                        <hr className="border-gray-100" />

                        {/* DYNAMIC RICH TEXT HTML CONTENT */}
                        <div
                            className="prose prose-serif max-w-none space-y-6 text-sm sm:text-base text-gray-700 font-sans leading-relaxed [&_h2]:text-2xl [&_h2]:font-serif [&_h2]:font-bold [&_h2]:text-gray-900 [&_h2]:mt-8 [&_h2]:mb-3 [&_strong]:text-gray-900 [&_strong]:font-semibold"
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                        />

                        {/* DYNAMIC KEY TAKEAWAYS HIGHLIGHT BOX */}
                        {post.takeaways && post.takeaways.length > 0 && (
                            <div className="bg-[#FFFDF5] border-l-4 border-[#A07D5A] p-6 rounded-r-xl shadow-xs border-y border-r border-[#A07D5A]/20 space-y-3 font-sans my-8">
                                <h3 className="text-base font-bold text-[#A07D5A] uppercase tracking-wider flex items-center gap-2">
                                    <ShieldCheck className="w-5 h-5 text-[#A07D5A]" />
                                    Key Legal Takeaways
                                </h3>
                                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-800">
                                    {post.takeaways.map((takeaway, index) => (
                                        <li key={index} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-[#A07D5A] shrink-0 mt-0.5" />
                                            <span>{takeaway}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* DYNAMIC QUOTE BOX */}
                        {post.quote && (
                            <blockquote className="border-l-4 border-[#A07D5A] pl-6 py-3 my-8 italic text-base sm:text-lg text-gray-800 font-medium bg-gray-50/50 rounded-r-lg">
                                “{post.quote}”
                            </blockquote>
                        )}

                        {/* Article Footer & Navigation */}
                        <div className="pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4 font-sans text-xs">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-gray-500">Category:</span>
                                <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded font-semibold">
                                    {post.category}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Sidebar (4 cols) */}
                    <div className="lg:col-span-4 space-y-8">
                        {/* Author Bio Box */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
                            <div className="w-20 h-20 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center font-bold text-[#A07D5A] text-lg mb-4">
                                {post.author.slice(0, 2).toUpperCase()}
                            </div>
                            <span className="text-xs text-gray-500 font-sans uppercase tracking-widest">Author</span>
                            <h3 className="text-lg font-bold text-gray-900 mt-1">{post.author}</h3>
                            <p className="text-xs text-[#A07D5A] font-sans font-semibold mb-4">{post.authorRole}</p>
                            <p className="text-xs text-gray-600 font-sans leading-relaxed mb-6">
                                Specialized in corporate governance, commercial litigation, and strategic dispute resolution.
                            </p>
                            <Link
                                href="/about"
                                className="w-full bg-[#FAFAFA] border border-gray-200 hover:border-[#A07D5A] text-gray-800 text-xs font-semibold py-2.5 rounded transition-colors font-sans"
                            >
                                View Attorney Profile
                            </Link>
                        </div>

                        {/* Related Articles Box */}
                        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm space-y-4">
                            <h3 className="text-base font-bold text-gray-900 border-b border-gray-100 pb-3">
                                Related Publications
                            </h3>
                            <div className="space-y-4 font-sans">
                                {relatedPosts.map((rp) => (
                                    <div key={rp.slug} className="group pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                        <span className="text-[10px] font-bold text-[#A07D5A] uppercase tracking-wider block mb-1">
                                            {rp.category}
                                        </span>
                                        <Link
                                            href={`/blog/${rp.slug}`}
                                            className="text-xs font-bold text-gray-900 group-hover:text-[#A07D5A] transition-colors leading-snug block mb-1"
                                        >
                                            {rp.title}
                                        </Link>
                                        <span className="text-[10px] text-gray-400 block">{rp.readTime}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Consult Callout */}
                        <ConsultCalloutClient />
                    </div>

                </div>
            </section>
        </div>
    );
}

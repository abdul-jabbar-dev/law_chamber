import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, BookOpen } from "lucide-react";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

async function getLatestPosts() {
    try {
        const baseUrl = process.env.PUBLIC_API_URL || 'http://localhost:5000/api';
        const res = await fetch(`${baseUrl}/blogs`, { next: { revalidate: 60 } });
        const data = await res.json();

        if (data.success && data.data) {
            return data.data.slice(0, 3);
        }
        return [];
    } catch (error) {
        console.error("Failed to fetch latest posts:", error);
        return [];
    }
}

const LatestPosts = async () => {
    const latestArticles = await getLatestPosts();

    if (!latestArticles || latestArticles.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50 border-b border-gray-100 font-serif">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-3">
                            <BookOpen className="w-5 h-5 text-[#A07D5A]" />
                            <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest font-sans">
                                Legal Insights & Commentary
                            </span>
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-wide uppercase">
                            Latest Publications
                        </h2>
                        <div className="w-20 h-0.5 bg-[#A07D5A] mt-4"></div>
                    </div>
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-bold text-[#A07D5A] hover:text-[#866645] uppercase tracking-wider font-sans group border-b border-[#A07D5A] pb-1 w-fit"
                    >
                        View All Articles <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Grid of 3 Latest Articles */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {latestArticles.map((post: any) => (
                        <article
                            key={post.slug}
                            className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col h-full group"
                        >
                            {/* Image Container */}
                            <div className="relative w-full h-52 overflow-hidden bg-gray-100">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded text-[10px] font-bold text-[#A07D5A] uppercase tracking-widest shadow-sm font-sans">
                                    {post.category}
                                </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex flex-col flex-grow justify-between">
                                <div>
                                    <div className="flex items-center gap-2 text-xs text-gray-400 font-sans mb-3">
                                        <Clock className="w-3.5 h-3.5 text-[#A07D5A]" />
                                        <span>{post.readTime || '5 min read'}</span>
                                        <span>•</span>
                                        <span suppressHydrationWarning>{new Date(post.date || post.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 leading-snug mb-3 group-hover:text-[#A07D5A] transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h3>

                                    <p className="text-xs md:text-sm text-gray-600 font-sans leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                                    <span className="text-xs text-gray-500 font-sans font-medium">
                                        By {post.author}
                                    </span>

                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-xs font-bold text-[#A07D5A] hover:underline flex items-center gap-1 font-sans"
                                    >
                                        Read <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LatestPosts;

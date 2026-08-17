import Image from "next/image";
import Link from "next/link";
import { Scale, Award, Gavel, Building, Trophy, ArrowRight } from "lucide-react";
import BookAppointmentBtn from "@/src/components/common/BookAppointmentBtn";

async function getProfile() {
    try {
        const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/profile`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return null;
    }
}

async function getTeamMembers() {
    try {
        const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/team-members`, {
            cache: 'no-store'
        });
        if (!res.ok) return [];
        const data = await res.json();
        return data.success ? data.data : [];
    } catch (error) {
        console.error("Error fetching team members:", error);
        return [];
    }
}

async function getSettings() {
    try {
        const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/settings`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        const data = await res.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error("Error fetching settings:", error);
        return null;
    }
}

export default async function AboutPage() {
    const [profile, teamMembers, settings] = await Promise.all([
        getProfile(),
        getTeamMembers(),
        getSettings()
    ]);

    // Fallbacks if backend is not available
    const name = profile?.name;
    const role = profile?.role;
    const subtitle = profile?.subtitle;
    const description = profile?.description;
    const image = profile?.image;
    const biography = profile?.biography;
    const biographySecondary = profile?.biographySecondary;
    const keyExpertise = profile?.keyExpertise;
    const keyAchievements = profile?.keyAchievements
    const qualifications = profile?.qualifications
    const phone = settings?.officeInfo?.phoneNumber;


    // Split team members into key partners and regular members
    const keyPartners = teamMembers.filter((m: any) => m.isKeyPartner);
    const regularMembers = teamMembers.filter((m: any) => !m.isKeyPartner);

    return (
        <div className="w-full min-h-screen bg-gray-50 flex flex-col font-serif">
            {/* Top Profile & Bio Section */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
                {/* Background Marble Texture */}
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    {/* Header Title */}
                    <div className="mb-16 text-center">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
                            Meet Our {role}: <span className="text-[#A07D5A]">{name}</span>
                        </h1>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto"></div>
                    </div>

                    {/* Hero Lawyer Profile Card */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center mb-16 bg-white/60 backdrop-blur-sm p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm">
                        {/* Lawyer Portrait */}
                        <div className="md:col-span-5 relative w-full h-[360px] md:h-[420px] rounded-xl overflow-hidden shadow-md border border-gray-200">
                            <Image
                                src={image}
                                alt={name}
                                fill
                                className="object-cover object-top"
                            />
                        </div>

                        {/* Lawyer Bio Details */}
                        <div className="md:col-span-7 flex flex-col justify-center">
                            <span className="text-xs font-bold text-[#A07D5A] uppercase tracking-widest mb-1 font-sans">
                                {role}
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 tracking-wide">
                                {name}
                            </h2>
                            <p className="text-sm font-bold text-[#A07D5A] uppercase tracking-wider mb-4 font-sans">
                                {subtitle}
                            </p>
                            <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mb-6 whitespace-pre-line">
                                {description}
                            </p>
                            <div className="flex flex-wrap items-center gap-4">
                                <BookAppointmentBtn
                                    className="bg-[#A07D5A] hover:bg-[#866645] text-white text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg transition-colors font-sans uppercase tracking-wider shadow-sm"
                                />
                                <a
                                    href={`tel:${phone || ''}`}
                                    className="border border-gray-300 hover:border-[#A07D5A] text-gray-800 hover:text-[#A07D5A] text-xs sm:text-sm font-semibold py-3 px-6 rounded-lg transition-colors font-sans uppercase tracking-wider bg-white"
                                >
                                    Direct Call
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Information Grid (Biography, Expertise & Qualifications) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">

                        {/* LEFT COLUMN: Biography & Key Expertise */}
                        <div className="lg:col-span-8 space-y-8">
                            {/* BIOGRAPHY CARD */}
                            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                                <h3 className="text-xl font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                    Biography
                                </h3>
                                <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed mb-4 whitespace-pre-line">
                                    {biography}
                                </p>
                                {biographySecondary && (
                                    <p className="text-sm md:text-base text-gray-600 font-sans leading-relaxed whitespace-pre-line">
                                        {biographySecondary}
                                    </p>
                                )}
                            </div>

                            {/* KEY EXPERTISE CARD */}
                            {keyExpertise.length > 0 && (
                                <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8">
                                    <h3 className="text-xl font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                        Key Expertise
                                    </h3>
                                    <ul className="space-y-3 text-sm md:text-base text-gray-700 font-sans">
                                        {keyExpertise.map((item: string, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-[#A07D5A] mr-3 font-bold">•</span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* RIGHT COLUMN: Qualifications & Practice Areas Sidebar */}
                        <div className="lg:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-8 space-y-8">
                            {/* QUALIFICATIONS */}
                            {qualifications.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                        Qualifications
                                    </h3>
                                    <div className="space-y-3 font-sans">
                                        {qualifications.map((qual: any, index: number) => (
                                            <div key={index} className={index !== 0 ? "pt-2 border-t border-gray-100" : ""}>
                                                <h4 className="font-bold text-gray-900 text-sm">{qual.title}</h4>
                                                <p className="text-xs text-gray-500">{qual.institution} | {qual.years}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* SELECTED PRACTICE AREAS */}
                            {keyAchievements.length > 0 && (
                                <div className="pt-4 border-t border-gray-100">
                                    <h3 className="text-lg font-bold text-[#A07D5A] uppercase tracking-wider mb-4 border-b border-gray-100 pb-3">
                                        Achievements
                                    </h3>
                                    <ul className="space-y-2 text-sm text-gray-800 font-sans font-medium">
                                        {keyAchievements.map((achievement: string, index: number) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 bg-[#A07D5A] rounded-full"></span>
                                                {achievement}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                    </div>

                </div>
            </section>

            {/* SECTION 2: Firm & Team Highlights */}
            <section className="w-full relative py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 overflow-hidden">
                <div
                    className="absolute inset-0 z-0 opacity-65 pointer-events-none"
                    style={{ backgroundImage: "url('/bg/texture.png')", backgroundSize: "cover", backgroundPosition: "30% 50%" }}
                ></div>

                <div className="relative z-10 max-w-7xl mx-auto flex flex-col">
                    {/* Header */}
                    <div className="mb-16 text-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-wide uppercase">
                            Firm & Team Highlights
                        </h2>
                        <div className="w-24 h-0.5 bg-[#A07D5A] mx-auto"></div>
                    </div>

                    {/* Team Members & Partner Grid */}
                    {teamMembers.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">

                            {/* Regular Members Cards */}
                            {regularMembers.map((member: any) => (
                                <div key={member._id} className="md:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden p-6 flex flex-col items-center text-center">
                                    <div className="relative w-full h-60 rounded-lg overflow-hidden mb-4 border border-gray-200">
                                        <Image
                                            src={member.image || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"}
                                            alt={member.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <h3 className="text-lg font-bold text-gray-900 mb-0.5">{member.name}</h3>
                                    <p className="text-xs font-semibold text-gray-500 font-sans mb-4">{member.role}</p>
                                    <div className="flex items-center gap-4 text-xs text-[#A07D5A] font-semibold font-sans pt-3 border-t border-gray-100 w-full justify-center">
                                        <Link href="/contact" className="hover:underline">Contact</Link>
                                        {member.phone && (
                                            <>
                                                <span>•</span>
                                                <a href={`tel:${member.phone}`} className="hover:underline">Phone</a>
                                            </>
                                        )}
                                        {member.email && (
                                            <>
                                                <span>•</span>
                                                <a href={`mailto:${member.email}`} className="hover:underline">Email</a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* Key Partner Boxes */}
                            {keyPartners.map((partner: any) => (
                                <div key={partner._id} className="md:col-span-4 bg-white rounded-xl border border-gray-100 shadow-sm p-6 space-y-6">
                                    <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                                        <div>
                                            <h4 className="font-bold text-gray-900 text-base">{partner.name}</h4>
                                            <p className="text-xs text-gray-500 font-sans">{partner.role}</p>
                                        </div>
                                        <div className="w-10 h-10 bg-[#A07D5A]/10 rounded-lg flex items-center justify-center text-[#A07D5A]">
                                            <Award className="w-5 h-5" />
                                        </div>
                                    </div>

                                    <div className="relative w-full h-40 rounded-lg overflow-hidden border border-gray-200">
                                        <Image
                                            src={partner.image || "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&auto=format&fit=crop"}
                                            alt={partner.name}
                                            fill
                                            className="object-cover object-top"
                                        />
                                    </div>

                                    <div className="space-y-2 text-xs font-sans">
                                        <div className="flex justify-between py-1.5 border-b border-gray-100">
                                            <span className="text-gray-500">Firm Values</span>
                                            <span className="font-bold text-gray-800">{partner.firmValues || "Integrity & Excellence"}</span>
                                        </div>
                                        <div className="flex justify-between py-1.5 border-b border-gray-100">
                                            <span className="text-gray-500">Track Record</span>
                                            <span className="font-bold text-gray-800">{partner.trackRecord || "99% Success Rate"}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

                    {/* Circular Badge Icons Row */}
                    <div className="flex items-center justify-center gap-6 md:gap-12 mb-16">
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Award className="w-7 h-7" />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Gavel className="w-7 h-7" />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Scale className="w-7 h-7" />
                        </div>
                        <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#A07D5A]/15 border-2 border-[#A07D5A]/30 flex items-center justify-center text-[#A07D5A] shadow-sm">
                            <Building className="w-7 h-7" />
                        </div>
                    </div>

                    {/* Key Achievements Card */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 max-w-4xl mx-auto w-full">
                        <h3 className="text-xl font-bold text-[#A07D5A] uppercase tracking-wider mb-6 border-b border-gray-100 pb-3 flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-[#A07D5A]" />
                            Key Achievements
                        </h3>
                        <ul className="space-y-4 text-sm md:text-base text-gray-700 font-sans">
                            {keyAchievements.map((achievement: string, index: number) => (
                                <li key={index} className="flex items-start gap-3">
                                    <Trophy className="w-5 h-5 text-[#A07D5A] shrink-0 mt-0.5" />
                                    <span>{achievement}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                </div>
            </section>

            {/* Bottom CTA Banner */}
            <section className="w-full bg-[#1E1B18] py-16 px-4 sm:px-6 text-center text-white">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-4xl font-bold mb-4 tracking-wide text-white">
                        Ready to Discuss Your Legal Matters with {name}?
                    </h2>
                    <p className="text-sm md:text-base text-gray-300 font-sans mb-8 max-w-xl mx-auto">
                        Partner with an experienced legal advocate dedicated to delivering high-impact solutions for your case.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <BookAppointmentBtn
                            className="w-full sm:w-auto px-8 py-3.5 bg-[#A07D5A] hover:bg-[#866645] text-white transition-colors rounded-lg text-xs md:text-sm uppercase tracking-widest font-semibold font-sans"
                            text="Schedule An Appointment"
                        />

                    </div>

                </div>
            </section>
        </div>
    );
}

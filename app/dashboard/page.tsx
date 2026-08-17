import { auth, signOut } from "@/auth"
import { redirect } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { LogOut, LayoutDashboard, FolderOpen, Users, Settings, Mail, Calendar } from "lucide-react"

async function getDashboardStats() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const [inqRes, caseRes, blogRes, profileRes, teamRes] = await Promise.all([
      fetch(`${baseUrl}/inquiries`, { cache: 'no-store' }),
      fetch(`${baseUrl}/case-studies`, { cache: 'no-store' }),
      fetch(`${baseUrl}/blogs`, { cache: 'no-store' }),
      fetch(`${baseUrl}/profile`, { cache: 'no-store' }),
      fetch(`${baseUrl}/team-members`, { cache: 'no-store' })
    ]);

    const [inquiries, cases, blogs, profile, teamMembers] = await Promise.all([
      inqRes.ok ? inqRes.json() : { data: [] },
      caseRes.ok ? caseRes.json() : { data: [] },
      blogRes.ok ? blogRes.json() : { data: [] },
      profileRes.ok ? profileRes.json() : { data: null },
      teamRes.ok ? teamRes.json() : { data: [] }
    ]);

    return {
      inquiries: inquiries.success ? inquiries.data : [],
      casesCount: cases.success ? cases.data.length : 0,
      blogsCount: blogs.success ? blogs.data.length : 0,
      profile: profile.success ? profile.data : null,
      teamMembers: teamMembers.success ? teamMembers.data : [],
    };
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    return { inquiries: [], casesCount: 0, blogsCount: 0, profile: null, teamMembers: [] };
  }
}

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const stats = await getDashboardStats();
  const recentInquiries = stats.inquiries.slice(0, 10);

  return (
    <>
      {/* Welcome Section */}
      <div className="mb-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-5">
          {stats.profile?.imageUrl ? (
            <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-md">
              <Image src={stats.profile.imageUrl} alt="Profile" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-slate-200 border-2 border-white shadow-md flex items-center justify-center text-slate-500">
              <Users className="w-8 h-8" />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              {stats.profile?.name ? `Welcome, ${stats.profile.name}` : "Overview"}
            </h1>
            <p className="text-slate-500 mt-1 font-medium">
              {stats.profile?.role ? stats.profile.role : "Manage your practice, content, and client inquiries."}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/inquiries" className="inline-flex items-center gap-2 bg-[#A07D5A] hover:bg-[#866645] text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-sm shadow-[#A07D5A]/20">
            <Mail className="w-4 h-4" /> View Inbox
          </Link>
        </div>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600 text-sm uppercase tracking-wider">Case Studies</h3>
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
              <FolderOpen className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900">{stats.casesCount}</p>
          <p className="text-sm text-emerald-600 mt-2 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Track records of success
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600 text-sm uppercase tracking-wider">Published Articles</h3>
            <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
              <LayoutDashboard className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900">{stats.blogsCount}</p>
          <p className="text-sm text-slate-500 mt-2 font-medium">Insights and legal news</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-slate-100 relative overflow-hidden group">
          <div className="absolute right-0 top-0 w-24 h-24 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-bl-full -z-10 group-hover:scale-110 transition-transform duration-500"></div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-600 text-sm uppercase tracking-wider">New Inquiries</h3>
            <div className="p-2.5 bg-pink-50 text-pink-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </div>
          </div>
          <p className="text-4xl font-bold text-slate-900">{stats.inquiries.filter((i: any) => i.status === "Pending").length}</p>
          <p className="text-sm text-amber-600 mt-2 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Needs attention
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Management Modules */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-slate-900 mb-6">Management Modules</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            <Link href="/dashboard/profile" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Firm Profile</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Update bio, expertise, and firm values shown publicly.</p>
              </div>
            </Link>

            <Link href="/dashboard/team" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-indigo-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-700 transition-colors">Team Roster</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Add and manage partners, associates, and staff.</p>
              </div>
            </Link>

            <Link href="/dashboard/case-studies" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-amber-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">Case Studies</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Document successful track records and legal victories.</p>
              </div>
            </Link>

            <Link href="/dashboard/blogs" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-blue-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">Publications</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Publish legal insights, news, and articles.</p>
              </div>
            </Link>

            <Link href="/dashboard/gallery" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-purple-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-purple-50 text-purple-600 rounded-xl group-hover:bg-purple-600 group-hover:text-white transition-colors">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">Gallery</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Manage firm photos and event galleries.</p>
              </div>
            </Link>

            <Link href="/dashboard/testimonials" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-red-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-red-50 text-red-600 rounded-xl group-hover:bg-red-600 group-hover:text-white transition-colors">
                <LayoutDashboard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-red-700 transition-colors">Testimonials</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">View and manage client reviews.</p>
              </div>
            </Link>

            <Link href="/dashboard/appointments" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-emerald-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Appointments</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Manage consultation and appointment requests.</p>
              </div>
            </Link>

            <Link href="/dashboard/settings" className="flex items-start gap-4 bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:border-teal-200 hover:shadow-md hover:-translate-y-0.5 transition-all group">
              <div className="p-3 bg-teal-50 text-teal-600 rounded-xl group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Settings className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 group-hover:text-teal-700 transition-colors">Site Settings</h3>
                <p className="text-sm text-slate-500 mt-1 leading-relaxed">Manage site-wide settings and contact info.</p>
              </div>
            </Link>

          </div>
        </div>

        {/* Right Column: Recent Inquiries & Team Panel */}
        <div className="lg:col-span-1 flex flex-col gap-8">

          {/* Recent Inquiries */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col h-[500px]">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-900">Recent Inquiries</h2>
              <Link href="/dashboard/inquiries" className="text-sm text-[#A07D5A] font-semibold hover:text-[#866645] transition-colors">View All</Link>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {recentInquiries.length === 0 ? (
                <div className="text-center py-12 px-4 text-slate-400">
                  <Mail className="w-10 h-10 mx-auto mb-3 text-slate-200" />
                  <p className="text-sm">No recent inquiries to display.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-1">
                  {recentInquiries.slice(0, 5).map((inquiry: any) => {
                    const isToday = new Date(inquiry.createdAt).toDateString() === new Date().toDateString();
                    return (
                      <Link key={inquiry._id} href="/dashboard/inquiries" className={`group block p-4 rounded-xl transition-colors border ${isToday ? 'bg-blue-50/50 border-blue-100 hover:bg-blue-50' : 'border-transparent hover:bg-slate-50'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-900 text-sm group-hover:text-[#A07D5A] transition-colors truncate">{inquiry.fullName}</h4>
                            {isToday && <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider bg-blue-100 text-blue-700">New</span>}
                          </div>
                          <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap ml-2" suppressHydrationWarning>
                            {new Date(inquiry.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mb-2">{inquiry.practiceArea}</p>
                        <div className="flex items-center gap-2">
                          <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${inquiry.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                            {inquiry.status}
                          </span>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Team Members */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col max-h-[400px]">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center">
              <h2 className="font-bold text-slate-900">Team Members</h2>
              <Link href="/dashboard/team" className="text-sm text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">Manage</Link>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {stats.teamMembers.length === 0 ? (
                <p className="text-sm text-slate-400 text-center py-6">No team members added yet.</p>
              ) : (
                stats.teamMembers.map((member: any) => (
                  <div key={member._id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-100 shrink-0">
                      {member.imageUrl ? (
                        <Image src={member.imageUrl} alt={member.name} fill className="object-cover" />
                      ) : (
                        <Users className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm truncate">{member.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{member.role}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>

    </>
  )
}

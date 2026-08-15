"use client";

import { useState, useEffect } from "react";
import { Inbox, CheckCircle2, Trash2, Clock, Mail, Phone, Loader2, Calendar } from "lucide-react";

interface Appointment {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  practiceArea: string;
  contactOption: string;
  notes: string;
  status: "Pending" | "Reviewed";
  createdAt: string;
}

export default function AppointmentsDashboard() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"All" | "Pending" | "Reviewed">("All");
  const [processingId, setProcessingId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/appointments`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}` // Assuming token is used if required, though other pages don't show it explicitly
        }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.data);
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: "Pending" | "Reviewed") => {
    setProcessingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/appointments/${id}`, {
        method: "PATCH",
        headers: { 
          "Content-Type": "application/json",
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.map(app => app._id === id ? { ...app, status: newStatus } : app));
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this appointment request?")) return;
    setProcessingId(id);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/appointments/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(appointments.filter(app => app._id !== id));
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    } finally {
      setProcessingId(null);
    }
  };

  const filteredAppointments = appointments.filter(app => filter === "All" || app.status === filter);
  
  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedAppointments = filteredAppointments.slice(startIndex, startIndex + itemsPerPage);

  // Reset to page 1 if filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Appointments List</h1>
            <p className="text-sm text-slate-500">Manage your consultation requests.</p>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {["All", "Pending", "Reviewed"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === f
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-slate-400 mb-4" />
            <p className="text-slate-500">Loading appointments...</p>
          </div>
        ) : filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-1">No Appointments Found</h3>
            <p className="text-slate-500">You don't have any {filter.toLowerCase()} appointments yet.</p>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-200">
                    <th className="py-3 px-6 font-semibold">Requested At</th>
                    <th className="py-3 px-6 font-semibold">Client</th>
                    <th className="py-3 px-6 font-semibold">Contact Info</th>
                    <th className="py-3 px-6 font-semibold">Preferred Time</th>
                    <th className="py-3 px-6 font-semibold">Details</th>
                    <th className="py-3 px-6 font-semibold">Status</th>
                    <th className="py-3 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-slate-100">
                  {paginatedAppointments.map((appointment) => (
                    <tr key={appointment._id} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 px-6 text-slate-500 whitespace-nowrap" suppressHydrationWarning>
                        {new Date(appointment.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-6 font-medium text-slate-900">
                        {appointment.fullName}
                        <span className="block text-xs font-normal text-slate-400 mt-0.5">{appointment.contactOption}</span>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        <div className="flex flex-col gap-1 text-xs">
                          {appointment.email && <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> {appointment.email}</span>}
                          <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> {appointment.phone}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-500">
                        <div className="flex flex-col gap-1 text-xs whitespace-nowrap">
                          {appointment.preferredDate && <span className="font-semibold text-slate-700">{appointment.preferredDate}</span>}
                          {appointment.preferredTime && <span>{appointment.preferredTime}</span>}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <div className="max-w-[200px] truncate" title={appointment.notes}>
                          <span className="font-semibold text-xs uppercase tracking-wider text-slate-400 block mb-0.5">{appointment.practiceArea}</span>
                          {appointment.notes || "No notes"}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${appointment.status === "Pending" ? "bg-amber-100 text-amber-700" : "bg-emerald-100 text-emerald-700"}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {appointment.status === "Pending" ? (
                            <button
                              onClick={() => handleUpdateStatus(appointment._id, "Reviewed")}
                              disabled={processingId === appointment._id}
                              className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Mark Reviewed"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUpdateStatus(appointment._id, "Pending")}
                              disabled={processingId === appointment._id}
                              className="p-1.5 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Mark Pending"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(appointment._id)}
                            disabled={processingId === appointment._id}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Appointment"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 bg-slate-50">
                <span className="text-sm text-slate-500">
                  Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredAppointments.length)} of {filteredAppointments.length} appointments
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1.5 text-sm font-medium bg-white border border-slate-200 rounded-lg hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, Upload, Users, Loader2, ArrowLeft, MoveUp, MoveDown } from "lucide-react";
import Image from "next/image";

export default function TeamManagement() {
  const [members, setMembers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    role: "",
    image: "",
    phone: "",
    email: "",
    isKeyPartner: false,
    firmValues: "",
    trackRecord: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/team-members`);
      const data = await res.json();
      if (data.success) {
        setMembers(data.data);
      }
    } catch (error) {
      console.error("Error fetching team members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      id: "",
      name: "",
      role: "",
      image: "",
      phone: "",
      email: "",
      isKeyPartner: false,
      firmValues: "",
      trackRecord: "",
    });
    setImageFile(null);
    setPreviewUrl("");
    setMessage({ text: "", type: "" });
  };

  const handleOpenNew = () => {
    resetForm();
    setIsFormOpen(true);
  };

  const handleEdit = (member: any) => {
    setFormData({
      id: member._id,
      name: member.name || "",
      role: member.role || "",
      image: member.image || "",
      phone: member.phone || "",
      email: member.email || "",
      isKeyPartner: member.isKeyPartner || false,
      firmValues: member.firmValues || "",
      trackRecord: member.trackRecord || "",
    });
    setPreviewUrl(member.image || "");
    setImageFile(null);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/team-members/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMembers(members.filter(m => m._id !== id));
      } else {
        alert(data.message || "Failed to delete");
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("An error occurred");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage({ text: "", type: "" });

    try {
      const token = localStorage.getItem("token");
      const submitData = new FormData();

      submitData.append("name", formData.name);
      submitData.append("role", formData.role);
      submitData.append("phone", formData.phone);
      submitData.append("email", formData.email);
      submitData.append("isKeyPartner", String(formData.isKeyPartner));
      if (formData.isKeyPartner) {
        submitData.append("firmValues", formData.firmValues);
        submitData.append("trackRecord", formData.trackRecord);
      }

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const url = formData.id
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/team-members/${formData.id}`
        : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/team-members`;

      const method = formData.id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Authorization": `Bearer ${token}` },
        body: submitData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Team member saved successfully!", type: "success" });
        await fetchMembers();
        setTimeout(() => {
          setIsFormOpen(false);
          resetForm();
        }, 1500);
      } else {
        setMessage({ text: data.message || "Failed to save team member", type: "error" });
      }
    } catch (error) {
      console.error("Error saving member:", error);
      setMessage({ text: "An error occurred while saving", type: "error" });
    } finally {
      setIsSaving(false);
    }
  };

  const moveItem = async (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === members.length - 1) return;

    const newMembers = [...members];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;

    // Swap
    const temp = newMembers[index];
    newMembers[index] = newMembers[targetIndex];
    newMembers[targetIndex] = temp;

    // Update order values
    const updates = newMembers.map((m, i) => ({ id: m._id, order: i }));
    setMembers(newMembers); // Optimistic UI

    try {
      const token = localStorage.getItem("token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/team-members/reorder`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ updates })
      });
    } catch (error) {
      console.error("Error reordering:", error);
      fetchMembers(); // Revert on failure
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
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6">

      {!isFormOpen ? (
        <>
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="w-8 h-8 text-blue-600" />
                Team Management
              </h1>
              <p className="text-gray-500 mt-2">Manage your firm's team members and key partners.</p>
            </div>
            <button
              onClick={handleOpenNew}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Member
            </button>
          </div>

          {members.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-2xl border border-gray-200 shadow-sm">
              <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Team Members Found</h3>
              <p className="text-gray-500 mb-6">You haven't added any team members yet.</p>
              <button
                onClick={handleOpenNew}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="w-5 h-5" />
                Add First Member
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-sm">
                    <tr>
                      <th className="px-6 py-4 font-semibold">Member</th>
                      <th className="px-6 py-4 font-semibold">Contact</th>
                      <th className="px-6 py-4 font-semibold">Status</th>
                      <th className="px-6 py-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {members.map((member, index) => (
                      <tr key={member._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
                              {member.image ? (
                                <Image src={member.image} alt={member.name} fill className="object-cover" />
                              ) : (
                                <Users className="w-6 h-6 m-auto text-gray-400 mt-3" />
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{member.name}</div>
                              <div className="text-sm text-gray-500">{member.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600">
                            {member.phone && <div>📞 {member.phone}</div>}
                            {member.email && <div>✉️ {member.email}</div>}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {member.isKeyPartner ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                              Key Partner
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Associate
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button onClick={() => moveItem(index, 'up')} disabled={index === 0} className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-30">
                              <MoveUp className="w-4 h-4" />
                            </button>
                            <button onClick={() => moveItem(index, 'down')} disabled={index === members.length - 1} className="p-2 text-gray-400 hover:text-blue-600 disabled:opacity-30">
                              <MoveDown className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleEdit(member)} className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg">
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(member._id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setIsFormOpen(false)}
            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Team List
          </button>

          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-4">
              {formData.id ? "Edit Team Member" : "Add New Team Member"}
            </h2>

            {message.text && (
              <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Role / Title *</label>
                  <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image *</label>
                <div className="flex items-center gap-6">
                  {previewUrl ? (
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-gray-200">
                      <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-24 h-24 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                      <Users className="w-8 h-8" />
                    </div>
                  )}
                  <div className="flex-1">
                    <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="member-image" required={!formData.id} />
                    <label htmlFor="member-image" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      Choose Image
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isKeyPartner"
                    checked={formData.isKeyPartner}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">Mark as Key Partner</div>
                    <div className="text-sm text-gray-500">Key partners are displayed prominently with Firm Values and Track Record.</div>
                  </div>
                </label>
              </div>

              {formData.isKeyPartner && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-amber-50 p-6 rounded-xl border border-amber-100">
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-1">Firm Values</label>
                    <input type="text" name="firmValues" value={formData.firmValues} onChange={handleInputChange} placeholder="e.g. Integrity & Excellence" required className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-amber-900 mb-1">Track Record</label>
                    <input type="text" name="trackRecord" value={formData.trackRecord} onChange={handleInputChange} placeholder="e.g. 99% Success Rate" required className="w-full px-4 py-2 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500" />
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {isSaving ? "Saving..." : "Save Member"}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}

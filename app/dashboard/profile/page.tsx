"use client";

import { useState, useEffect } from "react";
import { Save, Plus, Trash2, Upload, Loader2, User } from "lucide-react";
import Image from "next/image";

export default function ProfileManagement() {
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    subtitle: "",
    description: "",
    biography: "",
    biographySecondary: "",
    image: "",
    keyExpertise: [""],
    keyAchievements: [""],
    services: [""],
    qualifications: [{ title: "", institution: "", years: "" }],
    chamberInfo: { location: "", morningTime: "", eveningTime: "", workingDays: "", closedDays: "" }
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/profile`);
      const data = await res.json();
      if (data.success && data.data) {
        const p = data.data;
        setFormData({
          name: p.name || "",
          role: p.role || "",
          subtitle: p.subtitle || "",
          description: p.description || "",
          biography: p.biography || "",
          biographySecondary: p.biographySecondary || "",
          image: p.image || "",
          keyExpertise: p.keyExpertise?.length ? p.keyExpertise : [""],
          keyAchievements: p.keyAchievements?.length ? p.keyAchievements : [""],
          services: p.services?.length ? p.services : [""],
          qualifications: p.qualifications?.length ? p.qualifications : [{ title: "", institution: "", years: "" }],
          chamberInfo: p.chamberInfo || { location: "", morningTime: "", eveningTime: "", workingDays: "", closedDays: "" }
        });
        setPreviewUrl(p.image || "");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleChamberInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      chamberInfo: {
        ...prev.chamberInfo,
        [name]: value
      }
    }));
  };

  const handleArrayChange = (index: number, field: 'keyExpertise' | 'keyAchievements' | 'services', value: string) => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayItem = (field: 'keyExpertise' | 'keyAchievements' | 'services') => {
    setFormData(prev => ({ ...prev, [field]: [...prev[field], ""] }));
  };

  const removeArrayItem = (index: number, field: 'keyExpertise' | 'keyAchievements' | 'services') => {
    const newArray = formData[field].filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, [field]: newArray }));
  };

  const handleQualificationChange = (index: number, field: string, value: string) => {
    const newQuals = [...formData.qualifications];
    newQuals[index] = { ...newQuals[index], [field]: value };
    setFormData(prev => ({ ...prev, qualifications: newQuals }));
  };

  const addQualification = () => {
    setFormData(prev => ({
      ...prev,
      qualifications: [...prev.qualifications, { title: "", institution: "", years: "" }]
    }));
  };

  const removeQualification = (index: number) => {
    const newQuals = formData.qualifications.filter((_, i) => i !== index);
    setFormData(prev => ({ ...prev, qualifications: newQuals }));
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
      submitData.append("subtitle", formData.subtitle);
      submitData.append("description", formData.description);
      submitData.append("biography", formData.biography);
      submitData.append("biographySecondary", formData.biographySecondary);

      // Filter out empty strings/objects before sending
      const filteredExpertise = formData.keyExpertise.filter(item => item.trim() !== "");
      const filteredAchievements = formData.keyAchievements.filter(item => item.trim() !== "");
      const filteredServices = formData.services.filter(item => item.trim() !== "");
      const filteredQuals = formData.qualifications.filter(q => q.title.trim() !== "");

      submitData.append("keyExpertise", JSON.stringify(filteredExpertise));
      submitData.append("keyAchievements", JSON.stringify(filteredAchievements));
      submitData.append("services", JSON.stringify(filteredServices));
      submitData.append("qualifications", JSON.stringify(filteredQuals));
      submitData.append("chamberInfo", JSON.stringify(formData.chamberInfo));

      if (imageFile) {
        submitData.append("image", imageFile);
      }

      const res = await fetch(`${process.env.PUBLIC_API_URL || 'http://localhost:5000/api'}/profile`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: submitData,
      });

      const data = await res.json();
      if (data.success) {
        setMessage({ text: "Profile updated successfully!", type: "success" });
      } else {
        setMessage({ text: data.message || "Failed to update profile", type: "error" });
      }
    } catch (error) {
      console.error("Error saving profile:", error);
      setMessage({ text: "An error occurred while saving", type: "error" });
    } finally {
      setIsSaving(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <User className="w-8 h-8 text-blue-600" />
            Profile Management
          </h1>
          <p className="text-gray-500 mt-2">Update your personal information displayed on the About Me page.</p>
        </div>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Basic Info Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 border-b pb-3">Basic Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role (e.g., Senior Associate)</label>
              <input type="text" name="role" value={formData.role} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Tagline</label>
              <input type="text" name="subtitle" value={formData.subtitle} onChange={handleInputChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description (Hero Section)</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
            <div className="flex items-center gap-6">
              {previewUrl ? (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden border border-gray-200">
                  <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                </div>
              ) : (
                <div className="w-32 h-32 bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center text-gray-400">
                  <User className="w-12 h-12" />
                </div>
              )}
              <div className="flex-1">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" id="profile-image" />
                <label htmlFor="profile-image" className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 cursor-pointer">
                  <Upload className="w-4 h-4" />
                  Choose New Image
                </label>
                <p className="text-xs text-gray-500 mt-2">Recommended: High-resolution portrait image.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Biography Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 border-b pb-3">Biography</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Biography Paragraph</label>
              <textarea name="biography" value={formData.biography} onChange={handleInputChange} required rows={4} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Secondary Biography Paragraph (Optional)</label>
              <textarea name="biographySecondary" value={formData.biographySecondary} onChange={handleInputChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
            </div>
          </div>
        </div>

        {/* Dynamic Arrays Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Key Expertise */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-semibold">Key Expertise</h2>
              <button type="button" onClick={() => addArrayItem('keyExpertise')} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg flex items-center gap-1 text-sm font-medium">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.keyExpertise.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => handleArrayChange(index, 'keyExpertise', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Advised on high-stakes transactions..." />
                  <button type="button" onClick={() => removeArrayItem(index, 'keyExpertise')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-semibold">Selected Services</h2>
              <button type="button" onClick={() => addArrayItem('services')} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg flex items-center gap-1 text-sm font-medium">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.services.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => handleArrayChange(index, 'services', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Corporate Law & Litigation" />
                  <button type="button" onClick={() => removeArrayItem(index, 'services')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-xl font-semibold">Key Achievements</h2>
              <button type="button" onClick={() => addArrayItem('keyAchievements')} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg flex items-center gap-1 text-sm font-medium">
                <Plus className="w-4 h-4" /> Add
              </button>
            </div>
            <div className="space-y-3">
              {formData.keyAchievements?.map((item, index) => (
                <div key={index} className="flex gap-2">
                  <input type="text" value={item} onChange={(e) => handleArrayChange(index, 'keyAchievements', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Advised on cross-border transactions..." />
                  <button type="button" onClick={() => removeArrayItem(index, 'keyAchievements')} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Qualifications Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-6 border-b pb-3">
            <h2 className="text-xl font-semibold">Qualifications</h2>
            <button type="button" onClick={addQualification} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded-lg flex items-center gap-1 text-sm font-medium">
              <Plus className="w-4 h-4" /> Add Qualification
            </button>
          </div>

          <div className="space-y-4">
            {formData.qualifications.map((qual, index) => (
              <div key={index} className="flex flex-col sm:flex-row gap-3 items-start p-4 border border-gray-100 bg-gray-50 rounded-lg">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1 w-full">
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Degree / Title</label>
                    <input type="text" value={qual.title} onChange={(e) => handleQualificationChange(index, 'title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Master of Laws (LL.M)" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Institution</label>
                    <input type="text" value={qual.institution} onChange={(e) => handleQualificationChange(index, 'institution', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. Harvard Law School" />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 mb-1">Years</label>
                    <input type="text" value={qual.years} onChange={(e) => handleQualificationChange(index, 'years', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="e.g. 2018 - 2020" />
                  </div>
                </div>
                <button type="button" onClick={() => removeQualification(index)} className="p-2 text-red-500 hover:bg-red-100 bg-white rounded-lg border border-red-200 self-end sm:self-center">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chamber Information Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 border-b pb-3">Chamber Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <textarea name="location" value={formData.chamberInfo.location} onChange={handleChamberInfoChange} rows={3} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="123 Legal Avenue, Suite 400..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Morning Appointment Time</label>
              <input type="text" name="morningTime" value={formData.chamberInfo.morningTime} onChange={handleChamberInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="10:00 AM - 1:00 PM" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Evening Appointment Time</label>
              <input type="text" name="eveningTime" value={formData.chamberInfo.eveningTime} onChange={handleChamberInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="5:00 PM - 8:30 PM" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Working Days</label>
              <input type="text" name="workingDays" value={formData.chamberInfo.workingDays} onChange={handleChamberInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Saturday to Thursday" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Closed Days Note</label>
              <input type="text" name="closedDays" value={formData.chamberInfo.closedDays} onChange={handleChamberInfoChange} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="Closed on Fridays & Public Holidays" />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            {isSaving ? "Saving Changes..." : "Save Profile"}
          </button>
        </div>

      </form>
    </div>
  );
}

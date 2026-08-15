"use client";

import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return null;
  }

  return (
    <button 
      onClick={() => router.back()} 
      className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}

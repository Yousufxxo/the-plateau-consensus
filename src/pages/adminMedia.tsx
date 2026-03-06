import React, { useState } from "react";
import {
  Upload, Search, Image, Video, FileText,
  Bell, ChevronDown, Grid, List, MoreVertical,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";

// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "IMAGES",    value: "12", icon: Image,    iconColor: "text-blue-500",   bgColor: "bg-blue-50 dark:bg-blue-950" },
  { label: "VIDEOS",    value: "5",  icon: Video,    iconColor: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
  { label: "AUDIO",     value: "3",  icon: FileText, iconColor: "text-green-500",  bgColor: "bg-green-50 dark:bg-green-950" },
  { label: "DOCUMENTS", value: "4",  icon: FileText, iconColor: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
];

const filterTabs = ["All Files", "Images", "Videos", "Documents"];

type MediaType = "image" | "video" | "document";

const mediaFiles: {
  id: number; name: string; size: string; dimensions?: string;
  uploader: string; date: string; category: string;
  type: MediaType; color: string;
}[] = [
  { id: 1, name: "election-rally-Jos.jpg",          size: "2.3 MB", dimensions: "1920×1080", uploader: "John Daniel",   date: "2026-02-15", category: "Events",    type: "image",    color: "bg-blue-100 dark:bg-blue-950" },
  { id: 2, name: "campaign-video-march.mp4",         size: "47 MB",  dimensions: "1280×720",  uploader: "Mary Long",     date: "2026-01-28", category: "Campaign",  type: "video",    color: "bg-purple-100 dark:bg-purple-950" },
  { id: 3, name: "voter-education-guide.pdf",        size: "1.1 MB", dimensions: undefined,   uploader: "Admin Team",    date: "2026-02-01", category: "Education", type: "document", color: "bg-orange-100 dark:bg-orange-950" },
  { id: 4, name: "polling-station-mhub.jpg",         size: "890 KB", dimensions: "1600×900",  uploader: "John Daniel",   date: "2026-02-18", category: "Logistics", type: "image",    color: "bg-blue-100 dark:bg-blue-950" },
  { id: 5, name: "community-meeting-highlights.mp4", size: "61 MB",  dimensions: "1920×1080", uploader: "Sarah Okonkwo", date: "2026-01-30", category: "Community", type: "video",    color: "bg-purple-100 dark:bg-purple-950" },
  { id: 6, name: "election-protocol-2026.pdf",       size: "2.8 MB", dimensions: undefined,   uploader: "Michael Gyeng", date: "2026-01-22", category: "Updates",   type: "document", color: "bg-orange-100 dark:bg-orange-950" },
  { id: 7, name: "agent-briefing-session.jpg",       size: "1.4 MB", dimensions: "1280×853",  uploader: "Grace Ayuba",   date: "2026-02-10", category: "Training",  type: "image",    color: "bg-blue-100 dark:bg-blue-950" },
  { id: 8, name: "constituency-report-q1.pdf",       size: "3.2 MB", dimensions: undefined,   uploader: "Ruth Choji",    date: "2026-02-20", category: "Reports",   type: "document", color: "bg-orange-100 dark:bg-orange-950" },
  { id: 9, name: "press-conference-february.mp4",    size: "88 MB",  dimensions: "1920×1080", uploader: "Admin Team",    date: "2026-02-14", category: "Media",     type: "video",    color: "bg-purple-100 dark:bg-purple-950" },
];

const categoryColors: Record<string, string> = {
  Events:    "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  Campaign:  "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  Education: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  Logistics: "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400",
  Community: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
  Updates:   "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  Training:  "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  Reports:   "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
  Media:     "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400",
};

function FileIcon({ type, color }: { type: MediaType; color: string }) {
  return (
    <div className={`w-full h-full ${color} flex items-center justify-center rounded-t-lg`}>
      {type === "image"    && <Image    size={32} className="text-blue-400" />}
      {type === "video"    && <Video    size={32} className="text-purple-400" />}
      {type === "document" && <FileText size={32} className="text-orange-400" />}
    </div>
  );
}

export default function MediaLibrary() {
  const [activeFilter, setActiveFilter] = useState("All Files");
  const [search, setSearch]             = useState("");
  const [viewMode, setViewMode]         = useState<"grid" | "list">("grid");

  const filtered = mediaFiles.filter((f) => {
    const matchSearch = f.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter =
      activeFilter === "All Files" ||
      (activeFilter === "Images"    && f.type === "image") ||
      (activeFilter === "Videos"    && f.type === "video") ||
      (activeFilter === "Documents" && f.type === "document");
    return matchSearch && matchFilter;
  });

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto min-w-0">

        {/* ── Top Bar ── */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 lg:hidden" />
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">23:27:07 UTC</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Bell size={18} className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors" />
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AD
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Administrator</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">admin@consensus.org</div>
              </div>
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500 ml-1" />
            </div>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div className="p-4 sm:p-6 space-y-5">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">MEDIA LIBRARY</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage images, videos, and documents</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 flex items-center gap-3 transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={card.iconColor} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none">{card.value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Storage Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">Storage Usage</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white">15.7%</p>
            </div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mb-3">15.7 MB / 100 MB used</div>
            <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-green-600 rounded-full" style={{ width: "15.7%" }} />
            </div>
          </div>

          {/* Toolbar */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 transition-colors">
            <div className="flex flex-wrap items-center gap-3 mb-3">
              <button className="h-9 px-4 flex items-center gap-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shrink-0">
                <Upload size={15} /> Upload Files
              </button>
              <div className="flex items-center gap-2 flex-wrap flex-1">
                {filterTabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveFilter(tab)}
                    className={`h-8 px-3 rounded-lg text-sm font-medium transition-colors ${
                      activeFilter === tab
                        ? "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 border border-transparent"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <Grid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                      : "text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <List size={15} />
                </button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-9 pl-9 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
              />
            </div>
          </div>

          {/* File count */}
          <p className="text-xs text-gray-500 dark:text-gray-400">Showing {filtered.length} files</p>

          {/* Grid View */}
          {viewMode === "grid" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map((file) => (
                <div key={file.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden group transition-colors">
                  <div className="h-36 relative">
                    <FileIcon type={file.type} color={file.color} />
                    <button className="absolute top-2 right-2 w-7 h-7 bg-white dark:bg-gray-800 rounded-lg shadow flex items-center justify-center text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical size={14} />
                    </button>
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate mb-0.5">{file.name}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-1.5">
                      {file.size}{file.dimensions ? ` · ${file.dimensions}` : ""}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{file.uploader}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{file.date}</p>
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-md ${categoryColors[file.category] ?? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}>
                      {file.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === "list" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    {["File", "Size", "Uploader", "Date", "Category", ""].map((h, i) => (
                      <th
                        key={i}
                        className={`text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3 ${
                          h === "Size"     ? "hidden sm:table-cell" :
                          h === "Uploader" ? "hidden md:table-cell" :
                          h === "Date"     ? "hidden lg:table-cell" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {filtered.map((file) => (
                    <tr key={file.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-lg ${file.color} flex items-center justify-center shrink-0`}>
                            {file.type === "image"    && <Image    size={16} className="text-blue-400" />}
                            {file.type === "video"    && <Video    size={16} className="text-purple-400" />}
                            {file.type === "document" && <FileText size={16} className="text-orange-400" />}
                          </div>
                          <p className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate max-w-[160px]">{file.name}</p>
                        </div>
                      </td>
                      <td className="px-4 py-3 hidden sm:table-cell">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{file.size}</span>
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{file.uploader}</span>
                      </td>
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{file.date}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${categoryColors[file.category] ?? "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"}`}>
                          {file.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <button className="w-7 h-7 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <MoreVertical size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
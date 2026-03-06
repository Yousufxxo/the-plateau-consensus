import React, { useState } from "react";
import {
  Search, Filter, Plus, Edit2, MoreVertical,
  FileText, CheckCircle, Clock, Eye,
  Bell, ChevronDown, Download,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";

// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "TOTAL ARTICLES", value: "5",     change: null,   positive: true, icon: FileText,    iconColor: "text-blue-500",   bgColor: "bg-blue-50 dark:bg-blue-950" },
  { label: "PUBLISHED",      value: "3",     change: null,   positive: true, icon: CheckCircle, iconColor: "text-green-500",  bgColor: "bg-green-50 dark:bg-green-950" },
  { label: "DRAFTS",         value: "2",     change: null,   positive: true, icon: Clock,       iconColor: "text-amber-500",  bgColor: "bg-amber-50 dark:bg-amber-950" },
  { label: "TOTAL VIEWS",    value: "8,191", change: "+18%", positive: true, icon: Eye,         iconColor: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
];

const categories = ["All", "Guidelines", "Education", "Analysis", "Technology", "Engagement"];

const articles = [
  {
    id: 1,
    title: "Election Day Protocols: A Complete Guide",
    status: "published",
    description: "Comprehensive guidelines for all polling agents on election day procedures...",
    author: "Michael Ejang",
    tags: ["Guidelines"],
    date: "Feb 20, 2025",
    views: "2,847",
  },
  {
    id: 2,
    title: "Understanding Voter Rights in Nigeria",
    status: "published",
    description: "An in-depth look at the fundamental rights of every Nigerian voter...",
    author: "Ruth Orod",
    tags: ["Education"],
    date: "Feb 25, 2025",
    views: "1,021",
  },
  {
    id: 3,
    title: "The Role of Independent Observers",
    status: "draft",
    description: "How independent election observers contribute to transparent elections...",
    author: "Grace Isubu",
    tags: ["Analysis"],
    date: "Feb 28, 2025",
    views: null,
  },
  {
    id: 4,
    title: "Digital Tools for Election Monitoring",
    status: "published",
    description: "Leveraging technology to ensure free and fair electoral processes...",
    author: "Jane Dantsal",
    tags: ["Technology"],
    date: "Mar 1, 2024",
    views: "3,621",
  },
  {
    id: 5,
    title: "Community Engagement Best Practices",
    status: "draft",
    description: "Building trust through effective communication with local communities...",
    author: "Sinok Chiukwu",
    tags: ["Engagement"],
    date: "Mar 3, 2025",
    views: null,
  },
];

const statusStyle: Record<string, string> = {
  published: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  draft:     "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
};

export default function BlogAndArticles() {
  const [activeTab, setActiveTab]     = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenu, setOpenMenu]       = useState<number | null>(null);

  const filtered = articles.filter((a) => {
    const matchesTab    = activeTab === "All" || a.tags.includes(activeTab);
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          a.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto min-w-0">

        {/* ── Top Bar ── */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
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

          {/* Title + Export */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">BLOG & ARTICLES</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Content management and publishing</p>
            </div>
            <button className="h-8 px-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors shrink-0">
              <Download size={13} /> Export
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide leading-tight">{card.label}</p>
                    <div className={`w-8 h-8 rounded-lg ${card.bgColor} flex items-center justify-center shrink-0`}>
                      <Icon size={15} className={card.iconColor} strokeWidth={1.8} />
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white leading-none mb-1">{card.value}</p>
                  {card.change && (
                    <p className={`text-xs font-semibold ${card.positive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                      ↑ {card.change}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Search + New Article */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 h-9 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
              />
            </div>
            <div className="flex items-center gap-2">
              <button className="h-9 px-4 flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Filter size={14} /> Filter
              </button>
              <button className="h-9 px-4 flex items-center gap-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                <Plus size={15} /> New Article
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`h-8 px-4 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  activeTab === cat
                    ? "bg-green-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles List */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
            {filtered.length === 0 ? (
              <div className="p-10 text-center text-gray-400 dark:text-gray-500 text-sm">
                No articles found.
              </div>
            ) : (
              <div className="divide-y divide-gray-50 dark:divide-gray-700">
                {filtered.map((article) => (
                  <div
                    key={article.id}
                    className="flex items-start justify-between px-5 py-4 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors group"
                  >
                    {/* Left */}
                    <div className="flex-1 min-w-0 pr-4">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                          {article.title}
                        </span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-md uppercase tracking-wide ${statusStyle[article.status]}`}>
                          {article.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2 leading-relaxed line-clamp-1">
                        {article.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-gray-500">
                        <span>By <span className="text-gray-600 dark:text-gray-300 font-medium">{article.author}</span></span>
                        {article.tags.map((tag) => (
                          <span key={tag} className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                        <span>{article.date}</span>
                        {article.views && (
                          <span className="flex items-center gap-1">
                            <Eye size={11} /> {article.views} views
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-1 shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                        <Edit2 size={14} className="text-gray-500 dark:text-gray-400" />
                      </button>
                      <div className="relative">
                        <button
                          onClick={() => setOpenMenu(openMenu === article.id ? null : article.id)}
                          className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        >
                          <MoreVertical size={14} className="text-gray-500 dark:text-gray-400" />
                        </button>
                        {openMenu === article.id && (
                          <div className="absolute right-0 top-8 z-10 w-36 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-lg py-1">
                            {["View", "Edit", "Duplicate", "Delete"].map((action) => (
                              <button
                                key={action}
                                onClick={() => setOpenMenu(null)}
                                className={`w-full text-left px-4 py-2 text-xs font-medium transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                                  action === "Delete"
                                    ? "text-red-500"
                                    : "text-gray-700 dark:text-gray-300"
                                }`}
                              >
                                {action}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Close dropdown on outside click */}
      {openMenu !== null && (
        <div className="fixed inset-0 z-0" onClick={() => setOpenMenu(null)} />
      )}
    </div>
  );
}
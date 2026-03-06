import { useState } from "react";
import {
  Search, Bell, Settings, BarChart2, HelpCircle,
  Megaphone, MessageSquare, ChevronLeft, ChevronRight,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";


// ── Hardcoded data (replace with API later) ──────────────────────────────────

const stats = [
  { label: "Topics", value: "8", change: "+2 pts" },
  { label: "Total Discussions", value: "2,847", change: "+14" },
  { label: "Filters", value: "7", change: "+2" },
  { label: "Flagged Posts", value: "1", change: "" },
];

const categories = [
  {
    icon: Megaphone,
    title: "Election Updates",
    description: "Stay up-to-date with the latest election news and announcements",
    topics: 342,
    replies: 1541,
    iconColor: "text-indigo-600",
    iconBg: "bg-indigo-50 dark:bg-indigo-950",
  },
  {
    icon: BarChart2,
    title: "Polling UVS Reports",
    description: "Share and discuss polling data and reports from your area",
    topics: 1230,
    replies: 4532,
    iconColor: "text-cyan-600",
    iconBg: "bg-cyan-50 dark:bg-cyan-950",
  },
  {
    icon: MessageSquare,
    title: "General Discussion",
    description: "Open forum for community discussions and conversations",
    topics: 508,
    replies: 4532,
    iconColor: "text-green-600",
    iconBg: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: HelpCircle,
    title: "Help & Support",
    description: "Get help and find answers to your questions",
    topics: 87,
    replies: 823,
    iconColor: "text-orange-600",
    iconBg: "bg-orange-50 dark:bg-orange-950",
  },
];

const discussions = [
  {
    id: 1,
    title: "Results Upload Issues at Ward 12 - Jos North",
    tag: "Election Updates",
    tagClass: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    author: "Emmanuel Okong",
    initials: "EO",
    replies: 24,
    views: 193,
    likes: 12,
    status: "online",
    lastActive: "2 mins ago",
  },
  {
    id: 2,
    title: "Best Practices for Voter Engagement in Rural Areas",
    tag: "General Discussion",
    tagClass: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    author: "Grace Matthew",
    initials: "GM",
    replies: 41,
    views: 63,
    likes: 7,
    status: "online",
    lastActive: "5 mins ago",
  },
  {
    id: 3,
    title: "Election Day Protocol Clarifications",
    tag: "Election Updates",
    tagClass: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    author: "Mfesse Ubong",
    initials: "MU",
    replies: 88,
    views: 5011,
    likes: 34,
    status: "offline",
    lastActive: "27 mins ago",
  },
  {
    id: 4,
    title: "Technical Issues with Mobile App Login",
    tag: "Help & Support",
    tagClass: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    author: "Kechi Ify",
    initials: "KI",
    replies: 10,
    views: 6,
    likes: 2,
    status: "partial",
    lastActive: "1 hr ago",
  },
  {
    id: 5,
    title: "Collation Center Security Measures Discussion",
    tag: "General Discussion",
    tagClass: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    author: "John Doe",
    initials: "JD",
    replies: 34,
    views: 41,
    likes: 9,
    status: "online",
    lastActive: "2 hrs ago",
  },
  {
    id: 6,
    title: "Volunteer Coordination for Rebase Control",
    tag: "Election Updates",
    tagClass: "bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400",
    author: "Sarah Leke",
    initials: "SL",
    replies: 54,
    views: 32,
    likes: 11,
    status: "online",
    lastActive: "3 hrs ago",
  },
  {
    id: 7,
    title: "Reporting Suspicious Activities - Guidelines",
    tag: "Help & Support",
    tagClass: "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
    author: "Sunlit Morg",
    initials: "SM",
    replies: 18,
    views: 44,
    likes: 6,
    status: "flagged",
    lastActive: "4 hrs ago",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const statusConfig = {
  online:  { dot: "bg-green-500",  badge: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",     label: "Active"  },
  offline: { dot: "bg-gray-400",   badge: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",        label: "Offline" },
  partial: { dot: "bg-yellow-400", badge: "bg-yellow-50 text-yellow-600 dark:bg-yellow-950 dark:text-yellow-400", label: "Partial" },
  flagged: { dot: "bg-red-500",    badge: "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400",             label: "Flagged" },
};

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, change }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 transition-colors">
      <div className="text-2xl font-extrabold text-gray-900 dark:text-white">{value}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{label}</div>
      {change && <div className="text-xs text-green-600 dark:text-green-400 font-medium mt-1">{change}</div>}
    </div>
  );
}

function CategoryCard({ icon: Icon, title, description, topics, replies, iconColor, iconBg }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:shadow-md transition-all cursor-pointer">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconBg} ${iconColor}`}>
        <Icon size={18} />
      </div>
      <div className="text-sm font-bold text-gray-900 dark:text-white mb-1">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">{description}</div>
      <div className="flex gap-3 text-xs text-gray-400 dark:text-gray-500 font-medium">
        <span>{topics} Topics</span>
        <span>{replies} Replies</span>
      </div>
    </div>
  );
}

function DiscussionRow({ item }) {
  const s = statusConfig[item.status] || statusConfig.offline;
  return (
    <tr className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
      {/* Topic */}
      <td className="px-4 py-3 min-w-[220px]">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 text-xs font-bold flex items-center justify-center flex-shrink-0">
            {item.initials}
          </div>
          <div>
            <div className="text-sm font-semibold text-gray-900 dark:text-white leading-snug mb-1">
              {item.title}
            </div>
            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${item.tagClass}`}>
              {item.tag}
            </span>
          </div>
        </div>
      </td>
      {/* Author */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{item.author}</div>
        <div className="text-[10px] text-gray-400 dark:text-gray-500">Author</div>
      </td>
      {/* Replies */}
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.replies}</span>
      </td>
      {/* Views */}
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.views}</span>
      </td>
      {/* Likes */}
      <td className="px-4 py-3 text-center">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{item.likes}</span>
      </td>
      {/* Status */}
      <td className="px-4 py-3 text-center">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${s.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
          {s.label}
        </span>
      </td>
      {/* Last Active */}
      <td className="px-4 py-3 text-right whitespace-nowrap">
        <span className="text-xs text-gray-400 dark:text-gray-500">{item.lastActive}</span>
      </td>
    </tr>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function CommunityForum() {
  const [search, setSearch] = useState("");

  const filtered = discussions.filter((d) =>
    d.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Community Forum</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                Moderate discussions and manage forum categories
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Bell size={16} />
              </button>
              <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg p-2 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                <Settings size={16} />
              </button>
              {/* Theme toggle lives here in the header */}
              <ThemeToggle />
              <div className="flex items-center gap-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg px-3 py-1.5">
                <div className="w-6 h-6 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                  AI
                </div>
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Admin User</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
            {stats.map((s) => <StatCard key={s.label} {...s} />)}
          </div>

          {/* Categories */}
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Forum Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
            {categories.map((c) => <CategoryCard key={c.title} {...c} />)}
          </div>

          {/* Recent Discussions */}
          <h2 className="text-sm font-bold text-gray-900 dark:text-white mb-3">Recent Discussions</h2>
          <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden transition-colors">

            {/* Search */}
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
              <div className="relative w-full max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search threads..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 dark:focus:ring-indigo-900 focus:border-indigo-300 text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 transition-colors"
                />
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-750 border-b border-gray-100 dark:border-gray-700">
                    {["Topic", "Author", "Replies", "Views", "Likes", "Status", "Last Active"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-2.5 text-left text-[10px] font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wide whitespace-nowrap"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((item) => <DiscussionRow key={item.id} item={item} />)}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-xs text-gray-400 dark:text-gray-500">
                        No discussions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 border-t border-gray-100 dark:border-gray-700">
              <span className="text-xs text-gray-400 dark:text-gray-500">
                Showing 1–{filtered.length} of {discussions.length}
              </span>
              <div className="flex items-center gap-1">
                <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <ChevronLeft size={14} />
                </button>
                {[1, 2, 3].map((n) => (
                  <button
                    key={n}
                    className={`border rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                      n === 1
                        ? "bg-indigo-600 border-indigo-600 text-white"
                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {n}
                  </button>
                ))}
                <button className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-md p-1.5 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
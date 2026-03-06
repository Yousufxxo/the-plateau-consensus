import React, { useState } from "react";
import {
  Search, Filter, Download, UserPlus,
  Users, UserCheck, Clock, Handshake,
  ChevronLeft, ChevronRight, MoreVertical,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";

// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "Total Users",          value: "12,847", icon: Users,     iconColor: "text-green-600",  bgColor: "bg-green-50 dark:bg-green-950" },
  { label: "Active Users",         value: "11,234", icon: UserCheck, iconColor: "text-blue-600",   bgColor: "bg-blue-50 dark:bg-blue-950" },
  { label: "Pending Verification", value: "1,613",  icon: Clock,     iconColor: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
  { label: "Agents",               value: "384",    icon: Handshake, iconColor: "text-purple-600", bgColor: "bg-purple-50 dark:bg-purple-950" },
];

const roleColors: Record<string, string> = {
  "Election Coordinator": "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  "Field Agent":          "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  "Training Manager":     "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-400",
  "Content Manager":      "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-400",
  "Intelligence Officer": "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  "Communications Lead":  "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
};

const users = [
  { id: 1, name: "Sarah Okonkwo",   email: "sarah.o@consensus.org",     role: "Election Coordinator", region: "Plateau North",   status: "active",   joined: "Nov 15, 2025" },
  { id: 2, name: "John Danladi",    email: "john.d@consensus.org",      role: "Field Agent",          region: "Jos North",       status: "active",   joined: "Dec 3, 2025" },
  { id: 3, name: "Grace Ayuba",     email: "grace.a@adminconsensus.ng", role: "Training Manager",     region: "Plateau Central", status: "active",   joined: "Oct 22, 2025" },
  { id: 4, name: "Michael Gyeng",   email: "m.gyeng@consensus.org",     role: "Content Manager",      region: "Jos South",       status: "active",   joined: "Nov 8, 2025" },
  { id: 5, name: "Blessing Pam",    email: "blessing@consensus.org",    role: "Field Agent",          region: "Pankshin",        status: "inactive", joined: "Sep 30, 2025" },
  { id: 6, name: "David Gowan",     email: "d.gowan@consensus.org",     role: "Intelligence Officer", region: "Barkin Ladi",     status: "active",   joined: "Jan 5, 2026" },
  { id: 7, name: "Ruth Choji",      email: "ruth.choji@consensus.org",  role: "Communications Lead",  region: "Plateau South",   status: "active",   joined: "Dec 19, 2025" },
  { id: 8, name: "Emmanuel Yakubu", email: "e.yakubu@consensus.org",    role: "Field Agent",          region: "Shendam",         status: "active",   joined: "Feb 1, 2026" },
];

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

const avatarColors = [
  "bg-green-600", "bg-blue-600", "bg-purple-600", "bg-pink-600",
  "bg-orange-500", "bg-teal-600", "bg-red-600", "bg-indigo-600",
];

export default function UsersPage() {
  const [activePage, setActivePage] = useState("Users");
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col overflow-auto min-w-0">

        {/* ── Top Bar ── */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 lg:hidden" />
            <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-sm">
              VOTING ONGOING
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">22:17:07 UTC</span>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
              AD
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Administrator</div>
              <div className="text-xs text-gray-400 dark:text-gray-500">admin@consensus.org</div>
            </div>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div className="p-4 sm:p-6 space-y-5">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">USERS</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Manage user accounts, roles, and permissions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm flex items-center gap-3 transition-colors"
                >
                  <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center shrink-0`}>
                    <Icon size={18} className={card.iconColor} strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900 dark:text-white leading-none">{card.value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{card.label}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Table Card */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">

            {/* Search + Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 border-b border-gray-100 dark:border-gray-700">
              <div className="relative flex-1 max-w-sm">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search users by name, email, or role..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full h-9 pl-9 pr-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="h-9 px-3 flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Filter size={14} /> Filter
                </button>
                <button className="h-9 px-3 flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <Download size={14} /> Export
                </button>
                <button className="h-9 px-4 flex items-center gap-1.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  <UserPlus size={14} /> Add User
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    {["User", "Role", "Region", "Status", "Joined", "Actions"].map((h) => (
                      <th
                        key={h}
                        className={`text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3 ${
                          h === "Region" ? "hidden md:table-cell" :
                          h === "Joined" ? "hidden lg:table-cell" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {filtered.map((user, i) => (
                    <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">

                      {/* User */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-9 h-9 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                            {getInitials(user.name)}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">{user.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-md ${roleColors[user.role] ?? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400"}`}>
                          {user.role}
                        </span>
                      </td>

                      {/* Region */}
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{user.region}</span>
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                          user.status === "active"
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${user.status === "active" ? "bg-green-500" : "bg-gray-400"}`} />
                          {user.status}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-4 py-3 hidden lg:table-cell">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.joined}</span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between px-4 py-3 border-t border-gray-100 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">{filtered.length}</span>{" "}
                of{" "}
                <span className="font-medium text-gray-700 dark:text-gray-300">{users.length}</span>{" "}
                users
              </p>
              <div className="flex items-center gap-2">
                <button className="h-8 px-3 flex items-center gap-1 text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-40 transition-colors">
                  <ChevronLeft size={14} /> Previous
                </button>
                <button className="h-8 px-3 flex items-center gap-1 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import {
  Users, Award, MapPin, TrendingUp, Bell, ChevronDown,
} from "lucide-react";

Sidebar
import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";

// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "ACTIVE AGENTS",         value: "384", change: "+12%", positive: true, icon: Users,      iconColor: "text-blue-500",   bgColor: "bg-blue-50 dark:bg-blue-950" },
  { label: "NATIONAL COORDINATORS", value: "1",   change: null,   positive: true, icon: Award,      iconColor: "text-yellow-500", bgColor: "bg-yellow-50 dark:bg-yellow-950" },
  { label: "STATE COORDINATORS",    value: "37",  change: null,   positive: true, icon: MapPin,     iconColor: "text-green-600",  bgColor: "bg-green-50 dark:bg-green-950" },
  { label: "AVG. PERFORMANCE",      value: "94%", change: "+3%",  positive: true, icon: TrendingUp, iconColor: "text-green-500",  bgColor: "bg-green-50 dark:bg-green-950" },
];

const filterTabs = ["All", "National", "State", "LGA", "Ward"];

const hierarchy = [
  {
    id: "DEB",
    name: "Dr. Emmanuel Bako",
    role: "National Coordinator",
    lgas: 37,
    reports: 2847,
    performance: 96,
    isTop: true,
    color: "bg-yellow-500",
    subordinates: [
      { id: "SO", name: "Sarah Okonkwo", role: "Plateau North Coordinator",   lgas: 12, reports: 892,  score: 94, color: "bg-green-600" },
      { id: "JD", name: "John Danladi",  role: "Plateau Central Coordinator", lgas: 15, reports: 1124, score: 98, color: "bg-blue-600" },
      { id: "GA", name: "Grace Ayuba",   role: "Plateau South Coordinator",   lgas: 10, reports: 831,  score: 92, color: "bg-purple-600" },
    ],
  },
];

const topPerformers = [
  { rank: 1, id: "SO", name: "Sarah Okonkwo", region: "Plateau North",   reports: 882,  accuracy: 98, response: "12 min", color: "bg-green-600" },
  { rank: 2, id: "JD", name: "John Danladi",  region: "Plateau Central", reports: 1124, accuracy: 97, response: "15 min", color: "bg-blue-600" },
  { rank: 3, id: "GA", name: "Grace Ayuba",   region: "Plateau South",   reports: 831,  accuracy: 96, response: "18 min", color: "bg-purple-600" },
  { rank: 4, id: "DG", name: "David Gowon",   region: "Barkin Ladi",     reports: 674,  accuracy: 85, response: "14 min", color: "bg-orange-500" },
  { rank: 5, id: "RC", name: "Ruth Choji",    region: "Jos South",       reports: 543,  accuracy: 94, response: "16 min", color: "bg-teal-600" },
];

function ScoreBadge({ value }: { value: number }) {
  const color =
    value >= 95 ? "text-green-600 dark:text-green-400" :
    value >= 90 ? "text-blue-600 dark:text-blue-400" :
                  "text-amber-500 dark:text-amber-400";
  return <span className={`text-sm font-bold ${color}`}>{value}%</span>;
}

export default function AgentsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

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
              PI
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <div>
                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Administrator</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">pictdaptsg@gmail.com</div>
              </div>
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500" />
            </div>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div className="p-4 sm:p-6 space-y-5">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">AGENTS</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Manage field agents, hierarchies, and performance metrics
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 shadow-sm transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide leading-tight">
                      {card.label}
                    </p>
                    <div className={`w-9 h-9 rounded-lg ${card.bgColor} flex items-center justify-center shrink-0`}>
                      <Icon size={17} className={card.iconColor} strokeWidth={1.8} />
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

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeFilter === tab
                    ? "bg-green-700 text-white"
                    : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Main Grid — Hierarchy + Top Performers */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            {/* Agent Hierarchy */}
            <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
              <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-5">
                Agent Hierarchy
              </h2>

              {hierarchy.map((head) => (
                <div key={head.id}>
                  {/* Top-level agent */}
                  <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-750 border border-gray-200 dark:border-gray-600 mb-3">
                    <div className={`w-12 h-12 rounded-full ${head.color} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                      {head.id}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-gray-900 dark:text-white">{head.name}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{head.role}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-center shrink-0">
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{head.lgas}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Supervised</p>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">{head.reports}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">Reports</p>
                      </div>
                      <div>
                        <ScoreBadge value={head.performance} />
                        <p className="text-xs text-gray-400 dark:text-gray-500">Performance</p>
                      </div>
                    </div>
                  </div>

                  {/* Subordinates */}
                  <div className="ml-6 space-y-2 border-l-2 border-gray-100 dark:border-gray-700 pl-4">
                    {head.subordinates.map((agent) => (
                      <div
                        key={agent.id}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors border border-gray-100 dark:border-gray-700"
                      >
                        <div className={`w-9 h-9 rounded-full ${agent.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                          {agent.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">{agent.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{agent.role}</p>
                        </div>
                        <div className="hidden sm:flex items-center gap-5 text-center shrink-0">
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{agent.lgas}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">LGAs</p>
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{agent.reports}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500">Reports</p>
                          </div>
                          <div>
                            <ScoreBadge value={agent.score} />
                            <p className="text-xs text-gray-400 dark:text-gray-500">Score</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Top Performers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
              <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-5">
                Top Performers
              </h2>
              <div className="space-y-3">
                {topPerformers.map((agent) => (
                  <div
                    key={agent.rank}
                    className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                  >
                    {/* Rank + Avatar */}
                    <div className="relative shrink-0">
                      <div className={`w-9 h-9 rounded-full ${agent.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {agent.id}
                      </div>
                      <span className="absolute -top-1 -left-1 w-4 h-4 bg-gray-800 dark:bg-gray-600 text-white text-xs rounded-full flex items-center justify-center font-bold leading-none">
                        {agent.rank}
                      </span>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">{agent.name}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mb-2">{agent.region}</p>
                      <div className="grid grid-cols-3 gap-1 text-center">
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{agent.reports}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">Reports</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-green-600 dark:text-green-400">{agent.accuracy}%</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">Accuracy</p>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-gray-900 dark:text-white">{agent.response}</p>
                          <p className="text-xs text-gray-400 dark:text-gray-500">Response</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
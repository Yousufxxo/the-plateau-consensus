import React, { useState } from "react";
import {
  Users, UserCheck, FileText, TrendingUp,
  AlertTriangle, Target, BarChart2, Bell, Settings,
} from "lucide-react";


import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";

// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "TOTAL USERS",        value: "12,847", change: "+10%", positive: true,  icon: Users },
  { label: "ACTIVE AGENTS",      value: "384",    change: "+15%", positive: true,  icon: UserCheck },
  { label: "TOTAL REPORTS",      value: "2,847",  change: "+12%", positive: true,  icon: FileText },
  { label: "VERIFIED REPORTS",   value: "1,923",  change: "+8%",  positive: true,  icon: TrendingUp },
  { label: "CRITICAL INCIDENTS", value: "42",     change: "-5%",  positive: false, icon: AlertTriangle },
  { label: "REGIONS REPORTING",  value: "36/37",  change: "+97%", positive: true,  icon: Target },
];

const regionalData = [
  { region: "Plateau North",   active: 300, warning: 120, critical: 80 },
  { region: "Plateau Central", active: 320, warning: 150, critical: 60 },
  { region: "Plateau South",   active: 260, warning: 100, critical: 90 },
];

const criticalAlerts = [
  {
    id: 1,
    level: "error",
    text: "Crowd gathering reported near central collation center in Jos North Ward 5.",
    time: "Jos North",
  },
  {
    id: 2,
    level: "warning",
    text: "2 polling units in Pankshin LGA showing delayed opening times.",
    time: "Pankshin",
  },
  {
    id: 3,
    level: "warning",
    text: "Communication breakdown with 5 agents in Barkin Ladi senatorial zone.",
    time: "Barkin Ladi",
  },
];

const recentActivity = [
  { time: "2 mins ago",  text: "Sarah Okonkwo submitted a verified report from Ward 12, Pankshin LGA." },
  { time: "8 mins ago",  text: "John Danladi flagged potential irregularity at Polling Unit 034." },
  { time: "15 mins ago", text: "Grace Ayuba completed agent training for Jos North senatorial district." },
  { time: "32 mins ago", text: "Michael Gyeng published article 'Election Day Protocols'." },
  { time: "41 mins ago", text: "Admin Team approved 12 new forum moderators." },
];

// --- Bar Chart ---
function BarChart({ data }: { data: typeof regionalData }) {
  const maxVal = 380;
  const bars = [
    { key: "active",   color: "bg-green-600" },
    { key: "warning",  color: "bg-amber-400" },
    { key: "critical", color: "bg-red-500" },
  ] as const;

  return (
    <div>
      <div className="flex gap-4 sm:gap-6 items-end h-40 px-2">
        {data.map((item) => (
          <div key={item.region} className="flex-1 flex flex-col items-center">
            <div className="flex items-end gap-1 h-32">
              {bars.map(({ key, color }) => (
                <div
                  key={key}
                  className={`w-4 rounded-t-sm ${color}`}
                  style={{ height: `${(item[key] / maxVal) * 128}px` }}
                />
              ))}
            </div>
            <span className="text-xs text-gray-500 dark:text-gray-400 text-center mt-2 leading-tight">
              {item.region}
            </span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mt-4 justify-center flex-wrap">
        {bars.map(({ key, color }) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${color}`} />
            <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Dashboard ---
export default function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard Overview");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      <div className="flex-1 flex flex-col overflow-auto min-w-0">

        {/* ── Top Bar ── */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 transition-colors">
          {/* Left */}
          <div className="flex items-center gap-3">
            <div className="w-10 lg:hidden" />
            <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-sm flex items-center gap-1.5">
              VOTING ONGOING
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">22:17:07 UTC</span>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3 sm:gap-4">
            <ThemeToggle />
            <Bell size={18} className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors" />
            <Settings size={18} className="text-gray-500 dark:text-gray-400 cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors hidden sm:block" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-green-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                AD
              </div>
              <div className="hidden sm:block">
                <div className="text-sm font-semibold text-gray-900 dark:text-white leading-tight">Administrator</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">admin@consensus.org</div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div className="p-4 sm:p-6 space-y-5">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              DASHBOARD OVERVIEW
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              Real-time monitoring of civic engagement across all regions
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.label}
                  className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex justify-between items-start shadow-sm transition-colors"
                >
                  <div>
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide mb-2">
                      {card.label}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white leading-none mb-1.5">
                      {card.value}
                    </p>
                    <p className={`text-xs font-semibold ${card.positive ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400"}`}>
                      {card.change}
                    </p>
                  </div>
                  <Icon size={20} strokeWidth={1.5} className="text-gray-300 dark:text-gray-600 mt-1" />
                </div>
              );
            })}
          </div>

          {/* Chart + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Bar Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-5">
                <BarChart2 size={14} className="text-green-600" />
                Regional Reports Distribution
              </div>
              <BarChart data={regionalData} />
            </div>

            {/* Critical Alerts */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm transition-colors">
              <div className="flex items-center gap-2 text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
                <AlertTriangle size={14} className="text-green-600" />
                Critical Alerts
              </div>
              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {criticalAlerts.map((alert) => (
                  <div key={alert.id} className="flex gap-3 py-3">
                    <AlertTriangle
                      size={15}
                      className={`shrink-0 mt-0.5 ${alert.level === "error" ? "text-red-500" : "text-amber-500"}`}
                    />
                    <div>
                      <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{alert.text}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="text-xs text-green-600 dark:text-green-400 font-semibold mt-3 w-full text-right hover:text-green-700 dark:hover:text-green-300 transition-colors">
                View All Alerts →
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-5 shadow-sm transition-colors">
            <p className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
              Recent Activity
            </p>
            <div className="divide-y divide-gray-100 dark:divide-gray-700">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:gap-6 py-3">
                  <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap sm:min-w-[90px] mb-0.5 sm:mb-0">
                    {item.time}
                  </span>
                  <span className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
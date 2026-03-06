import React, { useState } from "react";
import {
  Calendar, Clock, MapPin, Users, Bell,
  ChevronDown, Search, Filter, Plus,
} from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";

// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "TOTAL EVENTS",    value: "247",   change: "+18",  positive: true, icon: Calendar, iconColor: "text-green-500",  bgColor: "bg-green-50 dark:bg-green-950" },
  { label: "UPCOMING",        value: "42",    change: null,   positive: true, icon: Clock,    iconColor: "text-blue-500",   bgColor: "bg-blue-50 dark:bg-blue-950" },
  { label: "TOTAL ATTENDEES", value: "8,743", change: "+12%", positive: true, icon: Users,    iconColor: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
  { label: "THIS MONTH",      value: "18",    change: null,   positive: true, icon: Calendar, iconColor: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
];

type EventCategory = "TRAINING" | "TOWNHALL" | "FORUM" | "SUMMIT" | "WORKSHOP";

const categoryColors: Record<EventCategory, string> = {
  TRAINING: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
  TOWNHALL: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  FORUM:    "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-400",
  SUMMIT:   "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-400",
  WORKSHOP: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-400",
};

const events: {
  id: number; category: EventCategory; status: string;
  title: string; date: string; time: string; location: string;
  registered: number; capacity: number;
}[] = [
  {
    id: 1, category: "TRAINING", status: "upcoming",
    title: "Agent Training Workshop - Jos North",
    date: "Sun, Mar 8, 2026", time: "09:00 AM",
    location: "Jos North Community Hall",
    registered: 124, capacity: 150,
  },
  {
    id: 2, category: "TOWNHALL", status: "upcoming",
    title: "Town Hall Meeting - Pankshin LGA",
    date: "Tue, Mar 10, 2026", time: "02:00 PM",
    location: "Pankshin Central Square",
    registered: 89, capacity: 200,
  },
  {
    id: 3, category: "FORUM", status: "upcoming",
    title: "Youth Engagement Forum",
    date: "Thu, Mar 12, 2026", time: "10:30 AM",
    location: "Plateau Youth Center",
    registered: 156, capacity: 180,
  },
  {
    id: 4, category: "SUMMIT", status: "upcoming",
    title: "Community Leaders Summit",
    date: "Sun, Mar 15, 2026", time: "11:00 AM",
    location: "Government House, Jos",
    registered: 67, capacity: 100,
  },
];

function RegistrationBar({ registered, capacity }: { registered: number; capacity: number }) {
  const pct = Math.round((registered / capacity) * 100);
  const color = pct >= 90 ? "bg-red-500" : pct >= 70 ? "bg-amber-500" : "bg-green-600";
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1">
          <Users size={11} /> {registered}/{capacity} registered
        </span>
      </div>
      <div className="w-full h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

export default function EventsActivities() {
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.location.toLowerCase().includes(search.toLowerCase())
  );

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
              <ChevronDown size={14} className="text-gray-400 dark:text-gray-500 ml-1" />
            </div>
          </div>
        </div>

        {/* ── Page Content ── */}
        <div className="p-4 sm:p-6 space-y-5">

          {/* Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">EVENTS & ACTIVITIES</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Manage events, trainings, and community activities</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {statsCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.label} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-4 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <p className="text-xs text-gray-400 dark:text-gray-500 font-medium tracking-wide">{card.label}</p>
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

          {/* Search + Create */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-9 pr-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-700 dark:text-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-colors shadow-sm"
              />
            </div>
            <div className="flex gap-2 shrink-0">
              <button className="h-10 px-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm transition-colors">
                <Filter size={14} /> Filter
              </button>
              <button className="h-10 px-4 flex items-center gap-2 text-sm font-semibold text-white bg-green-700 hover:bg-green-800 rounded-lg shadow-sm transition-colors">
                <Plus size={15} /> Create Event
              </button>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 flex flex-col gap-3 transition-colors"
              >
                {/* Category + status */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${categoryColors[event.category]}`}>
                    {event.category}
                  </span>
                  <span className="text-xs text-gray-400 dark:text-gray-500">{event.status}</span>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-gray-900 dark:text-white leading-snug">{event.title}</h3>

                {/* Meta */}
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Calendar size={13} className="shrink-0" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Clock size={13} className="shrink-0" />
                    {event.time}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <MapPin size={13} className="shrink-0" />
                    {event.location}
                  </div>
                </div>

                {/* Registration + CTA */}
                <div className="flex items-end justify-between gap-4 mt-auto pt-2">
                  <div className="flex-1">
                    <RegistrationBar registered={event.registered} capacity={event.capacity} />
                  </div>
                  <button className="shrink-0 h-8 px-4 text-xs font-semibold text-white bg-green-700 hover:bg-green-800 rounded-lg transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div className="col-span-2 text-center py-16 text-gray-400 dark:text-gray-500">
                <Calendar size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">No events found.</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
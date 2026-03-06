import React, { useState } from "react";
import {
  Bell, Database, Key, Shield, Users, ChevronDown,
  CheckCircle,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";


// --- Hardcoded Data (replace with API calls later) ---

const electionPhases = [
  { label: "Pre-Election",  desc: "Campaign and registration period", value: "pre" },
  { label: "Voting Day",    desc: "Active voting in progress",        value: "voting" },
  { label: "Collation",     desc: "Results aggregation phase",        value: "collation" },
  { label: "Post-Election", desc: "Analysis and reporting",           value: "post" },
];

const roles = [
  { role: "Administrator",        count: "3 users",      access: "Full Access" },
  { role: "Election Coordinator", count: "12 users",     access: "Manage Elections" },
  { role: "Field Agent",          count: "384 users",    access: "Report Submission" },
  { role: "Content Manager",      count: "9 users",      access: "Content Control" },
  { role: "Viewer",               count: "12,440 users", access: "Read Only" },
];

const securitySettings = [
  { label: "Two-Factor Authentication", value: "Enabled",    valueColor: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400" },
  { label: "Session Timeout",           value: "10 minutes", valueColor: "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300" },
  { label: "Password Policy",           value: "Strong",     valueColor: "text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300" },
  { label: "IP Whitelisting",           value: "Disabled",   valueColor: "text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400" },
  { label: "Audit Logging",             value: "Enabled",    valueColor: "text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400" },
];

const quickCards = [
  {
    icon: Bell,
    iconColor: "text-amber-500",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    title: "Notifications",
    desc: "Configure system-wide notification preferences and alert thresholds",
    link: "Manage Notifications →",
  },
  {
    icon: Database,
    iconColor: "text-blue-500",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    title: "Data & Backup",
    desc: "Database management, backups, and data export configurations",
    link: "Manage Data →",
  },
  {
    icon: Key,
    iconColor: "text-purple-500",
    bgColor: "bg-purple-50 dark:bg-purple-950",
    title: "API Keys",
    desc: "Manage API access tokens and integration credentials",
    link: "Manage Keys →",
  },
];

export default function SettingsPage() {
  const [activePhase, setActivePhase] = useState("voting");

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">SETTINGS</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">System configuration, security, and preferences</p>
          </div>

          {/* Election Phase Control */}
          <div className="bg-green-50 dark:bg-green-950 border border-green-100 dark:border-green-900 rounded-xl p-5 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <CheckCircle size={16} className="text-green-600 dark:text-green-400" />
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">ELECTION PHASE CONTROL</h2>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
              Select the current election phase to configure system behavior
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {electionPhases.map((phase) => {
                const isActive = activePhase === phase.value;
                return (
                  <button
                    key={phase.value}
                    onClick={() => setActivePhase(phase.value)}
                    className={`p-3 rounded-lg text-left transition-all border ${
                      isActive
                        ? "bg-green-700 border-green-700 text-white"
                        : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-green-300 dark:hover:border-green-700"
                    }`}
                  >
                    <p className={`text-sm font-semibold mb-1 ${isActive ? "text-white" : "text-gray-800 dark:text-gray-200"}`}>
                      {phase.label}
                    </p>
                    <p className={`text-xs leading-tight ${isActive ? "text-green-100" : "text-gray-400 dark:text-gray-500"}`}>
                      {phase.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Roles & Security Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* User Roles & Permissions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Users size={16} className="text-green-600" />
                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">USER ROLES & PERMISSIONS</h2>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                Manage user roles, access levels, and permission matrices
              </p>
              <div className="divide-y divide-gray-50 dark:divide-gray-700">
                {roles.map((item) => (
                  <div key={item.role} className="flex items-center justify-between py-2.5">
                    <div>
                      <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{item.role}</p>
                      <p className="text-xs text-gray-400 dark:text-gray-500">{item.count}</p>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-md font-medium">
                      {item.access}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors">
                Configure Settings →
              </button>
            </div>

            {/* Security Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} className="text-green-600" />
                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200">SECURITY SETTINGS</h2>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mb-4">
                Configure authentication, page management, and security policies
              </p>
              <div className="divide-y divide-gray-50 dark:divide-gray-700">
                {securitySettings.map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2.5">
                    <p className="text-sm text-gray-700 dark:text-gray-300">{item.label}</p>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${item.valueColor}`}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-4 text-sm text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors">
                Configure Settings →
              </button>
            </div>
          </div>

          {/* Quick Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {quickCards.map((card) => {
              const Icon = card.icon;
              return (
                <div key={card.title} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${card.bgColor} flex items-center justify-center mb-3`}>
                    <Icon size={18} className={card.iconColor} strokeWidth={1.8} />
                  </div>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-1">{card.title}</h3>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-relaxed mb-3">{card.desc}</p>
                  <button className="text-sm text-green-600 dark:text-green-400 font-semibold hover:text-green-700 dark:hover:text-green-300 transition-colors">
                    {card.link}
                  </button>
                </div>
              );
            })}
          </div>

          {/* System Information */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
            <h2 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider mb-4">
              System Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Version</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">v2.4.1</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Last Updated</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">March 1, 2026</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-1">Database Status</p>
                <span className="text-sm font-bold text-green-600 dark:text-green-400">● Operational</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Users, Handshake, Radio, Calculator,
  CalendarDays, FileText, MessageSquare, Image, Bell,
  Settings, ChevronLeft, ChevronRight, Menu, X,
} from "lucide-react";

const navItems = [
  { label: "Dashboard Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Users",              icon: Users,           path: "/admin/user-pages" },
  { label: "Agents",             icon: Handshake,       path: "/admin/agent" },
  // { label: "Situation Room",     icon: Radio,           path: "/admin/Situation-room" },
  { label: "Election Collation", icon: Calculator,      path: "/admin/election-collation" },
  { label: "Events & Activities",icon: CalendarDays,    path: "/admin/events" },
  { label: "Blog & Articles",    icon: FileText,        path: "/admin/blog" },
  { label: "Community Forum",    icon: MessageSquare,   path: "/admin/community-forum" },
  { label: "Media Library",      icon: Image,           path: "/admin/media" },
  { label: "Notifications",      icon: Bell,            path: "/admin/notifications" },
  { label: "Settings",           icon: Settings,        path: "/admin/settings" },
];

interface SidebarProps {
  activePage?: string;
  setActivePage?: (page: string) => void;
}

function NavList({ onSelect, collapsed }: { onSelect?: () => void; collapsed?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex-1 py-2">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;
        return (
          <div
            key={item.label}
            onClick={() => { navigate(item.path); onSelect?.(); }}
            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-all duration-150 border-l-[3px] whitespace-nowrap
              ${isActive
                ? "bg-green-50 dark:bg-green-950 border-green-600 text-green-700 dark:text-green-400 font-semibold"
                : "border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-800 dark:hover:text-gray-200"
              }`}
          >
            <Icon size={16} strokeWidth={1.8} className="shrink-0" />
            {!collapsed && <span className="text-sm">{item.label}</span>}
          </div>
        );
      })}
    </nav>
  );
}

export default function Sidebar({ activePage, setActivePage }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center text-gray-700 dark:text-gray-300 shadow-md"
      >
        <Menu size={20} />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile drawer */}
      <div className={`lg:hidden fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 z-50 flex flex-col transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          <img src="/brand-logo.png" alt="The Plateau Consensus" className="h-9" />
          <button
            onClick={() => setMobileOpen(false)}
            className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <X size={20} />
          </button>
        </div>
        <NavList onSelect={() => setMobileOpen(false)} />
      </div>

      {/* Desktop sidebar */}
      <div className={`hidden lg:flex ${collapsed ? "w-14" : "w-56"} min-h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex-col transition-all duration-200 overflow-hidden shrink-0`}>

        {/* Logo */}
        <div className="flex items-center gap-2 px-3 py-4 border-b border-gray-200 dark:border-gray-700">
          {!collapsed
            ? <img src="/brand-logo.png" alt="The Plateau Consensus" className="h-9" />
            : <div className="w-8 h-8 bg-green-700 rounded flex items-center justify-center text-white text-xs font-bold leading-tight text-center">PC</div>
          }
        </div>

        <NavList collapsed={collapsed} />

        {/* Collapse toggle */}
        <div
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 cursor-pointer text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 text-sm transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          {!collapsed && <span>Collapse</span>}
        </div>
      </div>
    </>
  );
}
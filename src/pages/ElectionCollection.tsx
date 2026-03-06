import { useState } from "react";
import {
  Download, Bell, ChevronDown, AlertTriangle,
  CheckCircle, Clock, BarChart2, FileText, TrendingUp,
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/ui/sidebar";


// --- Hardcoded Data (replace with API calls later) ---

const statsCards = [
  { label: "TOTAL REPORTS", value: "2,847", change: "+156", positive: true,  icon: FileText,     iconColor: "text-blue-500",  bgColor: "bg-blue-50 dark:bg-blue-950" },
  { label: "COLLATED",      value: "2,634", change: "+98",  positive: true,  icon: CheckCircle,  iconColor: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950" },
  { label: "PENDING",       value: "213",   change: null,   positive: true,  icon: Clock,        iconColor: "text-amber-500", bgColor: "bg-amber-50 dark:bg-amber-950" },
  { label: "DISPUTED",      value: "8",     change: null,   positive: false, icon: AlertTriangle,iconColor: "text-red-500",   bgColor: "bg-red-50 dark:bg-red-950" },
];

const progressLevels = [
  { label: "POLLING UNITS", done: 2634, total: 2847, pct: 93, subLabel: "2,213 Collated · 421 Pending", color: "bg-green-600" },
  { label: "WARDS",         done: 209,  total: 325,  pct: 64, subLabel: "256 Collated · 69 Declared",   color: "bg-blue-500" },
  { label: "LGAs",          done: 35,   total: 37,   pct: 95, subLabel: "32 Completed · 3 Cancelled",   color: "bg-green-500" },
  { label: "STATE",         done: 0,    total: 1,    pct: 0,  subLabel: "0 Completed · 1 Pending",      color: "bg-gray-300" },
];

const pollingResults = [
  { unit: "Unit A", consensus: 420, party2: 180, party3: 90 },
  { unit: "Unit B", consensus: 380, party2: 210, party3: 70 },
  { unit: "Unit C", consensus: 460, party2: 160, party3: 110 },
  { unit: "Unit D", consensus: 400, party2: 230, party3: 80 },
  { unit: "Unit E", consensus: 350, party2: 200, party3: 95 },
];

const partyDistribution = [
  { party: "Consensus Party", pct: 58, dot: "bg-green-600" },
  { party: "Party B",         pct: 27, dot: "bg-yellow-400" },
  { party: "Party C",         pct: 10, dot: "bg-blue-500" },
  { party: "Others",          pct: 5,  dot: "bg-gray-400" },
];

const wardResults = [
  { ward: "Ward 1", lga: "Jos North",    total: "4,523",  registered: "6,142", turnout: 73, status: "collated" },
  { ward: "Ward 2", lga: "Jos North",    total: "3,861",  registered: "6,142", turnout: 74, status: "collated" },
  { ward: "Ward 3", lga: "Jos South",    total: "2,934",  registered: "6,142", turnout: 72, status: "pending" },
  { ward: "Ward 4", lga: "Pankshin",     total: "7,088",  registered: "6,142", turnout: 75, status: "collated" },
  { ward: "Ward 5", lga: "Jos North Lad",total: "2,400",  registered: "6,142", turnout: 68, status: "audited" },
];

const senatorialDistricts = [
  { name: "Plateau North",   lgas: 4, wards: 48, puTotal: 1204, puDone: 1198, puPending: 6,  color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950",    headerColor: "text-blue-700 dark:text-blue-400" },
  { name: "Plateau Central", lgas: 3, wards: 36, puTotal: 892,  puDone: 884,  puPending: 8,  color: "border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-950", headerColor: "text-amber-700 dark:text-amber-400" },
  { name: "Plateau South",   lgas: 3, wards: 35, puTotal: 751,  puDone: 741,  puPending: 10, color: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950", headerColor: "text-green-700 dark:text-green-400" },
];

const bottomStats = [
  { label: "Preliminary Reports", value: "1,072", icon: FileText,    color: "text-blue-600 dark:text-blue-400" },
  { label: "Verified Results",    value: "856",   icon: CheckCircle, color: "text-green-600 dark:text-green-400" },
  { label: "Funded Reports",      value: "43",    icon: AlertTriangle,color: "text-red-500 dark:text-red-400" },
  { label: "Analytics Reports",   value: "127",   icon: TrendingUp,  color: "text-purple-600 dark:text-purple-400" },
];

const statusStyle: Record<string, string> = {
  collated: "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400",
  pending:  "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
  audited:  "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400",
};

// ── Bar Chart ─────────────────────────────────────────────────────────────────
function BarChart({ data }: { data: typeof pollingResults }) {
  const max = 500;
  return (
    <div>
      <div className="flex items-end gap-3 h-36 px-2">
        {data.map((item) => (
          <div key={item.unit} className="flex-1 flex flex-col items-center">
            <div className="flex items-end gap-0.5 h-28">
              <div className="w-3 rounded-t-sm bg-green-600"  style={{ height: `${(item.consensus / max) * 112}px` }} />
              <div className="w-3 rounded-t-sm bg-yellow-400" style={{ height: `${(item.party2 / max) * 112}px` }} />
              <div className="w-3 rounded-t-sm bg-blue-400"   style={{ height: `${(item.party3 / max) * 112}px` }} />
            </div>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">{item.unit}</span>
          </div>
        ))}
      </div>
      <div className="flex gap-4 mt-3 justify-center flex-wrap">
        {[["bg-green-600","Consensus"],["bg-yellow-400","Party B"],["bg-blue-400","Party C"]].map(([c,l]) => (
          <div key={l} className="flex items-center gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${c}`} />
            <span className="text-xs text-gray-500 dark:text-gray-400">{l}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Donut Chart ───────────────────────────────────────────────────────────────
function DonutChart() {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-32 h-32 rounded-full"
        style={{ background: "conic-gradient(#16a34a 0% 58%, #facc15 58% 85%, #3b82f6 85% 95%, #9ca3af 95% 100%)" }}
      />
      <div className="space-y-1.5 w-full">
        {partyDistribution.map((p) => (
          <div key={p.party} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${p.dot}`} />
              <span className="text-xs text-gray-600 dark:text-gray-400">{p.party}</span>
            </div>
            <span className="text-xs font-bold text-gray-800 dark:text-gray-200">{p.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ElectionCollation() {
  const [wardTab, setWardTab] = useState("Overview");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-auto min-w-0">

        {/* ── Top Bar ── */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-3">
            <div className="w-10 lg:hidden" />
            <span className="bg-green-600 text-white text-xs font-semibold px-2.5 py-1 rounded-sm flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
              COLLATION IN PROGRESS
            </span>
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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">ELECTION COLLATION</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Results aggregation and real-time election data</p>
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
                      {card.change}
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Collation Progress */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <BarChart2 size={15} className="text-green-600" />
                <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                  Collation Progress by Level
                </h2>
              </div>
              <button className="h-8 px-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition-colors">
                <Download size={13} /> Export Report
              </button>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {progressLevels.map((lvl) => (
                <div key={lvl.label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{lvl.label}</p>
                    <p className="text-xs font-bold text-gray-900 dark:text-white">{lvl.done}/{lvl.total}</p>
                  </div>
                  <div className="w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${lvl.color}`} style={{ width: `${lvl.pct}%` }} />
                  </div>
                  <p className="text-xs text-gray-400 dark:text-gray-500 leading-tight">{lvl.subLabel}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-4">
                Sample Polling Unit Results
              </h2>
              <BarChart data={pollingResults} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-4">
                Party Distribution
              </h2>
              <DonutChart />
            </div>
          </div>

          {/* Ward Level Results */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden transition-colors">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide">
                Ward-Level Results
              </h2>
              <div className="flex gap-2">
                {["Overview", "Senatorial Districts Report"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setWardTab(tab)}
                    className={`h-7 px-3 rounded-lg text-xs font-medium transition-colors ${
                      wardTab === tab
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
                    {["Ward", "LGA", "Total Votes", "Registered", "Turnout", "Status"].map((h) => (
                      <th
                        key={h}
                        className={`text-left text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide px-4 py-3 ${
                          h === "Registered" ? "hidden md:table-cell" :
                          h === "Turnout"    ? "hidden sm:table-cell" : ""
                        }`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-700">
                  {wardResults.map((row, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                      <td className="px-5 py-3 text-sm font-medium text-gray-800 dark:text-gray-200">{row.ward}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">{row.lga}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-gray-900 dark:text-white">{row.total}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">{row.registered}</td>
                      <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 hidden sm:table-cell">{row.turnout}%</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-md capitalize ${statusStyle[row.status]}`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Senatorial Districts Overview */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-5 transition-colors">
            <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 uppercase tracking-wide mb-4">
              Senatorial Districts Overview
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              {senatorialDistricts.map((d) => (
                <div key={d.name} className={`rounded-xl border p-4 ${d.color}`}>
                  <div className="flex items-center justify-between mb-3">
                    <p className={`text-sm font-bold ${d.headerColor}`}>{d.name}</p>
                    <CheckCircle size={14} className="text-green-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                    <div><span className="text-gray-400 dark:text-gray-500">LGAs</span><p className="font-bold text-gray-800 dark:text-gray-200">{d.lgas}</p></div>
                    <div><span className="text-gray-400 dark:text-gray-500">Wards</span><p className="font-bold text-gray-800 dark:text-gray-200">{d.wards}</p></div>
                    <div><span className="text-gray-400 dark:text-gray-500">Total PU</span><p className="font-bold text-gray-800 dark:text-gray-200">{d.puTotal.toLocaleString()}</p></div>
                    <div><span className="text-gray-400 dark:text-gray-500">Completed</span><p className="font-bold text-gray-800 dark:text-gray-200">{d.puDone.toLocaleString()}</p></div>
                  </div>
                  <div className="w-full h-1.5 bg-white/60 dark:bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-600 rounded-full"
                      style={{ width: `${Math.round((d.puDone / d.puTotal) * 100)}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-gray-400 dark:text-gray-500">{d.puPending} Pending</p>
                    <p className="text-xs font-semibold text-green-700 dark:text-green-400">
                      {Math.round((d.puDone / d.puTotal) * 100)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-100 dark:border-gray-700 pt-5">
              {bottomStats.map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="text-center">
                    <Icon size={18} className={`${s.color} mx-auto mb-1`} />
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{s.value}</p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">{s.label}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
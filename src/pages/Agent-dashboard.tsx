// import { useState } from "react";
// import {
//   LayoutDashboard, FileText, LogOut, MapPin, Plus,
//   AlertTriangle, CheckCircle2, Clock3, Eye, Edit3,
//   Calendar, Lightbulb, ChevronRight, TrendingUp
// } from "lucide-react";
// import { useNavigate, useLocation } from "react-router-dom";
// // import LogoutModal from "@/components/LogoutModal";
// // ── DATA ────────────────────────────────────────────────────────────────────
// const pollingUnits = [
//   { code: "PU-001", location: "City Hall Main Entrance", ward: "Ward 4", status: "Pending" },
//   { code: "PU-002", location: "Community Primary School", ward: "Ward 4", status: "Verified" },
//   { code: "PU-003", location: "Market Square South", ward: "Ward 4", status: "Flagged" },
//   { code: "PU-004", location: "Library Annex", ward: "Ward 4", status: "Not Started" },
// ];

// const statusStyle = {
//   Pending:     { bg: "#78350f", color: "#fcd34d", dot: "#f59e0b" },
//   Verified:    { bg: "#14532d", color: "#86efac", dot: "#22c55e" },
//   Flagged:     { bg: "#7f1d1d", color: "#fca5a5", dot: "#ef4444" },
//   "Not Started":{ bg: "#1e293b", color: "#94a3b8", dot: "#64748b" },
// };

// // ── SIDEBAR ──────────────────────────────────────────────────────────────────
// // const Sidebar = ({ active, setActive }) => (
// //   <aside style={{
// //     width: "260px", minWidth: "260px",
// //     background: "#0f2417",
// //     display: "flex", flexDirection: "column",
// //     height: "100vh", position: "sticky", top: 0,
// //     borderRight: "1px solid rgba(255,255,255,0.05)",
// //   }}>
// //     {/* Logo */}
// //     <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
// //       <img src="/brand-logo.png" alt="The Plateau Consensus" style={{ height: "48px", width: "auto" }} />
// //     </div>

// //     {/* Nav */}
// //     <nav style={{ padding: "16px 12px", flex: 1 }}>
// //       {[
// //         { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
// //         { id: "submissions", label: "Submissions", icon: FileText },
// //       ].map(({ id, label, icon: Icon }) => {
// //         const isActive = active === id;
// //         return (
// //           <button
// //             key={id}
// //             onClick={() => setActive(id)}
// //             style={{
// //               width: "100%", display: "flex", alignItems: "center", gap: "12px",
// //               padding: "11px 14px", borderRadius: "10px", border: "none",
// //               background: isActive ? "rgba(34,197,94,0.15)" : "transparent",
// //               color: isActive ? "#4ade80" : "rgba(255,255,255,0.5)",
// //               fontSize: "14px", fontWeight: isActive ? 600 : 400,
// //               cursor: "pointer", marginBottom: "4px",
// //               transition: "all 0.18s ease",
// //               fontFamily: "'DM Sans', sans-serif",
// //               textAlign: "left",
// //               outline: isActive ? "1px solid rgba(34,197,94,0.3)" : "none",
// //             }}
// //             onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}}
// //             onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}}
// //           >
// //             <Icon size={18} />
// //             {label}
// //           </button>
// //         );
// //       })}
// //     </nav>

// //     {/* Agent info */}
// //     <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
// //       <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
// //         <div style={{
// //           width: "38px", height: "38px", borderRadius: "50%",
// //           background: "linear-gradient(135deg, #16a34a, #4ade80)",
// //           display: "flex", alignItems: "center", justifyContent: "center",
// //           fontSize: "13px", fontWeight: 700, color: "#0f172a", flexShrink: 0,
// //         }}>AM</div>
// //         <div>
// //           <p style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.3 }}>Agent Michael</p>
// //           <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>Zone B · Ward 4</p>
// //         </div>
// //       </div>

// //       <button style={{
// //         width: "100%", display: "flex", alignItems: "center", gap: "10px",
// //         padding: "10px 14px", borderRadius: "8px", border: "none",
// //         background: "transparent", color: "rgba(255,255,255,0.4)",
// //         fontSize: "13px", fontWeight: 500, cursor: "pointer",
// //         transition: "all 0.18s", fontFamily: "'DM Sans', sans-serif",
// //       }}
// //         onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#fca5a5"; }}
// //         onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
// //       >
// //         <LogOut size={16} /> Logout
// //       </button>
// //     </div>
// //   </aside>
// // );
// // 1. Add these imports at the top (replace the old useState-only import)

// // 2. Define nav items ABOVE the Sidebar component
// const NAV_ITEMS = [
//   { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard, path: "/agent-dashboard"   },
//   { id: "submissions", label: "Submissions", icon: FileText,        path: "/agent-submissions" },
// ];

// // 3. Replace the entire Sidebar component with this:
// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const active = pathname.includes("submissions") ? "submissions" : "dashboard";

//   return (
//     <aside style={{
//       width: "260px", minWidth: "260px",
//       background: "#0f2417",
//       display: "flex", flexDirection: "column",
//       height: "100vh", position: "sticky", top: 0,
//       borderRight: "1px solid rgba(255,255,255,0.05)",
//     }}>
//       <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
//         <img src="/brand-logo.png" alt="The Plateau Consensus" style={{ height: "48px", width: "auto" }} />
//       </div>

//       <nav style={{ padding: "16px 12px", flex: 1 }}>
//         {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
//           const isActive = active === id;
//           return (
//             <button
//               key={id}
//               onClick={() => navigate(path)}
//               style={{
//                 width: "100%", display: "flex", alignItems: "center", gap: "12px",
//                 padding: "11px 14px", borderRadius: "10px", border: "none",
//                 background: isActive ? "rgba(34,197,94,0.15)" : "transparent",
//                 color: isActive ? "#4ade80" : "rgba(255,255,255,0.5)",
//                 fontSize: "14px", fontWeight: isActive ? 600 : 400,
//                 cursor: "pointer", marginBottom: "4px",
//                 transition: "all 0.18s ease",
//                 fontFamily: "'DM Sans', sans-serif", textAlign: "left",
//                 outline: isActive ? "1px solid rgba(34,197,94,0.3)" : "none",
//               }}
//               onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}}
//               onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}}
//             >
//               <Icon size={18} />{label}
//             </button>
//           );
//         })}
//       </nav>

//       <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
//           <div style={{
//             width: "38px", height: "38px", borderRadius: "50%",
//             background: "linear-gradient(135deg, #16a34a, #4ade80)",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: "13px", fontWeight: 700, color: "#0f172a", flexShrink: 0,
//           }}>AM</div>
//           <div>
//             <p style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.3 }}>Agent Michael</p>
//             <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>Zone B · Ward 4</p>
//           </div>
//         </div>
//         <button
//           onClick={() => navigate("/agent")}
//           style={{
//             width: "100%", display: "flex", alignItems: "center", gap: "10px",
//             padding: "10px 14px", borderRadius: "8px", border: "none",
//             background: "transparent", color: "rgba(255,255,255,0.4)",
//             fontSize: "13px", fontWeight: 500, cursor: "pointer",
//             transition: "all 0.18s", fontFamily: "'DM Sans', sans-serif",
//           }}
//           onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#fca5a5"; }}
//           onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
//         >
//           <LogOut size={16} /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// // 4. In AgentDashboard(), remove the [active, setActive] state and update Sidebar usage:
// // Change:  const [active, setActive] = useState("dashboard");
// // Change:  <Sidebar active={active} setActive={setActive} />
// // To:      <Sidebar />

// // ── STAT CARD ─────────────────────────────────────────────────────────────────
// const StatCard = ({ icon: Icon, ghostIcon: GhostIcon, label, value, sub, subColor, accent }) => (
//   <div style={{
//     background: "#1a3326",
//     borderRadius: "14px",
//     padding: "22px 24px",
//     flex: 1,
//     position: "relative",
//     overflow: "hidden",
//     border: "1px solid rgba(255,255,255,0.06)",
//   }}>
//     {/* Ghost icon */}
//     <div style={{
//       position: "absolute", right: "-8px", bottom: "-8px",
//       opacity: 0.12, color: accent,
//     }}>
//       <GhostIcon size={90} strokeWidth={1} />
//     </div>

//     <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
//       <div style={{
//         width: "32px", height: "32px", borderRadius: "8px",
//         background: `${accent}22`,
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color: accent,
//       }}>
//         <Icon size={17} />
//       </div>
//       <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{label}</span>
//     </div>

//     <p style={{ fontSize: "42px", fontWeight: 800, color: "#f1f5f9", lineHeight: 1, marginBottom: "8px", fontFamily: "'Syne', sans-serif" }}>
//       {value}
//     </p>
//     <p style={{ fontSize: "12px", color: subColor, fontWeight: 500 }}>{sub}</p>
//   </div>
// );

// // ── STATUS BADGE ──────────────────────────────────────────────────────────────
// const StatusBadge = ({ status }) => {
//   const s = statusStyle[status];
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: "5px",
//       background: s.bg, color: s.color,
//       fontSize: "11px", fontWeight: 600,
//       padding: "4px 10px", borderRadius: "999px",
//       letterSpacing: "0.03em",
//     }}>
//       <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
//       {status}
//     </span>
//   );
// };

// // ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
// export default function AgentDashboard() {
//   const [active, setActive] = useState("dashboard");

//   return (
//     <>
//       <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//       <style>{`
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #f1f5f0; font-family: 'DM Sans', sans-serif; }
//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-track { background: transparent; }
//         ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }

//         .dash-table { width: 100%; border-collapse: collapse; }
//         .dash-table th {
//           font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4);
//           text-transform: uppercase; letter-spacing: 0.08em;
//           padding: 0 16px 14px; text-align: left;
//         }
//         .dash-table td {
//           padding: 16px; font-size: 13px; color: #e2e8f0;
//           border-top: 1px solid rgba(255,255,255,0.05);
//         }
//         .dash-table tr:hover td { background: rgba(255,255,255,0.03); }
//         .dash-table td.mono { font-family: 'DM Mono', monospace; font-size: 12px; color: rgba(255,255,255,0.45); letter-spacing: 0.05em; }
//         .dash-table td.ward { color: rgba(255,255,255,0.4); font-size: 12px; }

//         .action-btn {
//           background: none; border: none; cursor: pointer;
//           color: rgba(255,255,255,0.35); padding: 6px; border-radius: 6px;
//           display: inline-flex; align-items: center; justify-content: center;
//           transition: all 0.15s;
//         }
//         .action-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }

//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(14px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .fade-up { animation: fadeUp 0.45s ease both; }
//         .fade-up-1 { animation-delay: 0.05s; }
//         .fade-up-2 { animation-delay: 0.12s; }
//         .fade-up-3 { animation-delay: 0.19s; }
//         .fade-up-4 { animation-delay: 0.26s; }
//       `}</style>

//       <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f0" }}>
//         <Sidebar active={active} setActive={setActive} />

//         {/* ── MAIN CONTENT ── */}
//         <main style={{ flex: 1, overflowY: "auto", padding: "0 36px 40px" }}>

//           {/* Phase banner */}
//           <div style={{
//             padding: "14px 0",
//             borderBottom: "1px solid #e2e8f0",
//             marginBottom: "28px",
//           }}>
//             <span style={{
//               fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em",
//               color: "#6b7280", textTransform: "uppercase",
//             }}>
//               Election Phase: Collation
//             </span>
//           </div>

//           {/* Welcome row */}
//           <div className="fade-up fade-up-1" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
//             <p style={{ fontSize: "15px", color: "#374151", fontWeight: 400 }}>
//               Welcome back, Agent. Here is your current status for{" "}
//               <a href="#" style={{ color: "#16a34a", fontWeight: 600, textDecoration: "none" }}>Ward 4.</a>
//             </p>

//             <div style={{
//               display: "flex", alignItems: "center", gap: "9px",
//               background: "#1a3326", color: "#e2e8f0",
//               padding: "10px 16px", borderRadius: "10px",
//               fontSize: "13px", fontWeight: 500,
//               border: "1px solid rgba(255,255,255,0.08)",
//             }}>
//               <Calendar size={15} color="#4ade80" />
//               Oct 24, 2023 · 14:35 PM
//             </div>
//           </div>

//           {/* Stat cards */}
//           <div className="fade-up fade-up-2" style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
//             <StatCard
//               icon={Clock3}
//               ghostIcon={Clock3}
//               label="Pending Submissions"
//               value="12"
//               sub="↑ 2 waiting for verification"
//               subColor="#fcd34d"
//               accent="#f59e0b"
//             />
//             <StatCard
//               icon={CheckCircle2}
//               ghostIcon={CheckCircle2}
//               label="Verified Results"
//               value="45"
//               sub="↗ +15 verified today"
//               subColor="#86efac"
//               accent="#22c55e"
//             />
//             <StatCard
//               icon={AlertTriangle}
//               ghostIcon={AlertTriangle}
//               label="Flagged Incidents"
//               value="2"
//               sub="! 1 critical issue"
//               subColor="#fca5a5"
//               accent="#ef4444"
//             />
//           </div>

//           {/* Bottom row: table + sidebar */}
//           <div className="fade-up fade-up-3" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>

//             {/* ── Polling Units Table ── */}
//             <div style={{ flex: 1, minWidth: 0 }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
//                 <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", fontFamily: "'Syne', sans-serif" }}>
//                   Assigned Polling Units
//                 </h2>
//                 <button style={{
//                   background: "none", border: "none", cursor: "pointer",
//                   fontSize: "13px", fontWeight: 600, color: "#16a34a",
//                   display: "flex", alignItems: "center", gap: "4px",
//                   fontFamily: "'DM Sans', sans-serif",
//                 }}>
//                   View All <ChevronRight size={14} />
//                 </button>
//               </div>

//               <div style={{
//                 background: "#1a3326",
//                 borderRadius: "14px",
//                 overflow: "hidden",
//                 border: "1px solid rgba(255,255,255,0.06)",
//               }}>
//                 <table className="dash-table">
//                   <thead>
//                     <tr>
//                       <th>Unit Code</th>
//                       <th>Location</th>
//                       <th>Ward</th>
//                       <th>Status</th>
//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {pollingUnits.map((unit) => (
//                       <tr key={unit.code}>
//                         <td className="mono">{unit.code}</td>
//                         <td style={{ color: "#e2e8f0", fontWeight: 500, fontSize: "13px" }}>{unit.location}</td>
//                         <td className="ward">{unit.ward}</td>
//                         <td><StatusBadge status={unit.status} /></td>
//                         <td>
//                           <button className="action-btn">
//                             {unit.status === "Verified" ? <Eye size={16} /> : <Edit3 size={16} />}
//                           </button>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </div>

//             {/* ── Right sidebar ── */}
//             <div style={{ width: "280px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>

//               {/* Quick Actions */}
//               <div style={{
//                 background: "#1a3326",
//                 borderRadius: "14px", padding: "20px",
//                 border: "1px solid rgba(255,255,255,0.06)",
//               }}>
//                 <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", marginBottom: "6px", fontFamily: "'Syne', sans-serif" }}>
//                   Quick Actions
//                 </h3>
//                 <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginBottom: "16px", lineHeight: 1.6 }}>
//                   Manage election data and report issues directly from here.
//                 </p>

//                 <button style={{
//                   width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
//                   padding: "13px", borderRadius: "10px", border: "none",
//                   background: "#16a34a", color: "#fff",
//                   fontSize: "13px", fontWeight: 700, cursor: "pointer",
//                   marginBottom: "10px", fontFamily: "'DM Sans', sans-serif",
//                   transition: "background 0.18s",
//                 }}
//                   onMouseEnter={e => e.currentTarget.style.background = "#15803d"}
//                   onMouseLeave={e => e.currentTarget.style.background = "#16a34a"}
//                 >
//                   <Plus size={16} /> New Election Collation
//                 </button>

//                 <button style={{
//                   width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px",
//                   padding: "13px", borderRadius: "10px",
//                   border: "1.5px solid rgba(239,68,68,0.4)",
//                   background: "transparent", color: "#fca5a5",
//                   fontSize: "13px", fontWeight: 600, cursor: "pointer",
//                   fontFamily: "'DM Sans', sans-serif",
//                   transition: "all 0.18s",
//                 }}
//                   onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
//                   onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
//                 >
//                   <AlertTriangle size={15} /> Report Incident
//                 </button>
//               </div>

//               {/* Tip card */}
//               <div style={{
//                 background: "#f0fdf4",
//                 borderRadius: "14px", padding: "18px",
//                 border: "1px solid #bbf7d0",
//               }}>
//                 <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
//                   <div style={{
//                     width: "36px", height: "36px", flexShrink: 0,
//                     background: "#dcfce7", borderRadius: "10px",
//                     display: "flex", alignItems: "center", justifyContent: "center",
//                     color: "#16a34a",
//                   }}>
//                     <Lightbulb size={17} />
//                   </div>
//                   <p style={{ fontSize: "12px", color: "#374151", lineHeight: 1.65 }}>
//                     Ensure all result sheets are signed by the polling officer before uploading.
//                     Unsigned sheets may be rejected during verification.
//                   </p>
//                 </div>
//               </div>

//               {/* Map card */}
//               <div style={{
//                 borderRadius: "14px", overflow: "hidden",
//                 position: "relative", height: "160px",
//                 background: "#1a3326",
//                 border: "1px solid rgba(255,255,255,0.06)",
//               }}>
//                 {/* SVG map pattern */}
//                 <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
//                   <defs>
//                     <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
//                       <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#4ade80" strokeWidth="0.4"/>
//                     </pattern>
//                   </defs>
//                   <rect width="100%" height="100%" fill="url(#grid)" />
//                   {/* Road lines */}
//                   <line x1="0" y1="80" x2="280" y2="80" stroke="#4ade80" strokeWidth="1.5" opacity="0.6"/>
//                   <line x1="0" y1="120" x2="280" y2="110" stroke="#4ade80" strokeWidth="1" opacity="0.4"/>
//                   <line x1="80" y1="0" x2="100" y2="160" stroke="#4ade80" strokeWidth="1" opacity="0.5"/>
//                   <line x1="180" y1="0" x2="160" y2="160" stroke="#4ade80" strokeWidth="0.8" opacity="0.3"/>
//                   <circle cx="140" cy="80" r="6" fill="#4ade80" opacity="0.9"/>
//                   <circle cx="140" cy="80" r="14" fill="none" stroke="#4ade80" strokeWidth="1" opacity="0.4"/>
//                   <circle cx="140" cy="80" r="22" fill="none" stroke="#4ade80" strokeWidth="0.5" opacity="0.2"/>
//                 </svg>

//                 {/* Overlay label */}
//                 <div style={{
//                   position: "absolute", bottom: 0, left: 0, right: 0,
//                   background: "linear-gradient(to top, rgba(15,36,23,0.95) 0%, transparent 100%)",
//                   padding: "20px 16px 14px",
//                   display: "flex", alignItems: "center", gap: "7px",
//                 }}>
//                   <MapPin size={14} color="#4ade80" />
//                   <span style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9" }}>Zone B Map View</span>
//                 </div>
//               </div>

//             </div>
//           </div>
//         </main>
//       </div>
//     </>
//   );
// }


import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard, FileText, LogOut, MapPin, Plus,
  AlertTriangle, CheckCircle2, Clock3, Eye, Edit3,
  Calendar, Lightbulb, ChevronRight, Lock, ArrowRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

// ── DATA ─────────────────────────────────────────────────────────────────────
const pollingUnits = [
  { code: "PU-001", location: "City Hall Main Entrance",  ward: "Ward 4", status: "Pending" },
  { code: "PU-002", location: "Community Primary School", ward: "Ward 4", status: "Verified" },
  { code: "PU-003", location: "Market Square South",      ward: "Ward 4", status: "Flagged" },
  { code: "PU-004", location: "Library Annex",            ward: "Ward 4", status: "Not Started" },
];

const statusStyle = {
  Pending:       { bg: "#78350f", color: "#fcd34d", dot: "#f59e0b" },
  Verified:      { bg: "#14532d", color: "#86efac", dot: "#22c55e" },
  Flagged:       { bg: "#7f1d1d", color: "#fca5a5", dot: "#ef4444" },
  "Not Started": { bg: "#1e293b", color: "#94a3b8", dot: "#64748b" },
};

const NAV_ITEMS = [
  { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard, path: "/agent-dashboard"   },
  { id: "submissions", label: "Submissions", icon: FileText,        path: "/agent-submissions" },
];

// ── LOGOUT MODAL ─────────────────────────────────────────────────────────────
const LogoutModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/Agent");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{
              position: "fixed", inset: 0, zIndex: 50,
              background: "rgba(255,255,255,0.55)",
              backdropFilter: "blur(4px)",
            }}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed", top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 51, width: "420px",
              background: "#0f2417", borderRadius: "20px",
              border: "1.5px solid #16a34a", overflow: "hidden",
              boxShadow: "0 24px 80px rgba(0,0,0,0.35)",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            <div style={{ height: "3px", background: "linear-gradient(90deg, #16a34a, #4ade80, #16a34a)" }} />
            <div style={{ padding: "36px 36px 28px", textAlign: "center" }}>
              <div style={{
                width: "64px", height: "64px", borderRadius: "50%",
                background: "rgba(34,197,94,0.15)",
                border: "1.5px solid rgba(74,222,128,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 24px", color: "#4ade80",
              }}>
                <LogOut size={26} />
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#f1f5f9", marginBottom: "12px" }}>
                Confirm Logout
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "280px", margin: "0 auto 32px" }}>
                Are you sure you want to end your session? Any unsaved collation data might be lost.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={onClose} style={{
                  flex: 1, height: "52px",
                  background: "rgba(255,255,255,0.07)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px", color: "#e2e8f0",
                  fontSize: "14px", fontWeight: 600, cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                >Cancel</button>
                <button onClick={handleLogout} style={{
                  flex: 1, height: "52px", background: "#22c55e", border: "none",
                  borderRadius: "12px", color: "#0a2010",
                  fontSize: "14px", fontWeight: 700, cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  fontFamily: "'DM Sans', sans-serif",
                  boxShadow: "0 4px 16px rgba(34,197,94,0.35)", transition: "all 0.18s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "#16a34a"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "#22c55e"; }}
                >Yes, Logout <ArrowRight size={15} /></button>
              </div>
            </div>
            <div style={{ padding: "14px 36px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", gap: "7px" }}>
              <Lock size={12} color="rgba(255,255,255,0.3)" />
              <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>Your session is securely encrypted.</span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── SIDEBAR ───────────────────────────────────────────────────────────────────
const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const active = pathname.includes("submissions") ? "submissions" : "dashboard";

  return (
    <aside style={{
      width: "260px", minWidth: "260px", background: "#0f2417",
      display: "flex", flexDirection: "column",
      height: "100vh", position: "sticky", top: 0,
      borderRight: "1px solid rgba(255,255,255,0.05)",
    }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <img src="/brand-logo.png" alt="The Plateau Consensus" style={{ height: "48px", width: "auto" }} />
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => navigate(path)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px",
                padding: "11px 14px", borderRadius: "10px", border: "none",
                background: isActive ? "rgba(34,197,94,0.15)" : "transparent",
                color: isActive ? "#4ade80" : "rgba(255,255,255,0.5)",
                fontSize: "14px", fontWeight: isActive ? 600 : 400,
                cursor: "pointer", marginBottom: "4px", transition: "all 0.18s ease",
                fontFamily: "'DM Sans', sans-serif", textAlign: "left",
                outline: isActive ? "1px solid rgba(34,197,94,0.3)" : "none",
              }}
              onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}}
              onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}}
            >
              <Icon size={18} />{label}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
          <div style={{
            width: "38px", height: "38px", borderRadius: "50%",
            background: "linear-gradient(135deg, #16a34a, #4ade80)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "13px", fontWeight: 700, color: "#0f172a", flexShrink: 0,
          }}>AM</div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.3 }}>Agent Michael</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>Zone B · Ward 4</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: "100%", display: "flex", alignItems: "center", gap: "10px",
            padding: "10px 14px", borderRadius: "8px", border: "none",
            background: "transparent", color: "rgba(255,255,255,0.4)",
            fontSize: "13px", fontWeight: 500, cursor: "pointer",
            transition: "all 0.18s", fontFamily: "'DM Sans', sans-serif",
          }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#fca5a5"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

// ── STAT CARD ─────────────────────────────────────────────────────────────────
const StatCard = ({ icon: Icon, ghostIcon: GhostIcon, label, value, sub, subColor, accent }) => (
  <div style={{
    background: "#1a3326", borderRadius: "14px", padding: "22px 24px", flex: 1,
    position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)",
  }}>
    <div style={{ position: "absolute", right: "-8px", bottom: "-8px", opacity: 0.12, color: accent }}>
      <GhostIcon size={90} strokeWidth={1} />
    </div>
    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
      <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: `${accent}22`, display: "flex", alignItems: "center", justifyContent: "center", color: accent }}>
        <Icon size={17} />
      </div>
      <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", fontWeight: 500 }}>{label}</span>
    </div>
    <p style={{ fontSize: "42px", fontWeight: 800, color: "#f1f5f9", lineHeight: 1, marginBottom: "8px", fontFamily: "'Syne', sans-serif" }}>{value}</p>
    <p style={{ fontSize: "12px", color: subColor, fontWeight: 500 }}>{sub}</p>
  </div>
);

// ── STATUS BADGE ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const s = statusStyle[status];
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "5px", background: s.bg, color: s.color, fontSize: "11px", fontWeight: 600, padding: "4px 10px", borderRadius: "999px", letterSpacing: "0.03em" }}>
      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {status}
    </span>
  );
};

// ── MAIN DASHBOARD ────────────────────────────────────────────────────────────
export default function AgentDashboard() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f1f5f0; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        .dash-table { width: 100%; border-collapse: collapse; }
        .dash-table th { font-size: 11px; font-weight: 600; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.08em; padding: 0 16px 14px; text-align: left; }
        .dash-table td { padding: 16px; font-size: 13px; color: #e2e8f0; border-top: 1px solid rgba(255,255,255,0.05); }
        .dash-table tr:hover td { background: rgba(255,255,255,0.03); }
        .dash-table td.mono { font-family: monospace; font-size: 12px; color: rgba(255,255,255,0.45); letter-spacing: 0.05em; }
        .dash-table td.ward { color: rgba(255,255,255,0.4); font-size: 12px; }
        .action-btn { background: none; border: none; cursor: pointer; color: rgba(255,255,255,0.35); padding: 6px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; transition: all 0.15s; }
        .action-btn:hover { background: rgba(255,255,255,0.08); color: #e2e8f0; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.45s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.12s; }
        .fade-up-3 { animation-delay: 0.19s; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f0" }}>
        <Sidebar onLogout={() => setShowLogout(true)} />

        <main style={{ flex: 1, overflowY: "auto", padding: "0 36px 40px" }}>
          {/* Phase banner */}
          <div style={{ padding: "14px 0", borderBottom: "1px solid #e2e8f0", marginBottom: "28px" }}>
            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.18em", color: "#6b7280", textTransform: "uppercase" }}>
              Election Phase: Collation
            </span>
          </div>

          {/* Welcome row */}
          <div className="fade-up fade-up-1" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "28px" }}>
            <p style={{ fontSize: "15px", color: "#374151", fontWeight: 400 }}>
              Welcome back, Agent. Here is your current status for{" "}
              <a href="#" style={{ color: "#16a34a", fontWeight: 600, textDecoration: "none" }}>Ward 4.</a>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "9px", background: "#1a3326", color: "#e2e8f0", padding: "10px 16px", borderRadius: "10px", fontSize: "13px", fontWeight: 500, border: "1px solid rgba(255,255,255,0.08)" }}>
              <Calendar size={15} color="#4ade80" />
              Oct 24, 2023 · 14:35 PM
            </div>
          </div>

          {/* Stat cards */}
          <div className="fade-up fade-up-2" style={{ display: "flex", gap: "16px", marginBottom: "32px" }}>
            <StatCard icon={Clock3}       ghostIcon={Clock3}       label="Pending Submissions" value="12" sub="↑ 2 waiting for verification" subColor="#fcd34d" accent="#f59e0b" />
            <StatCard icon={CheckCircle2} ghostIcon={CheckCircle2} label="Verified Results"     value="45" sub="↗ +15 verified today"         subColor="#86efac" accent="#22c55e" />
            <StatCard icon={AlertTriangle} ghostIcon={AlertTriangle} label="Flagged Incidents"  value="2"  sub="! 1 critical issue"            subColor="#fca5a5" accent="#ef4444" />
          </div>

          {/* Bottom row */}
          <div className="fade-up fade-up-3" style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
            {/* Table */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <h2 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", fontFamily: "'Syne', sans-serif" }}>Assigned Polling Units</h2>
                <button style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, color: "#16a34a", display: "flex", alignItems: "center", gap: "4px", fontFamily: "'DM Sans', sans-serif" }}>
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div style={{ background: "#1a3326", borderRadius: "14px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
                <table className="dash-table">
                  <thead>
                    <tr>
                      <th>Unit Code</th><th>Location</th><th>Ward</th><th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pollingUnits.map((unit) => (
                      <tr key={unit.code}>
                        <td className="mono">{unit.code}</td>
                        <td style={{ color: "#e2e8f0", fontWeight: 500, fontSize: "13px" }}>{unit.location}</td>
                        <td className="ward">{unit.ward}</td>
                        <td><StatusBadge status={unit.status} /></td>
                        <td>
                          <button className="action-btn">
                            {unit.status === "Verified" ? <Eye size={16} /> : <Edit3 size={16} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right panel */}
            <div style={{ width: "280px", flexShrink: 0, display: "flex", flexDirection: "column", gap: "16px" }}>
              {/* Quick Actions */}
              <div style={{ background: "#1a3326", borderRadius: "14px", padding: "20px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontSize: "15px", fontWeight: 700, color: "#f1f5f9", marginBottom: "6px", fontFamily: "'Syne', sans-serif" }}>Quick Actions</h3>
                <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)", marginBottom: "16px", lineHeight: 1.6 }}>Manage election data and report issues directly from here.</p>
                <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", padding: "13px", borderRadius: "10px", border: "none", background: "#16a34a", color: "#fff", fontSize: "13px", fontWeight: 700, cursor: "pointer", marginBottom: "10px", fontFamily: "'DM Sans', sans-serif", transition: "background 0.18s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "#15803d"}
                  onMouseLeave={e => e.currentTarget.style.background = "#16a34a"}
                ><Plus size={16} /> New Election Collation</button>
                <button style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: "9px", padding: "13px", borderRadius: "10px", border: "1.5px solid rgba(239,68,68,0.4)", background: "transparent", color: "#fca5a5", fontSize: "13px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "transparent"; }}
                ><AlertTriangle size={15} /> Report Incident</button>
              </div>

              {/* Tip card */}
              <div style={{ background: "#f0fdf4", borderRadius: "14px", padding: "18px", border: "1px solid #bbf7d0" }}>
                <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                  <div style={{ width: "36px", height: "36px", flexShrink: 0, background: "#dcfce7", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", color: "#16a34a" }}>
                    <Lightbulb size={17} />
                  </div>
                  <p style={{ fontSize: "12px", color: "#374151", lineHeight: 1.65 }}>
                    Ensure all result sheets are signed by the polling officer before uploading. Unsigned sheets may be rejected during verification.
                  </p>
                </div>
              </div>

              {/* Map card */}
              <div style={{ borderRadius: "14px", overflow: "hidden", position: "relative", height: "160px", background: "#1a3326", border: "1px solid rgba(255,255,255,0.06)" }}>
                <svg width="100%" height="100%" style={{ position: "absolute", inset: 0, opacity: 0.35 }}>
                  <defs>
                    <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#4ade80" strokeWidth="0.4"/>
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <line x1="0" y1="80" x2="280" y2="80" stroke="#4ade80" strokeWidth="1.5" opacity="0.6"/>
                  <line x1="0" y1="120" x2="280" y2="110" stroke="#4ade80" strokeWidth="1" opacity="0.4"/>
                  <line x1="80" y1="0" x2="100" y2="160" stroke="#4ade80" strokeWidth="1" opacity="0.5"/>
                  <line x1="180" y1="0" x2="160" y2="160" stroke="#4ade80" strokeWidth="0.8" opacity="0.3"/>
                  <circle cx="140" cy="80" r="6" fill="#4ade80" opacity="0.9"/>
                  <circle cx="140" cy="80" r="14" fill="none" stroke="#4ade80" strokeWidth="1" opacity="0.4"/>
                  <circle cx="140" cy="80" r="22" fill="none" stroke="#4ade80" strokeWidth="0.5" opacity="0.2"/>
                </svg>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(15,36,23,0.95) 0%, transparent 100%)", padding: "20px 16px 14px", display: "flex", alignItems: "center", gap: "7px" }}>
                  <MapPin size={14} color="#4ade80" />
                  <span style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9" }}>Zone B Map View</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Logout Modal */}
      <LogoutModal isOpen={showLogout} onClose={() => setShowLogout(false)} />
    </>
  );
}
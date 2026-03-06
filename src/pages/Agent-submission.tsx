// import { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard, FileText, LogOut,
//   Search, Calendar, ChevronDown, Eye, Edit3,
//   Info, Plus, CheckCircle2, Clock3, AlignLeft,
//   ChevronLeft, ChevronRight
// } from "lucide-react";
// // import LogoutModal from "@/components/LogoutModal";
// const [showLogout, setShowLogout] = useState(false);

// // ── DATA ─────────────────────────────────────────────────────────────────────
// const submissions = [
//   { date: "Oct 12, 2023", time: "14:30 PM", puCode: "PU-004", puName: "Central Primary School",   location: "Ikeja / Ward G",    votes: 452,  status: "ACCEPTED" },
//   { date: "Oct 12, 2023", time: "13:15 PM", puCode: "PU-089", puName: "Market Square Open Space", location: "Surulere / Ward B", votes: 128,  status: "VERIFICATION PENDING" },
//   { date: "Oct 12, 2023", time: "11:05 AM", puCode: "PU-012", puName: "Communit Hall II",          location: "Yaba / Ward A",     votes: 890,  status: "ACCEPTED" },
//   { date: "Oct 11, 2023", time: "09:45 AM", puCode: "PU-004", puName: "Central Primary School",   location: "Ikeja / Ward G",    votes: null, status: "REJECTED" },
//   { date: "Oct 11, 2023", time: "08:30 AM", puCode: "PU-091", puName: "Post Office Junction",     location: "Agege / Ward C",    votes: 331,  status: "VERIFICATION PENDING" },
// ];

// const statusConfig = {
//   "ACCEPTED":             { color: "#4ade80", label: "ACCEPTED",              dot: "#22c55e", actionIcon: Eye },
//   "VERIFICATION PENDING": { color: "#f59e0b", label: "VERIFICATION\nPENDING", dot: "#f59e0b", actionIcon: Edit3 },
//   "REJECTED":             { color: "#ef4444", label: "REJECTED",              dot: "#ef4444", actionIcon: Info },
// };

// const NAV_ITEMS = [
//   { id: "dashboard",   label: "Dashboard",   icon: LayoutDashboard, path: "/agent-dashboard"   },
//   { id: "submissions", label: "Submissions", icon: FileText,        path: "/agent-submissions" },
// ];

// // ── SIDEBAR ───────────────────────────────────────────────────────────────────
// const Sidebar = () => {
//   const navigate = useNavigate();
//   const { pathname } = useLocation();
//   const active = pathname.includes("submissions") ? "submissions" : "dashboard";

//   return (
//     <aside style={{
//       width: "260px", minWidth: "260px", background: "#0f2417",
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
//                 color:      isActive ? "#4ade80"              : "rgba(255,255,255,0.5)",
//                 fontSize: "14px", fontWeight: isActive ? 600 : 400,
//                 cursor: "pointer", marginBottom: "4px", transition: "all 0.18s ease",
//                 fontFamily: "'DM Sans', sans-serif", textAlign: "left",
//                 outline: isActive ? "1px solid rgba(34,197,94,0.3)" : "none",
//               }}
//               onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(255,255,255,0.8)"; }}}
//               onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = "transparent";           e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}}
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
//           onMouseLeave={e => { e.currentTarget.style.background = "transparent";         e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
//         >
//           <LogOut size={16} /> Logout
//         </button>
//       </div>
//     </aside>
//   );
// };

// // ── FILTER SELECT ─────────────────────────────────────────────────────────────
// const FilterSelect = ({ value, onChange, options }) => (
//   <div style={{ position: "relative", flex: 1 }}>
//     <select value={value} onChange={e => onChange(e.target.value)} style={{
//       width: "100%", height: "46px",
//       paddingLeft: "14px", paddingRight: "36px",
//       background: "rgba(255,255,255,0.07)",
//       border: "1px solid rgba(255,255,255,0.1)",
//       borderRadius: "10px", color: "rgba(255,255,255,0.7)",
//       fontSize: "13px", fontWeight: 500, cursor: "pointer",
//       outline: "none", appearance: "none", fontFamily: "'DM Sans', sans-serif",
//     }}>
//       {options.map(o => <option key={o} value={o} style={{ background: "#1a3326" }}>{o}</option>)}
//     </select>
//     <ChevronDown size={14} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }} />
//   </div>
// );

// // ── PAGE ──────────────────────────────────────────────────────────────────────
// export default function SubmissionsPage() {
//   const [search, setSearch] = useState("");
//   const [lga,    setLga]    = useState("All LGAs");
//   const [ward,   setWard]   = useState("All Wards");
//   const [page,   setPage]   = useState(1);
//   const totalPages = 3;

//   const filtered = submissions.filter(s =>
//     s.puCode.toLowerCase().includes(search.toLowerCase()) ||
//     s.puName.toLowerCase().includes(search.toLowerCase())
//   );

//   return (
//     <>
//       <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
//       <style>{`
//         * { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #f1f5f0; font-family: 'DM Sans', sans-serif; }
//         ::-webkit-scrollbar { width: 6px; }
//         ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
//         @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
//         .fade-up { animation: fadeUp 0.4s ease both; }
//         .delay-1 { animation-delay: 0.05s; }
//         .delay-2 { animation-delay: 0.12s; }
//         .delay-3 { animation-delay: 0.20s; }
//         .sub-table { width: 100%; border-collapse: collapse; }
//         .sub-table thead tr { background: rgba(255,255,255,0.04); }
//         .sub-table th { font-size:11px; font-weight:700; letter-spacing:0.1em; color:rgba(255,255,255,0.4); text-transform:uppercase; padding:14px 20px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.07); }
//         .sub-table td { padding:18px 20px; border-bottom:1px solid rgba(255,255,255,0.05); vertical-align:middle; }
//         .sub-table tbody tr:last-child td { border-bottom:none; }
//         .sub-table tbody tr { transition:background 0.15s; }
//         .sub-table tbody tr:hover td { background:rgba(255,255,255,0.025); }
//         .pg-btn { width:34px; height:34px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.5); font-size:13px; font-weight:600; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
//         .pg-btn:hover { background:rgba(255,255,255,0.08); color:#fff; }
//         .pg-btn.active { background:#16a34a; border-color:#16a34a; color:#fff; box-shadow:0 2px 10px rgba(22,163,74,0.35); }
//         .pg-btn:disabled { opacity:0.3; cursor:not-allowed; }
//         .new-sub-btn { display:flex; align-items:center; gap:8px; padding:11px 20px; border-radius:10px; background:transparent; border:1.5px solid #16a34a; color:#4ade80; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.18s; font-family:'DM Sans',sans-serif; white-space:nowrap; }
//         .new-sub-btn:hover { background:rgba(22,163,74,0.12); }
//         .action-icon-btn { background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.35); padding:7px; border-radius:7px; display:inline-flex; align-items:center; justify-content:center; transition:all 0.15s; }
//         .action-icon-btn:hover { background:rgba(255,255,255,0.09); color:#e2e8f0; }
//       `}</style>

//       <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f0" }}>
//         <Sidebar />

//         <main style={{ flex: 1, overflowY: "auto", padding: "0 40px 48px" }}>

//           {/* Phase banner */}
//           <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0", borderBottom:"1px solid #e2e8f0", marginBottom:"32px" }}>
//             <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.18em", color:"#6b7280", textTransform:"uppercase" }}>
//               Election Phase: Collation
//             </span>
//             <div style={{ display:"flex", alignItems:"center", gap:"9px", background:"#1a3326", color:"#e2e8f0", padding:"10px 16px", borderRadius:"10px", fontSize:"13px", fontWeight:500, border:"1px solid rgba(255,255,255,0.08)" }}>
//               <Calendar size={15} color="#4ade80" />
//               Oct 24, 2023 · 14:35 PM
//             </div>
//           </div>

//           {/* Page header */}
//           <div className="fade-up delay-1" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"28px" }}>
//             <div>
//               <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"36px", fontWeight:800, color:"#0f172a", letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:"8px" }}>
//                 Submission
//               </h1>
//               <p style={{ fontSize:"14px", color:"#16a34a", fontWeight:400 }}>
//                 Track and manage your polling unit collation reports.
//               </p>
//             </div>
//             <button className="new-sub-btn"><Plus size={16} /> New Submission</button>
//           </div>

//           <hr style={{ border:"none", borderTop:"1px solid #e2e8f0", marginBottom:"28px" }} />

//           {/* Stat cards */}
//           <div className="fade-up delay-2" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"24px" }}>
//             {[
//               { label:"TOTAL SUBMISSIONS",    value:"24", icon:AlignLeft,    accent:"#4ade80" },
//               { label:"ACCEPTED",             value:"18", icon:CheckCircle2, accent:"#4ade80" },
//               { label:"PENDING VERIFICATION", value:"6",  icon:Clock3,       accent:"#f59e0b" },
//             ].map(({ label, value, icon: Icon, accent }) => (
//               <div key={label} style={{ background:"#1a3326", borderRadius:"14px", padding:"22px 24px", border:"1px solid rgba(255,255,255,0.06)", position:"relative", overflow:"hidden" }}>
//                 <div style={{ position:"absolute", right:"-6px", bottom:"-6px", opacity:0.1, color:accent }}>
//                   <Icon size={80} strokeWidth={1} />
//                 </div>
//                 <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
//                   <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase" }}>{label}</span>
//                   <Icon size={20} color={accent} strokeWidth={1.5} />
//                 </div>
//                 <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"44px", fontWeight:800, color:"#f1f5f9", lineHeight:1 }}>{value}</p>
//               </div>
//             ))}
//           </div>

//           {/* Filter bar */}
//           <div className="fade-up delay-2" style={{ background:"#1a3326", borderRadius:"14px", padding:"16px 20px", marginBottom:"16px", display:"flex", gap:"12px", alignItems:"center", border:"1px solid rgba(255,255,255,0.06)" }}>
//             <div style={{ position:"relative", flex:2 }}>
//               <Search size={15} style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", pointerEvents:"none" }} />
//               <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by PU Name or ID..."
//                 style={{ width:"100%", height:"46px", paddingLeft:"40px", paddingRight:"14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", color:"#e2e8f0", fontSize:"13px", outline:"none", fontFamily:"'DM Sans',sans-serif", transition:"border-color 0.18s" }}
//                 onFocus={e => e.target.style.borderColor="rgba(74,222,128,0.5)"}
//                 onBlur={e  => e.target.style.borderColor="rgba(255,255,255,0.1)"}
//               />
//             </div>
//             <FilterSelect value={lga}  onChange={setLga}  options={["All LGAs","Ikeja","Surulere","Yaba","Agege"]} />
//             <FilterSelect value={ward} onChange={setWard} options={["All Wards","Ward A","Ward B","Ward C","Ward G"]} />
//             <div style={{ position:"relative", flex:1.4 }}>
//               <Calendar size={15} style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", pointerEvents:"none" }} />
//               <input type="text" placeholder="Select Date Range" readOnly
//                 style={{ width:"100%", height:"46px", paddingLeft:"36px", paddingRight:"14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", color:"rgba(255,255,255,0.5)", fontSize:"13px", outline:"none", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }}
//               />
//             </div>
//           </div>

//           {/* Table */}
//           <div className="fade-up delay-3" style={{ background:"#1a3326", borderRadius:"14px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)" }}>
//             <table className="sub-table">
//               <thead>
//                 <tr>
//                   <th>Date &amp; Time</th>
//                   <th>Polling Unit</th>
//                   <th>Location<br />(LGA/Ward)</th>
//                   <th style={{ textAlign:"center" }}>Votes<br />Recorded</th>
//                   <th>Status</th>
//                   <th style={{ textAlign:"right" }}>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filtered.map((row, i) => {
//                   const cfg = statusConfig[row.status];
//                   const ActionIcon = cfg.actionIcon;
//                   return (
//                     <tr key={i}>
//                       <td>
//                         <p style={{ fontSize:"13px", color:"#e2e8f0", fontWeight:500 }}>{row.date}</p>
//                         <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginTop:"2px" }}>{row.time}</p>
//                       </td>
//                       <td>
//                         <p style={{ fontSize:"13px", color:"#e2e8f0", fontWeight:600 }}>{row.puCode}</p>
//                         <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginTop:"2px" }}>{row.puName}</p>
//                       </td>
//                       <td style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)" }}>{row.location}</td>
//                       <td style={{ textAlign:"center", fontSize:"14px", fontWeight:600, color: row.votes ? "#e2e8f0" : "rgba(255,255,255,0.3)" }}>
//                         {row.votes ?? "—"}
//                       </td>
//                       <td>
//                         <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
//                           <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:cfg.dot, flexShrink:0, boxShadow:`0 0 6px ${cfg.dot}80` }} />
//                           <span style={{ fontSize:"11px", fontWeight:700, color:cfg.color, letterSpacing:"0.06em", lineHeight:1.35 }}>
//                             {cfg.label.split("\n").map((l, j) => <span key={j} style={{ display:"block" }}>{l}</span>)}
//                           </span>
//                         </div>
//                       </td>
//                       <td style={{ textAlign:"right" }}>
//                         <button className="action-icon-btn"><ActionIcon size={17} /></button>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>

//             <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
//               <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)" }}>
//                 Showing <span style={{ color:"#e2e8f0", fontWeight:600 }}>1-5</span> of <span style={{ color:"#e2e8f0", fontWeight:600 }}>24</span>
//               </span>
//               <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
//                 <button className="pg-btn" disabled={page===1} onClick={() => setPage(p => Math.max(1,p-1))}><ChevronLeft size={14} /></button>
//                 {[1,2,3].map(n => (
//                   <button key={n} className={`pg-btn${page===n?" active":""}`} onClick={() => setPage(n)}>{n}</button>
//                 ))}
//                 <button className="pg-btn" disabled={page===totalPages} onClick={() => setPage(p => Math.min(totalPages,p+1))}><ChevronRight size={14} /></button>
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
  LayoutDashboard, FileText, LogOut,
  Search, Calendar, ChevronDown, Eye, Edit3,
  Info, Plus, CheckCircle2, Clock3, AlignLeft,
  ChevronLeft, ChevronRight, Lock, ArrowRight, AlertTriangle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { motion, AnimatePresence } from "framer-motion";

// ── DATA ─────────────────────────────────────────────────────────────────────
const submissions = [
  { date: "Oct 12, 2023", time: "14:30 PM", puCode: "PU-004", puName: "Central Primary School",   location: "Ikeja / Ward G",    votes: 452,  status: "ACCEPTED" },
  { date: "Oct 12, 2023", time: "13:15 PM", puCode: "PU-089", puName: "Market Square Open Space", location: "Surulere / Ward B", votes: 128,  status: "VERIFICATION PENDING" },
  { date: "Oct 12, 2023", time: "11:05 AM", puCode: "PU-012", puName: "Communit Hall II",          location: "Yaba / Ward A",     votes: 890,  status: "ACCEPTED" },
  { date: "Oct 11, 2023", time: "09:45 AM", puCode: "PU-004", puName: "Central Primary School",   location: "Ikeja / Ward G",    votes: null, status: "REJECTED" },
  { date: "Oct 11, 2023", time: "08:30 AM", puCode: "PU-091", puName: "Post Office Junction",     location: "Agege / Ward C",    votes: 331,  status: "VERIFICATION PENDING" },
];

const statusConfig = {
  "ACCEPTED":             { color: "#4ade80", label: "ACCEPTED",              dot: "#22c55e", actionIcon: Eye },
  "VERIFICATION PENDING": { color: "#f59e0b", label: "VERIFICATION\nPENDING", dot: "#f59e0b", actionIcon: Edit3 },
  "REJECTED":             { color: "#ef4444", label: "REJECTED",              dot: "#ef4444", actionIcon: Info },
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
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(255,255,255,0.55)", backdropFilter: "blur(4px)" }}
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
              <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "rgba(34,197,94,0.15)", border: "1.5px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px", color: "#4ade80" }}>
                <LogOut size={26} />
              </div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "22px", fontWeight: 800, color: "#f1f5f9", marginBottom: "12px" }}>
                Confirm Logout
              </h2>
              <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.65, maxWidth: "280px", margin: "0 auto 32px" }}>
                Are you sure you want to end your session? Any unsaved collation data might be lost.
              </p>
              <div style={{ display: "flex", gap: "12px" }}>
                <button onClick={onClose} style={{ flex: 1, height: "52px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#e2e8f0", fontSize: "14px", fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "all 0.18s" }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.12)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.07)"; }}
                >Cancel</button>
                <button onClick={handleLogout} style={{ flex: 1, height: "52px", background: "#22c55e", border: "none", borderRadius: "12px", color: "#0a2010", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(34,197,94,0.35)", transition: "all 0.18s" }}
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
    <aside style={{ width: "260px", minWidth: "260px", background: "#0f2417", display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, borderRight: "1px solid rgba(255,255,255,0.05)" }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <img src="/brand-logo.png" alt="The Plateau Consensus" style={{ height: "48px", width: "auto" }} />
      </div>

      <nav style={{ padding: "16px 12px", flex: 1 }}>
        {NAV_ITEMS.map(({ id, label, icon: Icon, path }) => {
          const isActive = active === id;
          return (
            <button key={id} onClick={() => navigate(path)} style={{ width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "11px 14px", borderRadius: "10px", border: "none", background: isActive ? "rgba(34,197,94,0.15)" : "transparent", color: isActive ? "#4ade80" : "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: isActive ? 600 : 400, cursor: "pointer", marginBottom: "4px", transition: "all 0.18s ease", fontFamily: "'DM Sans', sans-serif", textAlign: "left", outline: isActive ? "1px solid rgba(34,197,94,0.3)" : "none" }}
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
          <div style={{ width: "38px", height: "38px", borderRadius: "50%", background: "linear-gradient(135deg, #16a34a, #4ade80)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: 700, color: "#0f172a", flexShrink: 0 }}>AM</div>
          <div>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "#f1f5f9", lineHeight: 1.3 }}>Agent Michael</p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)", lineHeight: 1.3 }}>Zone B · Ward 4</p>
          </div>
        </div>
        <button onClick={onLogout} style={{ width: "100%", display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", borderRadius: "8px", border: "none", background: "transparent", color: "rgba(255,255,255,0.4)", fontSize: "13px", fontWeight: 500, cursor: "pointer", transition: "all 0.18s", fontFamily: "'DM Sans', sans-serif" }}
          onMouseEnter={e => { e.currentTarget.style.background = "rgba(239,68,68,0.1)"; e.currentTarget.style.color = "#fca5a5"; }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "rgba(255,255,255,0.4)"; }}
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

// ── FILTER SELECT ─────────────────────────────────────────────────────────────
const FilterSelect = ({ value, onChange, options }) => (
  <div style={{ position: "relative", flex: 1 }}>
    <select value={value} onChange={e => onChange(e.target.value)} style={{ width: "100%", height: "46px", paddingLeft: "14px", paddingRight: "36px", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "10px", color: "rgba(255,255,255,0.7)", fontSize: "13px", fontWeight: 500, cursor: "pointer", outline: "none", appearance: "none", fontFamily: "'DM Sans', sans-serif" }}>
      {options.map(o => <option key={o} value={o} style={{ background: "#1a3326" }}>{o}</option>)}
    </select>
    <ChevronDown size={14} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.35)", pointerEvents: "none" }} />
  </div>
);

// ── PAGE ──────────────────────────────────────────────────────────────────────
export default function SubmissionsPage() {
  const [showLogout, setShowLogout] = useState(false);
  const [search, setSearch] = useState("");
  const [lga,    setLga]    = useState("All LGAs");
  const [ward,   setWard]   = useState("All Wards");
  const [page,   setPage]   = useState(1);
  const totalPages = 3;

  const filtered = submissions.filter(s =>
    s.puCode.toLowerCase().includes(search.toLowerCase()) ||
    s.puName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #f1f5f0; font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 3px; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.4s ease both; }
        .delay-1 { animation-delay: 0.05s; }
        .delay-2 { animation-delay: 0.12s; }
        .delay-3 { animation-delay: 0.20s; }
        .sub-table { width: 100%; border-collapse: collapse; }
        .sub-table thead tr { background: rgba(255,255,255,0.04); }
        .sub-table th { font-size:11px; font-weight:700; letter-spacing:0.1em; color:rgba(255,255,255,0.4); text-transform:uppercase; padding:14px 20px; text-align:left; border-bottom:1px solid rgba(255,255,255,0.07); }
        .sub-table td { padding:18px 20px; border-bottom:1px solid rgba(255,255,255,0.05); vertical-align:middle; }
        .sub-table tbody tr:last-child td { border-bottom:none; }
        .sub-table tbody tr { transition:background 0.15s; }
        .sub-table tbody tr:hover td { background:rgba(255,255,255,0.025); }
        .pg-btn { width:34px; height:34px; border-radius:8px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.5); font-size:13px; font-weight:600; display:flex; align-items:center; justify-content:center; cursor:pointer; transition:all 0.15s; font-family:'DM Sans',sans-serif; }
        .pg-btn:hover { background:rgba(255,255,255,0.08); color:#fff; }
        .pg-btn.active { background:#16a34a; border-color:#16a34a; color:#fff; box-shadow:0 2px 10px rgba(22,163,74,0.35); }
        .pg-btn:disabled { opacity:0.3; cursor:not-allowed; }
        .new-sub-btn { display:flex; align-items:center; gap:8px; padding:11px 20px; border-radius:10px; background:transparent; border:1.5px solid #16a34a; color:#4ade80; font-size:13px; font-weight:600; cursor:pointer; transition:all 0.18s; font-family:'DM Sans',sans-serif; white-space:nowrap; }
        .new-sub-btn:hover { background:rgba(22,163,74,0.12); }
        .action-icon-btn { background:none; border:none; cursor:pointer; color:rgba(255,255,255,0.35); padding:7px; border-radius:7px; display:inline-flex; align-items:center; justify-content:center; transition:all 0.15s; }
        .action-icon-btn:hover { background:rgba(255,255,255,0.09); color:#e2e8f0; }
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: "#f1f5f0" }}>
        <Sidebar onLogout={() => setShowLogout(true)} />

        <main style={{ flex: 1, overflowY: "auto", padding: "0 40px 48px" }}>
          {/* Phase banner */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"18px 0", borderBottom:"1px solid #e2e8f0", marginBottom:"32px" }}>
            <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.18em", color:"#6b7280", textTransform:"uppercase" }}>Election Phase: Collation</span>
            <div style={{ display:"flex", alignItems:"center", gap:"9px", background:"#1a3326", color:"#e2e8f0", padding:"10px 16px", borderRadius:"10px", fontSize:"13px", fontWeight:500, border:"1px solid rgba(255,255,255,0.08)" }}>
              <Calendar size={15} color="#4ade80" />Oct 24, 2023 · 14:35 PM
            </div>
          </div>

          {/* Page header */}
          <div className="fade-up delay-1" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:"28px" }}>
            <div>
              <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"36px", fontWeight:800, color:"#0f172a", letterSpacing:"-0.02em", lineHeight:1.1, marginBottom:"8px" }}>Submission</h1>
              <p style={{ fontSize:"14px", color:"#16a34a", fontWeight:400 }}>Track and manage your polling unit collation reports.</p>
            </div>
            <button className="new-sub-btn"><Plus size={16} /> New Submission</button>
          </div>

          <hr style={{ border:"none", borderTop:"1px solid #e2e8f0", marginBottom:"28px" }} />

          {/* Stat cards */}
          <div className="fade-up delay-2" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"16px", marginBottom:"24px" }}>
            {[
              { label:"TOTAL SUBMISSIONS",    value:"24", icon:AlignLeft,    accent:"#4ade80" },
              { label:"ACCEPTED",             value:"18", icon:CheckCircle2, accent:"#4ade80" },
              { label:"PENDING VERIFICATION", value:"6",  icon:Clock3,       accent:"#f59e0b" },
            ].map(({ label, value, icon: Icon, accent }) => (
              <div key={label} style={{ background:"#1a3326", borderRadius:"14px", padding:"22px 24px", border:"1px solid rgba(255,255,255,0.06)", position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", right:"-6px", bottom:"-6px", opacity:0.1, color:accent }}><Icon size={80} strokeWidth={1} /></div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:"14px" }}>
                  <span style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", color:"rgba(255,255,255,0.45)", textTransform:"uppercase" }}>{label}</span>
                  <Icon size={20} color={accent} strokeWidth={1.5} />
                </div>
                <p style={{ fontFamily:"'Syne',sans-serif", fontSize:"44px", fontWeight:800, color:"#f1f5f9", lineHeight:1 }}>{value}</p>
              </div>
            ))}
          </div>

          {/* Filter bar */}
          <div className="fade-up delay-2" style={{ background:"#1a3326", borderRadius:"14px", padding:"16px 20px", marginBottom:"16px", display:"flex", gap:"12px", alignItems:"center", border:"1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ position:"relative", flex:2 }}>
              <Search size={15} style={{ position:"absolute", left:"14px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", pointerEvents:"none" }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by PU Name or ID..."
                style={{ width:"100%", height:"46px", paddingLeft:"40px", paddingRight:"14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", color:"#e2e8f0", fontSize:"13px", outline:"none", fontFamily:"'DM Sans',sans-serif" }}
                onFocus={e => e.target.style.borderColor="rgba(74,222,128,0.5)"}
                onBlur={e  => e.target.style.borderColor="rgba(255,255,255,0.1)"}
              />
            </div>
            <FilterSelect value={lga}  onChange={setLga}  options={["All LGAs","Ikeja","Surulere","Yaba","Agege"]} />
            <FilterSelect value={ward} onChange={setWard} options={["All Wards","Ward A","Ward B","Ward C","Ward G"]} />
            <div style={{ position:"relative", flex:1.4 }}>
              <Calendar size={15} style={{ position:"absolute", left:"13px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", pointerEvents:"none" }} />
              <input type="text" placeholder="Select Date Range" readOnly style={{ width:"100%", height:"46px", paddingLeft:"36px", paddingRight:"14px", background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:"10px", color:"rgba(255,255,255,0.5)", fontSize:"13px", outline:"none", fontFamily:"'DM Sans',sans-serif", cursor:"pointer" }} />
            </div>
          </div>

          {/* Table */}
          <div className="fade-up delay-3" style={{ background:"#1a3326", borderRadius:"14px", overflow:"hidden", border:"1px solid rgba(255,255,255,0.06)" }}>
            <table className="sub-table">
              <thead>
                <tr>
                  <th>Date &amp; Time</th>
                  <th>Polling Unit</th>
                  <th>Location (LGA/Ward)</th>
                  <th style={{ textAlign:"center" }}>Votes Recorded</th>
                  <th>Status</th>
                  <th style={{ textAlign:"right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => {
                  const cfg = statusConfig[row.status];
                  const ActionIcon = cfg.actionIcon;
                  return (
                    <tr key={i}>
                      <td>
                        <p style={{ fontSize:"13px", color:"#e2e8f0", fontWeight:500 }}>{row.date}</p>
                        <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginTop:"2px" }}>{row.time}</p>
                      </td>
                      <td>
                        <p style={{ fontSize:"13px", color:"#e2e8f0", fontWeight:600 }}>{row.puCode}</p>
                        <p style={{ fontSize:"12px", color:"rgba(255,255,255,0.4)", marginTop:"2px" }}>{row.puName}</p>
                      </td>
                      <td style={{ fontSize:"13px", color:"rgba(255,255,255,0.6)" }}>{row.location}</td>
                      <td style={{ textAlign:"center", fontSize:"14px", fontWeight:600, color: row.votes ? "#e2e8f0" : "rgba(255,255,255,0.3)" }}>{row.votes ?? "—"}</td>
                      <td>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:cfg.dot, flexShrink:0, boxShadow:`0 0 6px ${cfg.dot}80` }} />
                          <span style={{ fontSize:"11px", fontWeight:700, color:cfg.color, letterSpacing:"0.06em", lineHeight:1.35 }}>
                            {cfg.label.split("\n").map((l, j) => <span key={j} style={{ display:"block" }}>{l}</span>)}
                          </span>
                        </div>
                      </td>
                      <td style={{ textAlign:"right" }}>
                        <button className="action-icon-btn"><ActionIcon size={17} /></button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"16px 20px", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)" }}>
                Showing <span style={{ color:"#e2e8f0", fontWeight:600 }}>1-5</span> of <span style={{ color:"#e2e8f0", fontWeight:600 }}>24</span>
              </span>
              <div style={{ display:"flex", gap:"6px", alignItems:"center" }}>
                <button className="pg-btn" disabled={page===1} onClick={() => setPage(p => Math.max(1,p-1))}><ChevronLeft size={14} /></button>
                {[1,2,3].map(n => (
                  <button key={n} className={`pg-btn${page===n?" active":""}`} onClick={() => setPage(n)}>{n}</button>
                ))}
                <button className="pg-btn" disabled={page===totalPages} onClick={() => setPage(p => Math.min(totalPages,p+1))}><ChevronRight size={14} /></button>
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
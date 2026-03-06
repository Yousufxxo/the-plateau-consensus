
import {
  LayoutDashboard,
  Users,
  Shield,
  Radio,
  BarChart3,
  Calendar,
  FileText,
  MessageSquare,
  Image,
  Bell,
  Settings,
} from "lucide-react";

const menu = [
  { name: "Dashboard Overview", icon: LayoutDashboard },
  { name: "Users", icon: Users },
  { name: "Agents", icon: Shield },
  { name: "Situation Room", icon: Radio },
  { name: "Election Collation", icon: BarChart3 },
  { name: "Events & Activities", icon: Calendar },
  { name: "Blog & Articles", icon: FileText },
  { name: "Community Forum", icon: MessageSquare },
  { name: "Media Library", icon: Image },
  { name: "Notifications", icon: Bell },
  { name: "Settings", icon: Settings },
];

const Sidebar = () => {
  return (
    <div className="w-[260px] bg-[#0F172A] text-gray-300 border-r border-gray-800 flex flex-col min-h-screen">

      {/* Logo */}
      <div className="px-6 py-6 border-b border-gray-800">
        <div className="flex items-center">
          <img
            src="/brand-logo.png"
            alt="The Plateau Consensus"
            className="h-10 w-auto"
          />
        </div>
      </div>

      {/* Menu */}
      <div className="flex-1 px-4 py-6 space-y-1">
        {menu.map((item, i) => (
          <button
            key={i}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm transition ${
              i === 0
                ? "bg-green-600 text-white"
                : "hover:bg-gray-800"
            }`}
          >
            <item.icon size={18} />
            {item.name}
          </button>
        ))}
      </div>

    </div>
  );
};

export default Sidebar;
// import { Users, Shield, FileText, TrendingUp, AlertTriangle, MapPin } from "lucide-react";

// const stats = [
//   { title: "TOTAL USERS", value: "12,847", change: "+12%", icon: Users },
//   { title: "ACTIVE AGENTS", value: "384", change: "+12%", icon: Shield },
//   { title: "TOTAL REPORTS", value: "2,847", change: "+12%", icon: FileText },
//   { title: "VERIFIED REPORTS", value: "1,923", change: "+8%", icon: TrendingUp },
//   { title: "CRITICAL INCIDENTS", value: "42", change: "-5%", icon: AlertTriangle },
//   { title: "REGIONS REPORTING", value: "36/37", change: "+97%", icon: MapPin },
// ];

// const Stats = () => {
//   return (
//     <div className="grid grid-cols-3 gap-6">
//       {stats.map((stat, i) => (
//         <div
//           key={i}
//           className="bg-white border border-gray-200 rounded-xl p-6 flex justify-between"
//         >
//           <div>
//             <p className="text-xs text-gray-500">{stat.title}</p>
//             <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
//             <p className="text-green-600 text-sm mt-1">{stat.change}</p>
//           </div>

//           <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
//             <stat.icon size={20} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Stats;


import {
  Users,
  Shield,
  FileText,
  TrendingUp,
  AlertTriangle,
  MapPin,
} from "lucide-react";

interface StatItem {
  title: string;
  value: string;
  change: string;
  icon: any;
}

interface StatsProps {
  statsData?: StatItem[];
}

const defaultStats: StatItem[] = [
  { title: "TOTAL USERS", value: "12,847", change: "+12%", icon: Users },
  { title: "ACTIVE AGENTS", value: "384", change: "+12%", icon: Shield },
  { title: "TOTAL REPORTS", value: "2,847", change: "+12%", icon: FileText },
  { title: "VERIFIED REPORTS", value: "1,923", change: "+8%", icon: TrendingUp },
  { title: "CRITICAL INCIDENTS", value: "42", change: "-5%", icon: AlertTriangle },
  { title: "REGIONS REPORTING", value: "36/37", change: "+97%", icon: MapPin },
];

const Stats = ({ statsData = defaultStats }: StatsProps) => {
  return (
    <div className="grid grid-cols-3 gap-6">

      {statsData.map((stat, i) => {
        const Icon = stat.icon;

        return (
          <div
            key={i}
            className="bg-[#0F172A] border border-gray-800 rounded-xl p-6 flex justify-between items-center"
          >
            {/* Text */}
            <div>
              <p className="text-xs text-gray-400 tracking-wide">
                {stat.title}
              </p>

              <h3 className="text-2xl font-bold text-white mt-1">
                {stat.value}
              </h3>

              <p
                className={`text-sm mt-1 ${
                  stat.change.startsWith("+")
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {stat.change}
              </p>
            </div>

            {/* Icon */}
            <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-300">
              <Icon size={20} />
            </div>
          </div>
        );
      })}

    </div>
  );
};

export default Stats;
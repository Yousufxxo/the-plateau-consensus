import { Users, ShieldCheck, Mail, User } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "12,847",
    icon: Users,
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Active Users",
    value: "11,234",
    icon: ShieldCheck,
    color: "bg-green-500/20 text-green-400",
  },
  {
    title: "Pending Verification",
    value: "1,613",
    icon: Mail,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Agents",
    value: "384",
    icon: User,
    color: "bg-yellow-500/20 text-yellow-400",
  },
];

const UsersStats = () => {
  return (
    <div className="grid grid-cols-4 gap-6">

      {stats.map((stat, i) => (
        <div
          key={i}
          className="bg-slate-800 border border-slate-700 rounded-xl p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-gray-400">{stat.title}</p>
            <h3 className="text-xl font-bold text-white">{stat.value}</h3>
          </div>

          <div className={`p-3 rounded-lg ${stat.color}`}>
            <stat.icon size={20} />
          </div>
        </div>
      ))}

    </div>
  );
};

export default UsersStats;
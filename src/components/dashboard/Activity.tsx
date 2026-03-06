
// interface ActivityProps {
//   data?: any[]; // array of activity items
// }

// const Activity: React.FC<ActivityProps> = ({ data }) => {
//   const activities = data || [
//     { user: "John Doe", action: "added a new report", time: "2 mins ago" },
//     { user: "Jane Smith", action: "verified an incident", time: "10 mins ago" },
//   ];

//   return (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4">
//       <h3 className="font-bold text-lg text-gray-900 dark:text-white">Recent Activity</h3>
//       {activities.map((act, i) => (
//         <p key={i} className="text-sm text-gray-700 dark:text-gray-300">
//           <span className="font-semibold">{act.user}</span> {act.action} - <span className="text-gray-500 dark:text-gray-400">{act.time}</span>
//         </p>
//       ))}
//     </div>
//   );
// };

// export default Activity;


interface ActivityItem {
  user: string;
  action: string;
  time: string;
}

interface ActivityProps {
  data?: ActivityItem[];
}

const placeholderActivity: ActivityItem[] = [
  {
    user: "John Doe",
    action: "submitted a new incident report",
    time: "2 mins ago",
  },
  {
    user: "Jane Smith",
    action: "verified an incident in Plateau Central",
    time: "10 mins ago",
  },
  {
    user: "Agent Musa",
    action: "uploaded evidence to situation room",
    time: "25 mins ago",
  },
  {
    user: "Admin",
    action: "approved new agent registration",
    time: "1 hour ago",
  },
];

const Activity: React.FC<ActivityProps> = ({ data }) => {
  const activities = data || placeholderActivity;

  return (
    <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-6">

      {/* Title */}
      <h3 className="font-semibold text-white mb-6">
        RECENT ACTIVITY
      </h3>

      {/* Activity Feed */}
      <div className="space-y-5">

        {activities.map((act, i) => (
          <div key={i} className="flex items-start gap-4">

            {/* Timeline dot */}
            <div className="mt-2 w-2 h-2 bg-green-500 rounded-full"></div>

            {/* Activity text */}
            <div className="flex-1">
              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">
                  {act.user}
                </span>{" "}
                {act.action}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {act.time}
              </p>
            </div>

          </div>
        ))}

      </div>

    </div>
  );
};

export default Activity;
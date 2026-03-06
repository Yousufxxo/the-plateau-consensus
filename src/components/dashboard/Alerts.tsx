// interface AlertsProps {
//   data?: any[]; // array of alerts
// }

// const Alerts: React.FC<AlertsProps> = ({ data }) => {
//   const alerts = data || [
//     { type: "Critical", message: "Server outage in region 3" },
//     { type: "Warning", message: "Agent inactive for 2 days" },
//   ];

//   return (
//     <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4">
//       <h3 className="font-bold text-lg text-gray-900 dark:text-white">Alerts</h3>
//       {alerts.map((alert, i) => (
//         <div
//           key={i}
//           className={`p-3 rounded-lg text-sm ${
//             alert.type === "Critical"
//               ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-400"
//               : "bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-400"
//           }`}
//         >
//           {alert.message}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Alerts;

interface AlertItem {
  type: "Critical" | "Warning" | "Info";
  message: string;
  time?: string;
}

interface AlertsProps {
  data?: AlertItem[];
}

const placeholderAlerts: AlertItem[] = [
  {
    type: "Critical",
    message: "Server outage in Plateau Central",
    time: "2 min ago",
  },
  {
    type: "Warning",
    message: "Agent inactive for 2 days",
    time: "10 min ago",
  },
  {
    type: "Info",
    message: "New report submitted from Plateau South",
    time: "30 min ago",
  },
];

const Alerts: React.FC<AlertsProps> = ({ data }) => {
  const alerts = data || placeholderAlerts;

  return (
    <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-6">

      {/* Title */}
      <h3 className="font-semibold text-white mb-6">
        CRITICAL ALERTS
      </h3>

      {/* Alerts list */}
      <div className="space-y-4">

        {alerts.map((alert, i) => {

          const typeStyle =
            alert.type === "Critical"
              ? "bg-red-500/10 text-red-400"
              : alert.type === "Warning"
              ? "bg-yellow-500/10 text-yellow-400"
              : "bg-blue-500/10 text-blue-400";

          const badgeStyle =
            alert.type === "Critical"
              ? "bg-red-500"
              : alert.type === "Warning"
              ? "bg-yellow-400"
              : "bg-blue-400";

          return (
            <div
              key={i}
              className="flex items-start justify-between p-4 rounded-lg bg-slate-900 border border-gray-800"
            >
              <div className="flex items-start gap-3">

                {/* Alert dot */}
                <span className={`w-2 h-2 mt-2 rounded-full ${badgeStyle}`} />

                {/* Message */}
                <div>
                  <p className="text-sm text-gray-300">
                    {alert.message}
                  </p>

                  {alert.time && (
                    <p className="text-xs text-gray-500 mt-1">
                      {alert.time}
                    </p>
                  )}
                </div>

              </div>

              {/* Type badge */}
              <span
                className={`text-xs px-2 py-1 rounded-full ${typeStyle}`}
              >
                {alert.type}
              </span>

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default Alerts;
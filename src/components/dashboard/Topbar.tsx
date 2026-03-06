// import { Moon, Bell } from "lucide-react";
// import { useEffect, useState } from "react";

// const Topbar = ({ admin }) => {
//   const [time, setTime] = useState("");

//   useEffect(() => {
//     const updateTime = () => {
//       const now = new Date();
//       const utc = now.toUTCString().split(" ")[4];
//       setTime(utc + " UTC");
//     };

//     updateTime();
//     const interval = setInterval(updateTime, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 px-8 py-5 flex items-center justify-between">

//       {/* Title */}
//       <div>
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
//           Dashboard Overview
//         </h1>
//         <p className="text-gray-500 dark:text-gray-400 text-sm">
//           Real-time monitoring of civic engagement across all regions
//         </p>
//       </div>

//       {/* Right side */}
//       <div className="flex items-center gap-6">

//         {/* Voting status */}
//         <div className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 text-sm px-4 py-1 rounded-full font-medium">
//           VOTING ONGOING
//         </div>

//         {/* Time */}
//         <span className="text-gray-500 dark:text-gray-400 text-sm">
//           {time}
//         </span>

//         {/* Dark toggle */}
//         <Moon className="text-gray-500 dark:text-gray-300 cursor-pointer" size={20} />

//         {/* Notification */}
//         <Bell className="text-gray-500 dark:text-gray-300 cursor-pointer" size={20} />

//         {/* Admin */}
//         <div className="flex items-center gap-3">
//           <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
//             {admin?.name?.charAt(0) || "A"}
//           </div>

//           <div className="text-sm">
//             <p className="font-semibold text-gray-900 dark:text-white">
//               {admin?.name || "Administrator"}
//             </p>
//             <p className="text-gray-500 dark:text-gray-400 text-xs">
//               {admin?.email || "admin@consensus.org"}
//             </p>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Topbar;


import { Moon, Bell } from "lucide-react";
import { useEffect, useState } from "react";

interface Admin {
  name?: string;
  email?: string;
}

interface TopbarProps {
  admin?: Admin;
}

const Topbar = ({ admin }: TopbarProps) => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const utc = now.toUTCString().split(" ")[4];
      setTime(`${utc} UTC`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#0F172A] border-b border-gray-800 px-8 py-5 flex items-center justify-between">

      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Dashboard Overview
        </h1>

        <p className="text-gray-400 text-sm">
          Real-time monitoring of civic engagement across all regions
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">

        {/* Voting Status */}
        <div className="bg-green-600/20 text-green-400 text-sm px-4 py-1 rounded-full font-medium">
          VOTING ONGOING
        </div>

        {/* UTC Time */}
        <span className="text-gray-400 text-sm">
          {time}
        </span>

        {/* Icons */}
        <Moon className="text-gray-400 cursor-pointer" size={20} />

        <Bell className="text-gray-400 cursor-pointer" size={20} />

        {/* Admin Profile */}
        <div className="flex items-center gap-3">

          <div className="w-9 h-9 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
            {admin?.name?.charAt(0) || "A"}
          </div>

          <div className="text-sm">
            <p className="font-semibold text-white">
              {admin?.name || "Administrator"}
            </p>

            <p className="text-gray-400 text-xs">
              {admin?.email || "admin@consensus.org"}
            </p>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Topbar;
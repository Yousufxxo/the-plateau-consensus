const users = [
  {
    name: "Sarah Okonkwo",
    email: "sarah.o@consensus.org",
    role: "Election Coordinator",
    region: "Plateau North",
    status: "active",
    joined: "Nov 15, 2025",
  },
  {
    name: "John Danladi",
    email: "john.d@consensus.org",
    role: "Field Agent",
    region: "Jos North",
    status: "active",
    joined: "Dec 3, 2025",
  },
];

const UsersTable = () => {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">

      <table className="w-full text-sm text-left">

        <thead className="bg-slate-900 text-gray-400">
          <tr>
            <th className="p-4">User</th>
            <th>Role</th>
            <th>Region</th>
            <th>Status</th>
            <th>Joined</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, i) => (
            <tr key={i} className="border-t border-slate-700">

              <td className="p-4">
                <p className="text-white font-medium">{user.name}</p>
                <p className="text-gray-400 text-xs">{user.email}</p>
              </td>

              <td className="text-gray-300">{user.role}</td>

              <td className="text-gray-300">{user.region}</td>

              <td>
                <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs">
                  {user.status}
                </span>
              </td>

              <td className="text-gray-400">{user.joined}</td>

            </tr>
          ))}
        </tbody>

      </table>

    </div>
  );
};

export default UsersTable;
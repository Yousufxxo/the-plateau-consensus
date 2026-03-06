import UsersHeader from "@/components/dashboard/users/UsersHeader";
import UsersStats from "@/components/dashboard/users/UsersStats";
import UsersTable from "@/components/dashboard/users/UsersTable";

const UsersPage = () => {
  return (
    <div className="p-8 space-y-6 bg-slate-900 min-h-screen">

      <UsersHeader />

      <UsersStats />

      <UsersTable />

    </div>
  );
};

export default UsersPage;
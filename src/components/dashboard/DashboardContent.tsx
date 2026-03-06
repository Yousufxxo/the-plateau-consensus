import Stats from "./Stats";
import ReportsChart from "./ReportsChart";
import Alerts from "./Alerts";
import Activity from "./Activity";

interface DashboardContentProps {
  statsData: any[];
  reportsData: any;
  alertsData: any[];
  activityData: any[];
}

const DashboardContent = ({
  statsData,
  reportsData,
  alertsData,
  activityData,
}: DashboardContentProps) => {
  return (
    <div className="p-8 space-y-8">

      {/* Stats */}
      <Stats statsData={statsData} />

      {/* Reports + Alerts */}
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <ReportsChart data={reportsData} />
        </div>

        <Alerts data={alertsData} />
      </div>

      {/* Activity */}
      <Activity data={activityData} />

    </div>
  );
};

export default DashboardContent;
interface ReportItem {
  region: string;
  value: number;
}

interface ReportsChartProps {
  data?: ReportItem[];
}

const placeholderData: ReportItem[] = [
  { region: "Plateau North", value: 160 },
  { region: "Plateau Central", value: 210 },
  { region: "Plateau South", value: 140 },
];

const ReportsChart = ({ data = placeholderData }: ReportsChartProps) => {

  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div className="bg-[#0F172A] border border-gray-800 rounded-xl p-6">

      {/* Title */}
      <h3 className="font-semibold text-white mb-6">
        REGIONAL REPORTS DISTRIBUTION
      </h3>

      {/* Chart */}
      <div className="flex items-end justify-around h-64">

        {data.map((item, index) => {

          const height = (item.value / maxValue) * 220;

          return (
            <div key={index} className="flex flex-col items-center">

              <div
                className="w-16 rounded-md bg-green-500"
                style={{ height: `${height}px` }}
              />

              <p className="text-sm text-gray-400 mt-3 text-center">
                {item.region}
              </p>

            </div>
          );
        })}

      </div>

      {/* Legend */}
      <div className="flex gap-6 mt-6 text-sm">

        <span className="flex items-center gap-2 text-gray-400">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          Active
        </span>

        <span className="flex items-center gap-2 text-gray-400">
          <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
          Warning
        </span>

        <span className="flex items-center gap-2 text-gray-400">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          Critical
        </span>

      </div>

    </div>
  );
};

export default ReportsChart;
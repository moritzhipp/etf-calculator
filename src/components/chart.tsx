import { ChartData } from "@/utils-calculations";
import { formatEuro } from "@/utils-general";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { sum, renditeSum, einzahlungSum, auszahlungSum } =
      payload[0].payload;

    return (
      <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md rounded-md shadow-md">
        <p className="col-span-2">
          <b>{label}</b>
        </p>
        <div>Eingezahlt</div>
        <div className="text-right">{formatEuro(einzahlungSum)} </div>
        <div>Ausgezalt</div>
        <div className="text-right">{formatEuro(auszahlungSum)} </div>
        <div>Zinsgewinn</div>
        <div className="text-right">{formatEuro(renditeSum)}</div>
        <div className="border-t-1 border-gray-600 mt-1 pt-1">Summe</div>
        <div className="text-right  border-t-1 border-gray-600 mt-1 pt-1">
          {formatEuro(sum)}
        </div>
      </div>
    );
  }

  return null;
};

export const Chart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={700} className="p-2">
      <AreaChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip animationDuration={1500} content={<CustomTooltip />} />
        <CartesianGrid vertical={false} stroke="#444" strokeDasharray="2 10" />
        <Area
          stackId="1"
          strokeWidth={2}
          type="monotone"
          dataKey="einzahlungSum"
          stroke="#2284d8"
          fill="transparent"
        />
        <Area
          stackId="1"
          strokeWidth={2}
          type="monotone"
          dataKey="auszahlungSum"
          stroke="#2284d8"
          fill="transparent"
        />
        <Area
          strokeWidth={2}
          type="monotone"
          dataKey="sum"
          stroke="#8884d8"
          fill="transparent"
        />
        <Legend />
      </AreaChart>
    </ResponsiveContainer>
  );
};

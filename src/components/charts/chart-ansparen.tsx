import { ChartEinzSlice } from "@/utils-calculations";
import { formatEuro } from "@/utils-general";
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const ChartAnsparen = ({ data }: { data: ChartEinzSlice[] }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" className="p-2">
      <ComposedChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip animationDuration={1500} content={TooltipEinzahlung} />
        <CartesianGrid vertical={false} stroke="#444" strokeDasharray="2 10" />

        <Bar
          stackId="1"
          strokeWidth={1}
          type="monotone"
          dataKey="einzahlungSum"
          stroke="#00f"
        />
        <Bar
          stackId="1"
          strokeWidth={1}
          type="monotone"
          dataKey="renditeSum"
          stroke="#0f0"
        />

        <Legend />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

type PropsTooltip = {
  active: boolean;
  payload: any;
};

const TooltipEinzahlung = (props: PropsTooltip) => {
  const { active, payload } = props;
  if (!active || !payload || !props.payload[0]?.payload) return;
  const { einzahlungSum, sum, renditeSum, date } = props.payload[0].payload;
  return (
    <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md rounded-md shadow-md">
      <p className="col-span-2">
        <b>{date}</b>
      </p>
      <div>Eingezahlt</div>
      <div className="text-right">{formatEuro(einzahlungSum)} </div>
      <div>Zinsgewinn gesamt</div>
      <div className="text-right">{formatEuro(renditeSum)}</div>
      <div className="border-t-1 border-gray-600 mt-1 pt-1">Summe</div>
      <div className="text-right  border-t-1 border-gray-600 mt-1 pt-1">
        {formatEuro(sum)}
      </div>
    </div>
  );
};

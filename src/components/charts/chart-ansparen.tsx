import { themeColors } from "@/colors";
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
import colors from "tailwindcss/colors";

export const ChartAnsparen = ({ data }: { data: ChartEinzSlice[] }) => {
  const einzahlungColor = colors.purple;
  const renditeColor = colors.green;
  return (
    <div className="relative h-full">
      <ResponsiveContainer width="100%" height="100%" className="absolute">
        <ComposedChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip animationDuration={1500} content={TooltipEinzahlung} />
          <CartesianGrid
            vertical={false}
            stroke="#444"
            strokeDasharray="2 10"
          />
          <Bar
            stackId="1"
            type="monotone"
            dataKey="einzahlungSum"
            fill={themeColors.sum}
          />
          <Bar
            stackId="1"
            type="monotone"
            dataKey="renditeSum"
            fill={themeColors.rendite}
          />
          <Legend />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
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
    <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md bg-gray-950/80 backdrop-brightness-20 rounded-md shadow-md">
      <p className="col-span-2">
        <b>{date}</b>
      </p>
      <div>Einzahlung gesamt</div>
      <div className="text-right">{formatEuro(einzahlungSum)} </div>
      <div>Zinsgewinn gesamt</div>
      <div className="text-right">{formatEuro(renditeSum)}</div>
      <div className="border-t-1 border-gray-600 mt-1 pt-1">
        Summe Jahresende
      </div>
      <div className="text-right  border-t-1 border-gray-600 mt-1 pt-1">
        {formatEuro(sum)}
      </div>
    </div>
  );
};

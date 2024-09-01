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

export const ChartAuszahlen = ({ data }: { data: ChartEinzSlice[] }) => {
  return (
    <div className="relative h-full">
      <ResponsiveContainer className="absolute" width="100%" height="100%">
        <ComposedChart data={data}>
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip animationDuration={1500} content={TooltipAuszahlung} />
          <CartesianGrid
            vertical={false}
            stroke="#444"
            strokeDasharray="2 10"
          />
          <Bar
            stackId={1}
            strokeWidth={1}
            type="monotone"
            dataKey="etfValue"
            fill={themeColors.sum}
          />

          <Bar
            stackId={1}
            strokeWidth={1}
            type="monotone"
            dataKey="rendite"
            fill={themeColors.rendite}
          />

          <Bar
            stackId={2}
            strokeWidth={1}
            type="monotone"
            dataKey="auszahlung"
            fill={themeColors.auszahlung}
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

const TooltipAuszahlung = (props: PropsTooltip) => {
  const { active, payload } = props;

  if (!active || !payload || !props.payload[0]?.payload) return;
  const { auszahlung, sum, rendite, date, steuer } = props.payload[0].payload;

  return (
    <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md bg-gray-950/80  rounded-md shadow-md">
      <p className="col-span-2">
        <b>{date}</b>
      </p>
      <div>Steuer</div>
      <div className="text-right">{formatEuro(steuer)}</div>
      <div>Auszahlungen</div>
      <div className="text-right">{formatEuro(auszahlung)} </div>
      <div>Zinsgewinne</div>
      <div className="text-right">{formatEuro(rendite)}</div>
      <div className="border-t-1 border-gray-600 mt-1 pt-1">
        Summe Jahresende
      </div>
      <div className="text-right  border-t-1 border-gray-600 mt-1 pt-1">
        {formatEuro(sum)}
      </div>
    </div>
  );
};

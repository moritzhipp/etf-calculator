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

export const ChartAuszahlen = ({ data }: { data: ChartEinzSlice[] }) => {
  const sumColor = colors.blue;
  const auszahlungColor = colors.red;
  const renditeColor = colors.green;
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
            strokeWidth={1}
            type="monotone"
            dataKey="sum"
            fill={sumColor[600]}
          />
          <Bar
            strokeWidth={1}
            type="monotone"
            dataKey="rendite"
            fill={renditeColor[600]}
          />

          <Bar
            strokeWidth={1}
            type="monotone"
            dataKey="auszahlung"
            fill={auszahlungColor[600]}
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
  const { auszahlung, sum, rendite, date } = props.payload[0].payload;

  return (
    <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md bg-gray-950/80  rounded-md shadow-md">
      <p className="col-span-2">
        <b>{date}</b>
      </p>
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

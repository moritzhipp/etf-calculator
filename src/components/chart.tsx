import { ChartData } from "@/utils-calculations";
import { formatEuro } from "@/utils-general";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Chart = ({ data }: { data: ChartData[] }) => {
  return (
    <ResponsiveContainer width="100%" height={700} className="p-2">
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip animationDuration={1500} content={<CustomTooltip />} />
        <CartesianGrid vertical={false} stroke="#444" strokeDasharray="2 10" />
        <Line
          strokeWidth={1}
          type="monotone"
          dataKey="einzahlungSum"
          stroke="#00f"
          fill="transparent"
        />
        <Line
          strokeWidth={2}
          type="monotone"
          dataKey="renditeSum"
          stroke="#0f0"
          fill="transparent"
        />
        <Line
          strokeWidth={3}
          type="monotone"
          dataKey="auszahlungSum"
          stroke="#f00"
          fill="transparent"
        />
        <Line
          strokeWidth={4}
          type="monotone"
          dataKey="sum"
          stroke="#8884d8"
          fill="transparent"
        />
        <Legend />
      </LineChart>
    </ResponsiveContainer>
  );
};

const TooltipAuszahlung = ({ auszahlungSum, sum, rendite }) => {
  return (
    <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md rounded-md shadow-md">
      <p className="col-span-2">
        <b>Hi Aus</b>
      </p>
      <div>Ausgezalt</div>
      <div className="text-right">{formatEuro(auszahlungSum)} </div>
      <div>Zinsgewinn Monat</div>
      <div className="text-right">{formatEuro(rendite)}</div>
      <div className="border-t-1 border-gray-600 mt-1 pt-1">Summe</div>
      <div className="text-right  border-t-1 border-gray-600 mt-1 pt-1">
        {formatEuro(sum)}
      </div>
    </div>
  );
};

const TooltipEnzahlung = ({ einzahlungSum, sum, renditeSum }) => {
  return (
    <div className="grid grid-rows-2 gap-y-1 border-1 p-3 border-gray-600 backdrop-blur-md rounded-md shadow-md">
      <p className="col-span-2">
        <b>Hi Ein</b>
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

const CustomTooltip = (props) => {
  const { active, payload, label } = props;

  if (active && payload && payload.length) {
    const props = payload[0].payload;

    if (!props.auszahlungSum) {
      return <TooltipEnzahlung {...props} />;
    } else {
      return <TooltipAuszahlung {...props} />;
    }
  }

  return null;
};

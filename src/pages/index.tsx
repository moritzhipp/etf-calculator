import { Chart } from "@/components/chart";
import { Options } from "@/components/options";
import { Summary } from "@/components/summary";
import { ChartDataOptions, calculateChartData } from "@/utils-calculations";
import { useState } from "react";

export default function IndexPage() {
  const [options, setOptions] = useState<ChartDataOptions>({
    einmalbeitrag: 1000,
    dauer: 25,
    zins: 7.3,
    rate: 150,
  });
  const data = calculateChartData(options);

  const updateOptions = (newOptions: Partial<ChartDataOptions>) => {
    setOptions((prevOptions: ChartDataOptions) => ({
      ...prevOptions,
      ...newOptions,
    }));
  };

  return (
    <div>
      <Options options={options} onChange={updateOptions} />
      <Chart data={data} />
      <Summary data={data} options={options} />
    </div>
  );
}

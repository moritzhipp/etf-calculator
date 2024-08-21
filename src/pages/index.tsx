import { Chart } from "@/components/chart";
import { Options } from "@/components/options";
import { Summary } from "@/components/summary";
import { calculateChartData, ChartDataOptions } from "@/utils-calculations";
import { useState } from "react";

export default function IndexPage() {
  const [options, setOptions] = useState<ChartDataOptions>({
    einmalbeitrag: 1000,
    dauerEinz: 25,
    rateEinz: 100,
    rateAusz: 150,
    dauerAusz: 0,
    zins: 7.3,
    steuerfreibetrag: 1000,
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
      <Chart data={data.data} />
      <Summary summary={data.summary} options={options} />
    </div>
  );
}

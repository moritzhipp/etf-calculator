import { ChartAnsparen } from "@/components/charts/chart-ansparen";
import { ChartAuszahlen } from "@/components/charts/chart-auszahlen";
import { Options } from "@/components/options/options";
import {
  calculatAuszahlplan,
  calculateAnsparplan,
  ChartAuszSlice,
  ChartOptions,
} from "@/utils-calculations";
import { useState } from "react";

const optionsDefault: ChartOptions = {
  zins: 7.3,
  einzahlen: {
    einmalbeitrag: 1000,
    dauer: 10,
    rate: 100,
  },
  auszahlen: {
    einmalbeitrag: 100000,
    rate: 100,
    dauer: 10,
    steuerfreibetrag: 1000,
    startYearsInFuture: 10,
  },
};

export default function IndexPage() {
  const [options, setOptions] = useState<ChartOptions>(optionsDefault);
  const dataEinzahlen = calculateAnsparplan(options.einzahlen, options.zins);

  let dataAuszahlen: ChartAuszSlice[] = [];

  // hier an option 'auszahlplan generieren' orientieren
  if (dataEinzahlen?.length > 0) {
    const lastSum = dataEinzahlen[dataEinzahlen.length - 1].sum;
    const newOptions = {
      ...options.auszahlen,
      startYearsInFuture: options.einzahlen.dauer,
      einmalbeitrag: lastSum,
    };
    dataAuszahlen = calculatAuszahlplan(newOptions, options.zins);
  } else {
    dataAuszahlen = calculatAuszahlplan(options.auszahlen, options.zins);
  }

  return (
    <div>
      <Options options={options} onChange={setOptions} />
      <ChartAnsparen data={dataEinzahlen} />
      <ChartAuszahlen data={dataAuszahlen} />
      {/* <Summary summary={dataEinzahlen.summary} options={options} /> */}
    </div>
  );
}

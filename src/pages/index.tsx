import { ChartAnsparen } from "@/components/charts/chart-ansparen";
import { ChartAuszahlen } from "@/components/charts/chart-auszahlen";
import { Options } from "@/components/options/options";
import {
  calculatAuszahlplan,
  calculateAnsparplan,
  ChartAuszSlice,
  ChartEinzSlice,
  ChartOptions,
} from "@/utils-calculations";
import { showAnsparOptions, showAuszahlOptions } from "@/utils-general";
import { useState } from "react";

const optionsDefault: ChartOptions = {
  grundlagen: {
    zins: 7.3,
    calcType: "ansparplan",
    inflation: 3,
  },
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
  },
};

export default function IndexPage() {
  const [options, setOptions] = useState<ChartOptions>(optionsDefault);
  const { calcType } = options.grundlagen;

  let dataEinzahlen: ChartEinzSlice[] = [];
  let dataAuszahlen: ChartAuszSlice[] = [];

  if (calcType === "ansparplan") {
    dataEinzahlen = calculateAnsparplan(options);
    console.log("Ansparplan", dataEinzahlen);
  }

  if (calcType === "combiplan") {
    dataEinzahlen = calculateAnsparplan(options);
    const lastSum = dataEinzahlen[dataEinzahlen.length - 1].sum;
    dataAuszahlen = calculatAuszahlplan(options, lastSum);
    console.log("Combiplan", { dataEinzahlen, dataAuszahlen });
  }

  if (calcType === "auszahlplan") {
    dataAuszahlen = calculatAuszahlplan(options);
    console.log("Auszahlplan", dataAuszahlen);
  }

  return (
    <div className="p-4">
      <Options options={options} onChange={setOptions} />
      {showAnsparOptions(options) && <ChartAnsparen data={dataEinzahlen} />}
      {showAuszahlOptions(options) && <ChartAuszahlen data={dataAuszahlen} />}

      {/* <Summary summary={dataEinzahlen.summary} options={options} /> */}
    </div>
  );
}

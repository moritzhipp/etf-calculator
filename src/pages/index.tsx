import { ChartAnsparen } from "@/components/charts/chart-ansparen";
import { ChartAuszahlen } from "@/components/charts/chart-auszahlen";
import { Options } from "@/components/options/options";
import { SummaryAusz } from "@/components/summary/summary-ausz";
import { SummaryEinz } from "@/components/summary/summary-einz";
import { TableAuszahlen } from "@/components/tables/table-auszahlen";
import { TableEinzahlen } from "@/components/tables/table-einzahlen";
import {
  calculatAuszahlplan,
  calculateAnsparplan,
  ChartAuszSlice,
  ChartEinzSlice,
  ChartOptions,
} from "@/utils-calculations";
import {
  getLastSlice,
  showAnsparOptions,
  showAuszahlOptions,
} from "@/utils-general";
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
  let lastEinzSlice: ChartEinzSlice;
  let lastAuszSlice: ChartAuszSlice;

  const showEinzTable = false;
  const showAuszTable = false;

  if (showAnsparOptions(options)) {
    dataEinzahlen = calculateAnsparplan(options);
    lastEinzSlice = getLastSlice(dataEinzahlen);
  }

  if (calcType === "combiplan") {
    const lastSum = dataEinzahlen[dataEinzahlen.length - 1].sum;
    dataAuszahlen = calculatAuszahlplan(options, lastSum);
  }

  if (calcType === "auszahlplan") {
    dataAuszahlen = calculatAuszahlplan(options);
  }

  if (showAuszahlOptions(options)) {
    lastAuszSlice = getLastSlice(dataAuszahlen);
  }

  return (
    <div className="flex  flex-col xl:flex-row gap-4 h-dvh p-4">
      <div className="flex flex-col gap-4 xl:w-1/4">
        <Options options={options} onChange={setOptions} />
        <div className="flex flex-row xl:flex-col  gap-4 ">
          {showAnsparOptions(options) && (
            <SummaryEinz options={options} lastSlice={lastEinzSlice} />
          )}
          {showAuszahlOptions(options) && (
            <SummaryAusz
              options={options}
              lastEinzSlice={lastEinzSlice}
              lastAuszSlice={lastAuszSlice}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        {showAnsparOptions(options) &&
          DataVisEinzahlen({ data: dataEinzahlen, isTable: showEinzTable })}
        {showAuszahlOptions(options) &&
          DataVisAuszahlen({ data: dataAuszahlen, isTable: showAuszTable })}
      </div>
    </div>
  );
}

type VisAuszProps = {
  data: ChartAuszSlice[];
  isTable: boolean;
};
const DataVisAuszahlen = (props: VisAuszProps) => {
  const { data, isTable } = props;

  if (isTable) {
    return <TableAuszahlen data={data} />;
  } else {
    return <ChartAuszahlen data={data} />;
  }
};

type VisEinzProps = {
  data: ChartEinzSlice[];
  isTable: boolean;
};
const DataVisEinzahlen = (props: VisEinzProps) => {
  const { data, isTable } = props;

  if (isTable) {
    return <TableEinzahlen data={data} />;
  } else {
    return <ChartAnsparen data={data} />;
  }
};

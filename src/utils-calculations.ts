import { getDateInXYears } from "./utils-general";

export type ChartOptions = {
  grundlagen: ChartGrundlagenOptions;
  einzahlen: ChartEinzOptions;
  auszahlen: ChartAuszOptions;
};

export type ChartGrundlagenOptions = {
  zins: number;
  inflation: number;
  calcType: CalcType;
};

export type CalcType = "ansparplan" | "auszahlplan" | "combiplan";

export type ChartEinzOptions = {
  einmalbeitrag: number;
  dauer: number;
  rate: number;
};

export type ChartAuszOptions = ChartEinzOptions & {
  steuerfreibetrag: number;
};

export type ChartData = {
  data: ChartEinzSlice[];
  summary: ChartSummary;
};

export type ChartSummary = {
  ansparen: ChartEinzSlice;
  auszahlen?: ChartEinzSlice;
};

export type ChartEinzSlice = {
  date: string;
  einzahlungSum?: number;
  renditeSum?: number;
  rendite: number;
  sum: number;
};

export type ChartAuszSlice = {
  date: string;
  auszahlung: number;
  rendite: number;
  sum: number;
};

export function calculateAnsparplan(options: ChartOptions): ChartEinzSlice[] {
  const { dauer, rate, einmalbeitrag } = options.einzahlen;
  const { zins } = options.grundlagen;

  let chartData = [];

  const percentagePerMonth = zins / 100;

  let rateYearly = rate * 12;
  let currentEinzahlungenSum = einmalbeitrag + rateYearly;
  let currentSum = currentEinzahlungenSum;
  let currentRenditeSum = 0;
  let rendite = 0;

  // einzahlung
  chartData.push({
    date: getDateInXYears(0),
    einzahlungSum: currentEinzahlungenSum,
    renditeSum: currentRenditeSum,
    rendite,
    sum: currentSum,
  });

  for (let i = 0; i < dauer - 1; i++) {
    rendite = currentSum * percentagePerMonth;
    currentRenditeSum += rendite;
    currentEinzahlungenSum += rateYearly;
    currentSum = currentSum + rendite + rateYearly;

    chartData.push({
      date: getDateInXYears(i + 1),
      einzahlungSum: currentEinzahlungenSum,
      renditeSum: currentRenditeSum,
      rendite,
      sum: currentSum,
    });
  }

  return chartData;
}

export function calculatAuszahlplan(
  options: ChartOptions,
  lastSum?: number
): ChartAuszSlice[] {
  const { dauer, rate, steuerfreibetrag, einmalbeitrag } = options.auszahlen;
  const { zins, calcType } = options.grundlagen;

  let startYearsInFuture =
    calcType === "combiplan" ? options.einzahlen.dauer : 0;

  let chartData = [];
  const rateYearly = rate * 12;
  const percentage = zins / 100;
  let currentSum = lastSum || einmalbeitrag;

  let rendite = 0;

  for (let i = 0; i < dauer; i++) {
    rendite = currentSum * percentage;
    currentSum = currentSum + rendite - rateYearly;

    chartData.push({
      date: getDateInXYears(i + startYearsInFuture),
      auszahlung: rateYearly,
      rendite,
      sum: currentSum,
    });
  }

  return chartData;
}

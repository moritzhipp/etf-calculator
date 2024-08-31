import { getDateInXYears } from "./utils-general";

export type ChartOptions = {
  zins: number;
  einzahlen: ChartEinzOptions;
  auszahlen: ChartAuszOptions;
};

export type ChartEinzOptions = {
  einmalbeitrag: number;
  dauer: number;
  rate: number;
};

export type ChartAuszOptions = ChartEinzOptions & {
  steuerfreibetrag: number;
  startYearsInFuture: number;
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

export function calculateAnsparplan(
  input: ChartEinzOptions,
  zins: number
): ChartEinzSlice[] {
  const { dauer, rate, einmalbeitrag } = input;

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
  input: ChartAuszOptions,
  zins: number
): ChartAuszSlice[] {
  const { dauer, rate, steuerfreibetrag, einmalbeitrag, startYearsInFuture } =
    input;

  let chartData = [];

  const percentage = zins / 100;

  let currentSum = einmalbeitrag + rate;
  let rateYearly = rate * 12;

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

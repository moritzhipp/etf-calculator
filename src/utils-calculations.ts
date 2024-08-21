import { getDateInXMonths } from "./utils-general";

export type ChartDataOptions = {
  zins: number;
  steuerfreibetrag: number;
  einmalbeitrag: number;
  dauerEinz: number;
  dauerAusz: number;
  rateAusz: number;
  rateEinz: number;
};

export type ChartData = {
  data: ChartSlice[];
  summary: ChartSummary;
};

export type ChartSummary = {
  ansparen: ChartSlice;
  auszahlen?: ChartSlice;
};

export type ChartSlice = {
  date: string;
  einzahlungSum?: number;
  auszahlungSum?: number;
  renditeSum?: number;
  rendite: number;
  sum: number;
};

export function calculateChartData(input: ChartDataOptions): ChartData {
  const { dauerEinz, rateEinz, dauerAusz, rateAusz, einmalbeitrag, zins } =
    input;

  let chartData = [];

  const percentagePerMonth = zins / 12 / 100;
  const dauerAuszInMonths = dauerAusz * 12;
  const dauerEinzInMonths = dauerEinz * 12;

  let currentEinzahlungenSum = einmalbeitrag + rateEinz;
  let currentSum = currentEinzahlungenSum;
  let currentRenditeSum = 0;
  let rendite = 0;

  // einzahlung
  chartData.push({
    date: getDateInXMonths(0),
    einzahlungSum: currentEinzahlungenSum,
    renditeSum: currentRenditeSum,
    rendite,
    sum: currentSum,
  });

  for (let i = 0; i < dauerEinzInMonths; i++) {
    rendite = currentSum * percentagePerMonth;
    currentRenditeSum += rendite;
    currentEinzahlungenSum += rateEinz;
    currentSum = currentSum + rendite + rateEinz;

    chartData.push({
      date: getDateInXMonths(i + 1),
      einzahlungSum: currentEinzahlungenSum,
      renditeSum: currentRenditeSum,
      rendite,
      sum: currentSum,
    });
  }

  const summaryEinz = chartData.slice(-1)[0];

  // auszahlung
  let currentAuszahlungSum = 0;

  for (let i = 0; i < dauerAuszInMonths; i++) {
    rendite = currentSum * percentagePerMonth;
    currentRenditeSum += rendite;
    currentSum = currentSum + rendite - rateAusz;
    currentAuszahlungSum += rateAusz;

    chartData.push({
      date: getDateInXMonths(dauerEinzInMonths + i),
      auszahlungSum: currentAuszahlungSum,
      rendite,
      sum: currentSum,
    });
  }

  let summaryAusz;

  if (dauerAusz) {
    summaryAusz = chartData.slice(-1)[0];
  }

  return {
    data: chartData,
    summary: { ansparen: summaryEinz, auszahlen: summaryAusz },
  };
}

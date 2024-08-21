import { getDateInXMonths } from "./utils-general";

export type Options = {
  inflation: number;
};

export type ChartDataOptions = {
  dauer: number;
  zins: number;
  rate: number;
  einmalbeitrag: number;
};

export type ChartData = {
  date: string;
  einzahlungSum?: number;
  renditeSum: number;
  sum: number;
  auszahlungSum?: number;
};

// Jahr 0 ist Jetzt
export function calculateChartData(input: ChartDataOptions): ChartData[] {
  const { dauer, zins, rate, einmalbeitrag } = input;
  console.log(input);

  const percentagePerMonth = zins / 12;
  const dauerInMonths = dauer * 12;

  let chartData: ChartData[] = [];
  let currentEinzahlungenSum = einmalbeitrag + rate;
  let currentSum = currentEinzahlungenSum;
  let currentRenditeSum = 0;

  for (let i = 0; i < dauerInMonths; i++) {
    chartData.push({
      date: getDateInXMonths(i),
      einzahlungSum: currentEinzahlungenSum,
      renditeSum: currentRenditeSum,
      sum: currentSum,
    });

    let rendite = currentSum * (percentagePerMonth / 100);
    currentEinzahlungenSum += rate;
    currentRenditeSum += rendite;
    currentSum += rendite + rate;
  }

  //   const lastItem = chartData[chartData.length - 1];

  //   const more = calculateAuszahlplan(
  //     { dauer: 5, zins, rate: 1000, einmalbeitrag: lastItem.sum || 0 },
  //     dauerInMonths
  //   );

  return [...chartData];
}

export function calculateAuszahlplan(
  input: ChartDataOptions,
  start: number
): ChartData[] {
  const { dauer, zins, rate, einmalbeitrag } = input;

  const dauerInMonths = dauer * 12;
  const percentagePerMonth = zins / 12;

  let chartData: ChartData[] = [];
  let currentSum = einmalbeitrag;
  let rendite = 0;
  let auszahlungSum = 0;

  for (let i = 0; i < dauerInMonths; i++) {
    if (currentSum < 0) break;

    chartData.push({
      date: getDateInXMonths(start + i),
      renditeSum: rendite,
      sum: currentSum,
      auszahlungSum: rate,
    });

    auszahlungSum += rate;
    rendite = currentSum * (percentagePerMonth / 100);
    currentSum = currentSum + rendite - rate;
  }

  return chartData;
}

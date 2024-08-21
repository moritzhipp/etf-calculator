import { getYearInXYears } from "./utils-general";

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
  jahr: number;
  einzahlung?: number;
  rendite?: number;
  sum: number;
};

// Jahr 0 ist Jetzt
export function calculateChartData(input: ChartDataOptions): ChartData[] {
  const { dauer, zins, rate, einmalbeitrag } = input;

  let chartData: ChartData[] = [];
  let currentEinzahlungen = +einmalbeitrag;
  let currentRendite = 0;
  let currentSum = +einmalbeitrag;

  for (let i = 0; i < dauer; i++) {
    chartData.push({
      jahr: getYearInXYears(i),
      einzahlung: currentEinzahlungen,
      rendite: currentRendite,
      sum: currentSum,
    });

    const yearlyRate = rate * 12;
    currentEinzahlungen += yearlyRate;
    currentSum = (currentSum + yearlyRate) * (1 + zins / 100);
    currentRendite = currentSum - currentEinzahlungen;
  }

  const lastItem = chartData[chartData.length - 1];

  const more = calculateAuszahlplan(
    { dauer: 20, zins: 20, rate: 1000, einmalbeitrag: lastItem.sum || 0 },
    +dauer
  );

  return [...chartData, ...more];
}

export function calculateAuszahlplan(
  input: ChartDataOptions,
  start: number
): ChartData[] {
  const { dauer, zins, rate, einmalbeitrag } = input;

  let chartData: ChartData[] = [];
  let currentSum = +einmalbeitrag;
  let rendite = 0;

  for (let i = 0; i < dauer; i++) {
    if (currentSum < 0) break;
    chartData.push({
      jahr: getYearInXYears(i + start),
      rendite: rendite,
      sum: currentSum,
      einzahlung: rate,
    });

    const yearlyRate = rate * 12;
    rendite = currentSum * (zins / 100);
    currentSum = currentSum - yearlyRate;
  }

  return chartData;
}

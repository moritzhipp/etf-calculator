import { getDateInXMonths } from "./utils-general";

export type Options = {
  inflation: number;
};

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
  date: string;
  einzahlungSum?: number;
  auszahlungSum?: number;
  renditeSum: number;
  rendite: number;
  sum: number;
};

export function calculateChartData(input: ChartDataOptions): ChartData[] {
  const { dauerEinz, rateEinz, dauerAusz, rateAusz, einmalbeitrag, zins } =
    input;

  console.log(input);
  let chartData = [];

  const percentagePerMonth = zins / 12;
  const dauerInMonths = (dauerEinz + dauerAusz) * 12;

  const isEinzahlung = (month: number) => month < input.dauerEinz * 12;

  let currentEinzahlungenSum = einmalbeitrag + rateEinz;
  let currentAuszahlungSum = 0;
  let currentSum = currentEinzahlungenSum;
  let currentRenditeSum = 0;
  let rendite = 0;

  for (let i = 0; i < dauerInMonths; i++) {
    if (currentSum < rateAusz) break;

    chartData.push({
      date: getDateInXMonths(i),
      einzahlungSum: currentEinzahlungenSum,
      auszahlungSum: currentAuszahlungSum,
      renditeSum: currentRenditeSum,
      rendite,
      sum: currentSum,
    });

    rendite = currentSum * (percentagePerMonth / 100);
    currentRenditeSum += rendite;

    if (isEinzahlung(i)) {
      currentEinzahlungenSum += rateEinz;
      currentSum = currentSum + rendite + rateEinz;
    } else {
      currentEinzahlungenSum = null;
      currentSum = currentSum + rendite;
      currentSum = currentSum - rateAusz;
      currentAuszahlungSum += rateAusz;
    }
  }

  return chartData;
}

// Jahr 0 ist Jetzt
export function calculateChartDataEinz(input: ChartDataOptions): ChartData[] {
  const { dauerEinz, rateEinz, einmalbeitrag, zins } = input;
  console.log(input);

  const percentagePerMonth = zins / 12;
  const dauerInMonths = dauerEinz * 12;

  let chartData: ChartData[] = [];
  let currentEinzahlungenSum = einmalbeitrag + rateEinz;
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
    currentRenditeSum += rendite;
    currentEinzahlungenSum += rateEinz;
    currentSum += rendite + rateEinz;
  }

  return chartData;
}

export function calculateAuszahlplan(
  input: ChartDataOptions,
  start: number
): ChartData[] {
  const { dauerAusz, zins, rateAusz, einmalbeitrag } = input;

  const dauerInMonths = dauerAusz * 12;
  const percentagePerMonth = zins / 12;

  let chartData: ChartData[] = [];
  let currentAuszahlungSum = 0;
  let currentSum = einmalbeitrag;
  let currentRenditeSum = 0;

  for (let i = 0; i < dauerInMonths; i++) {
    if (currentSum < 0) break;

    chartData.push({
      date: getDateInXMonths(start + i),
      renditeSum: currentRenditeSum,
      sum: currentSum,
      auszahlungSum: rateAusz,
    });

    let rendite = currentSum * (percentagePerMonth / 100);
    currentRenditeSum += rendite;
    currentAuszahlungSum -= rateAusz;
    currentSum += rendite - rateAusz;
  }

  return chartData;
}

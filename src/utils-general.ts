import { ChartOptions } from "./utils-calculations";

export function getDateInXYears(yearsInFuture: number): string {
  const currentDate = new Date();
  const futureYear = currentDate.getFullYear() + yearsInFuture;
  const futureDate = new Date(currentDate.setFullYear(futureYear));

  return futureDate.getFullYear().toString();
}

export function getDateInXMonths(monthsInFuture: number): string {
  const currentDate = new Date();

  const futureDate = new Date(
    currentDate.setMonth(currentDate.getMonth() + monthsInFuture)
  );

  return futureDate.toDateString();
}

export function formatEuro(amount: number | undefined): string {
  if (!amount) return "0,00€";
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

export const getLastSlice = <T>(list: T[]) => list[list.length - 1];

export const showAnsparOptions = (options: ChartOptions) =>
  options.grundlagen.calcType === "ansparplan" ||
  options.grundlagen.calcType === "combiplan";

export const showAuszahlOptions = (options: ChartOptions) =>
  options.grundlagen.calcType === "auszahlplan" ||
  options.grundlagen.calcType === "combiplan";

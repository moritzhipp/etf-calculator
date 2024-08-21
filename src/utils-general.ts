export function getYearInXYears(yearsInFuture: number): number {
  const currentYear = new Date().getFullYear();
  return currentYear + yearsInFuture;
}

export function formatEuro(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
  }).format(amount);
}

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

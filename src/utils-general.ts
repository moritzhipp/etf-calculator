export function getDateInXYearsAndMonths(
  yearsInFuture: number,
  monthsInFuture: number = 0
): string {
  const currentDate = new Date();

  const futureYear = currentDate.getFullYear() + yearsInFuture;
  const futureMonth = currentDate.getMonth() + monthsInFuture;

  const futureDate = new Date(currentDate.setFullYear(futureYear));
  futureDate.setMonth(futureMonth);

  return futureDate.toDateString();
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

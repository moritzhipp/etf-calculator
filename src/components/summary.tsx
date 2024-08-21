import { ChartData, ChartDataOptions, formatEuro } from "@/utils-general";

export const Summary = ({
  data,
  options,
}: {
  data: ChartData[];
  options: ChartDataOptions;
}) => {
  const { sum, rendite, einzahlung, jahr } = data.slice(-1)[0];
  const { rate, zins } = options;
  return (
    <div className="p-4">
      <h1>Zusammenfassung</h1>
      <p>
        Wenn du jetzt anfängst, monatlich {formatEuro(rate)} in deinen ETF zu
        investieren, der durchscnittlich jährlich um {zins}% wächst hättest du
        bis {jahr} insgesamt <b>{formatEuro(einzahlung)}</b> aufgewendet und
        damit zusätzliche <b>{formatEuro(rendite)}</b> Rendite Erwirtschaftet.
      </p>
      <p>
        Im Jahr {jahr} hättest du folglich <b>{formatEuro(sum)}</b> angespart.
      </p>
    </div>
  );
};

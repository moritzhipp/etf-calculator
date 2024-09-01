import {
  ChartAuszSlice,
  ChartEinzSlice,
  ChartOptions,
} from "@/utils-calculations";
import {
  formatEuro,
  getDateInXYears,
  showAnsparOptions,
} from "@/utils-general";

type Props = {
  lastEinzSlice: ChartEinzSlice;
  lastAuszSlice: ChartAuszSlice;
  options: ChartOptions;
};

export const SummaryAusz = (props: Props) => {
  const { lastEinzSlice, lastAuszSlice, options } = props;
  const { rate, einmalbeitrag, dauer } = options.auszahlen;
  const { zins } = options.grundlagen;

  const startYearsInFuture =
    options.grundlagen.calcType === "combiplan" ? options.einzahlen.dauer : 0;
  const endYearsInFuture = startYearsInFuture + dauer;

  const startSum = showAnsparOptions(options)
    ? lastEinzSlice.sum
    : einmalbeitrag;
  const endSum = lastAuszSlice.sum;
  const showAnspar = showAnsparOptions(options);

  const endsEarlierBecauseNoMoneyLeft =
    endYearsInFuture > options.einzahlen.dauer;

  return (
    <div className=" flex  flex-col flex-1 gap-4 border-2 px-4 py-3 border-gray-700 bg-gray-950 rounded-xl ">
      <div className="flex">
        <span className="text-md font-bold">Auszahlplan</span>
        <span className="ml-auto">
          {getDateInXYears(startYearsInFuture)} -{" "}
          {getDateInXYears(endYearsInFuture)}
        </span>
      </div>
      <div className="grid grid-cols-2">
        <span>Angenommener Zins</span>
        <span className="ml-auto">{zins}%</span>
        <span>{showAnspar ? "Rendite aus Ansparplan" : "Einmalbeitrag"}</span>
        <span className="ml-auto">{formatEuro(startSum)}</span>
        <span>Auszahlung monatlich</span>
        <span className="ml-auto">{formatEuro(rate)}</span>
      </div>
      <div className="grid grid-cols-2 mt-auto">
        <span>Summe am Ende</span>
        <span className="ml-auto font-bold">{formatEuro(endSum)}</span>
      </div>
    </div>
  );
};

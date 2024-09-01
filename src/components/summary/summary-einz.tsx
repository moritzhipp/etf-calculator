import { ChartEinzSlice, ChartOptions } from "@/utils-calculations";
import { formatEuro, getDateInXYears } from "@/utils-general";

type Props = {
  lastSlice: ChartEinzSlice;
  options: ChartOptions;
};

export const SummaryEinz = (props: Props) => {
  const { lastSlice, options } = props;
  const { sum, renditeSum, einzahlungSum } = lastSlice;
  const { rate, einmalbeitrag, dauer } = options.einzahlen;
  const { zins } = options.grundlagen;
  return (
    <div className="flex-1 flex flex-col gap-4 border-2 px-4 py-3 border-gray-700 bg-gray-950  rounded-xl">
      <div className="flex">
        <span className="text-md font-bold">Ansparplan</span>
        <span className="ml-auto">
          {getDateInXYears(0)} - {getDateInXYears(dauer - 1)}
        </span>
      </div>
      <div className="grid grid-cols-2">
        <span>Angenommener Zins</span>
        <span className="ml-auto">{zins}%</span>
        <span>Einmalbeitrag</span>
        <span className="ml-auto">{formatEuro(einmalbeitrag)}</span>
        <span>Sparrate monatlich</span>
        <span className="ml-auto">{formatEuro(rate)}</span>
      </div>
      <div className="grid grid-cols-2 ">
        <span>Zingsgewinne gesamt</span>
        <span className="ml-auto">{formatEuro(renditeSum)}</span>
        <span>Einzahlung gesamt</span>
        <span className="ml-auto">{formatEuro(einzahlungSum)}</span>
      </div>
      <div className="grid grid-cols-2 mt-auto ">
        <span className="font-bold">Rendite gesamt</span>
        <span className="ml-auto font-bold">{formatEuro(sum)}</span>
      </div>
    </div>
  );
};

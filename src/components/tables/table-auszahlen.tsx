import { ChartAuszSlice } from "@/utils-calculations";
import { formatEuro } from "@/utils-general";
import { Children } from "react";

type Props = {
  data: ChartAuszSlice[];
};

export const TableAuszahlen = (props: Props) => {
  const { data } = props;

  const tableData = Children.toArray(data.map(TableRow));

  return (
    <table className="text-right">
      <tr className="border-b-1 border-gray-600">
        <th>Jahr</th>
        <th>Auszahlungen</th>
        <th>Steuer</th>
        <th>Rendite</th>
        <th>Summe Jahresbeginn</th>
        <th>Summe Jahresende</th>
      </tr>
      {tableData}
    </table>
  );
};

const TableRow = (data: ChartAuszSlice) => {
  return (
    <tr className="text-right">
      <td>{data.date}</td>
      <td>{formatEuro(data.auszahlung)}</td>
      <td>{formatEuro(data.steuer)}</td>
      <td>{formatEuro(data.rendite)}</td>
      <td>{formatEuro(data.etfValue)}</td>
      <td>{formatEuro(data.sum)}</td>
    </tr>
  );
};

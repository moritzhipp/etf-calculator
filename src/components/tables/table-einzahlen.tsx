import { ChartEinzSlice } from "@/utils-calculations";
import { formatEuro } from "@/utils-general";
import { Children } from "react";

type Props = {
  data: ChartEinzSlice[];
};

export const TableEinzahlen = (props: Props) => {
  const { data } = props;

  const tableData = Children.toArray(data.map(TableRow));

  return (
    <table className="text-right">
      <tr className="border-b-1 border-gray-600">
        <th>Jahr</th>
        <th>Rendite</th>
        <th>Summe Einzahlungen</th>
        <th>Summe Jahresende</th>
      </tr>
      {tableData}
    </table>
  );
};

const TableRow = (data: ChartEinzSlice) => {
  return (
    <tr className="text-right">
      <td>{data.date}</td>
      <td>{formatEuro(data.rendite)}</td>
      <td>{formatEuro(data.einzahlungSum)}</td>
      <td>{formatEuro(data.sum)}</td>
    </tr>
  );
};

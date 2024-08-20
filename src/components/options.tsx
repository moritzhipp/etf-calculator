import { DatePicker } from "@nextui-org/date-picker";
import { Input } from "@nextui-org/input";

export const Options = () => {
  return (
    <div className="flex flex-row gap-4 p-4">
      <Input type="text" label="ETF WKN" />
      <DatePicker label="From" />
      <DatePicker label="To" />
    </div>
  );
};

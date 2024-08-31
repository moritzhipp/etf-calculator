import {
  ChartAuszOptions,
  ChartEinzOptions,
  ChartOptions,
} from "@/utils-calculations";
import { OptionsAusz } from "./options-ausz";
import { OptionsEinz } from "./options-einz";
import { OptionsGrundlagen } from "./options-grundlagen";

type Props = {
  options: ChartOptions;
  onChange: any;
};

export const Options = (props: Props) => {
  const { options, onChange } = props;

  const changeEinz = (einz: ChartEinzOptions) => {
    onChange({ ...options, einzahlen: { ...options.einzahlen, ...einz } });
  };

  const changeAusz = (ausz: ChartAuszOptions) => {
    onChange({ ...options, auszahlen: { ...options.auszahlen, ...ausz } });
  };

  const changeGrund = (zins: number) => {
    console.log(zins);
    onChange({ ...options, zins });
  };

  return (
    <>
      <OptionsEinz onChange={changeEinz} options={options.einzahlen} />
      <OptionsAusz onChange={changeAusz} options={options.auszahlen} />
      <OptionsGrundlagen onChange={changeGrund} zins={options.zins} />
    </>
  );
};

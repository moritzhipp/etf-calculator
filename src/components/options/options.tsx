import {
  ChartAuszOptions,
  ChartEinzOptions,
  ChartGrundlagenOptions,
  ChartOptions,
} from "@/utils-calculations";
import { showAnsparOptions, showAuszahlOptions } from "@/utils-general";
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

  const changeGrund = (grund: ChartGrundlagenOptions) => {
    onChange({ ...options, grundlagen: { ...options.grundlagen, ...grund } });
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      <OptionsGrundlagen onChange={changeGrund} options={options} />
      {showAnsparOptions(options) && (
        <OptionsEinz onChange={changeEinz} options={options} />
      )}
      {showAuszahlOptions(options) && (
        <OptionsAusz onChange={changeAusz} options={options} />
      )}
    </div>
  );
};

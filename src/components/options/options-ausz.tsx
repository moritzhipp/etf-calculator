import { ChartAuszOptions } from "@/utils-calculations";
import { Input } from "@nextui-org/input";

type Props = {
  options: ChartAuszOptions;
  onChange: any;
};

export const OptionsAusz = (props: Props) => {
  const { options, onChange } = props;
  const { rate, dauer, einmalbeitrag, steuerfreibetrag } = options;

  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  return (
    <form className="p-4" onChange={handleFormChange}>
      <div className="grid grid-cols-3 gap-3">
        <Input
          type="number"
          value={rate}
          label="Rate Auszahlung"
          min="1"
          id="rate"
        />
        <Input
          type="number"
          value={dauer}
          label="Dauer Auszahlung"
          min="0"
          id="dauer"
        />
        <Input
          type="number"
          value={einmalbeitrag}
          label="Einmalbeitrag"
          min="0"
          id="einmalbeitrag"
        />
        <Input
          type="number"
          value={steuerfreibetrag}
          label="Steuerfreibetrag"
          min="0"
          id="steuerfreibetrag"
        />
      </div>
    </form>
  );
};

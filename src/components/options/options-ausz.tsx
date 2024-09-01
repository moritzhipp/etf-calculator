import { ChartOptions } from "@/utils-calculations";
import { Input } from "@nextui-org/input";

type Props = {
  options: ChartOptions;
  onChange: any;
};

export const OptionsAusz = (props: Props) => {
  const { options, onChange } = props;
  const { rate, dauer, einmalbeitrag, steuerfreibetrag } = options.auszahlen;

  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  return (
    <form onChange={handleFormChange}>
      <h2 className="p-2">Auszahlphase</h2>

      <div className="flex gap-3">
        {options.grundlagen.calcType === "auszahlplan" && (
          <Input
            type="number"
            value={einmalbeitrag}
            label="Einmalbeitrag"
            min="0"
            id="einmalbeitrag"
            variant="bordered"
          />
        )}
        <Input
          type="number"
          value={rate}
          label="Rate Auszahlung"
          min="1"
          id="rate"
          variant="bordered"
        />
        <Input
          type="number"
          value={dauer}
          label="Dauer Auszahlung"
          min="0"
          id="dauer"
          variant="bordered"
        />
        <Input
          type="number"
          value={steuerfreibetrag}
          label="Steuerfreibetrag"
          min="0"
          id="steuerfreibetrag"
          variant="bordered"
        />
      </div>
    </form>
  );
};

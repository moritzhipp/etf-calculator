import { ChartOptions } from "@/utils-calculations";
import { Input } from "@nextui-org/input";

type Props = {
  options: ChartOptions;
  onChange: any;
};

export const OptionsEinz = (props: Props) => {
  const { options, onChange } = props;
  const { einmalbeitrag, rate, dauer } = options.einzahlen;

  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  return (
    <form onChange={handleFormChange}>
      <h2 className="p-2">Auszahlphase</h2>
      <div className="grid grid-cols-3 gap-3">
        <Input
          type="number"
          value={einmalbeitrag}
          label="Einmaliger Betrag"
          min="0"
          id="einmalbeitrag"
        />
        <Input
          type="number"
          value={rate}
          label="Rate Einzahlung"
          min="0"
          id="rate"
        />
        <Input
          type="number"
          value={dauer}
          label="Dauer Einzahlung"
          min="0"
          id="dauer"
        />
      </div>
    </form>
  );
};

import { Input } from "@nextui-org/input";

export const Options = ({ onChange, options }) => {
  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  return (
    <form onChange={handleFormChange} className="grid grid-cols-4 gap-4 p-4">
      <Input
        type="number"
        value={options.einmalbeitrag}
        label="Einmaliger Betrag"
        min="0"
        id="einmalbeitrag"
      />
      <Input
        type="number"
        value={options.rate}
        label="Monatliche Sparrate"
        min="0"
        id="rate"
      />
      <Input
        type="number"
        value={options.dauer}
        label="Anlagedauer"
        min="0"
        id="dauer"
      />
      <Input
        value={options.zins}
        type="number"
        label="Zinssatz"
        min="0"
        id="zins"
      />
    </form>
  );
};

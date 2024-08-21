import { Input } from "@nextui-org/input";
import { Tab, Tabs } from "@nextui-org/tabs";

export const Options = ({ onChange, options }) => {
  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  return (
    <form className="p-4" onChange={handleFormChange}>
      <Tabs>
        <Tab title="Ansparplan">
          <div className="grid grid-cols-3 gap-3">
            <Input
              type="number"
              value={options.einmalbeitrag}
              label="Einmaliger Betrag"
              min="0"
              id="einmalbeitrag"
            />
            <Input
              type="number"
              value={options.rateEinz}
              label="Rate Einzahlung"
              min="0"
              id="rateEinz"
            />
            <Input
              type="number"
              value={options.dauerEinz}
              label="Dauer Einzahlung"
              min="0"
              id="dauerEinz"
            />
          </div>
        </Tab>
        <Tab title="Auszahlplan">
          <div className="grid grid-cols-3 gap-3">
            <Input
              type="number"
              value={options.dauerAusz}
              label="Rate Auszahlung"
              min="0"
              id="dauerAusz"
            />
            <Input
              type="number"
              value={options.rateAusz}
              label="Dauer Auszahlung"
              min="0"
              id="rateAusz"
            />
          </div>
        </Tab>
        <Tab title="Berechnungsgrundlagen">
          <div className="grid grid-cols-3 gap-3">
            <Input
              value={options.zins}
              type="number"
              label="Zinssatz"
              min="0"
              id="zins"
            />
            <Input
              value={options.steuerfreibetrag}
              type="number"
              label="Steuerfreibetrag"
              min="0"
              id="steuerfreibetrag"
            />
          </div>
        </Tab>
      </Tabs>
    </form>
  );
};

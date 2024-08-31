import { ChartOptions } from "@/utils-calculations";
import { Input } from "@nextui-org/input";
import { Tab, Tabs } from "@nextui-org/tabs";

type Props = {
  options: ChartOptions;
  onChange: any;
};

export const OptionsGrundlagen = (props: Props) => {
  const { options, onChange } = props;
  const { zins, calcType, inflation } = options.grundlagen;

  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  const handleTypeChange = (key: string) => {
    onChange({ calcType: key });
  };

  return (
    <form onChange={handleFormChange}>
      <Tabs
        onSelectionChange={handleTypeChange}
        selectedKey={calcType}
        className="col-span-2"
      >
        <Tab key="ansparplan" title="Ansparplan" />
        <Tab key="auszahlplan" title="Auszahlplan" />
        <Tab key="combiplan" title="Combiplan" />
      </Tabs>
      <h2 className="p-2">Grundlagen</h2>
      <div className="grid grid-cols-2 gap-3">
        <Input type="number" value={zins} label="Zinssatz" min="1" id="zins" />
        <Input
          type="number"
          value={inflation}
          label="Inflation"
          min="1"
          id="inflation"
        />
      </div>
    </form>
  );
};

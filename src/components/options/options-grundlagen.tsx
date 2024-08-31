import { Input } from "@nextui-org/input";

type Props = {
  zins: number;
  onChange: any;
};

export const OptionsGrundlagen = (props: Props) => {
  const { zins, onChange } = props;

  const handleFormChange = (e) => {
    onChange({ [e.target.id]: Number(e.target.value) });
  };

  return (
    <form className="p-4" onChange={handleFormChange}>
      <div className="grid grid-cols-3 gap-3">
        <Input
          type="number"
          value={zins}
          label="Rate Auszahlung"
          min="1"
          id="zins"
        />
      </div>
    </form>
  );
};

import { CalcType } from "@/utils-calculations";
import { Radio, RadioGroup } from "@nextui-org/radio";

type Props = {
  calctype: CalcType;
  onChange: any;
};

export const OptionsCalcType = (props: Props) => {
  const { calctype, onChange } = props;

  const handleFormChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <form>
      <RadioGroup
        label="Was möchtest du berechnen?"
        color="warning"
        value={calctype}
        onChange={handleFormChange}
        orientation="horizontal"
      >
        <Radio value="ansparplan">Ansparplan</Radio>
        <Radio value="auszahlplan">Auszahlpan</Radio>
        <Radio value="combiplan">Combiplan</Radio>
      </RadioGroup>
    </form>
  );
};

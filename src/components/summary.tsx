import { formatEuro, getDateInXYears } from "@/utils-general";
import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";

export const Summary = (props) => {
  const { summary, options } = props;
  const { rateAusz, rateEinz, zins, einmalbeitrag, dauerAusz } = options;

  return (
    <div className="grid grid-cols-2 gap-4 p-4">
      <Card>
        <CardHeader>
          <h1 className="font-bold">Ansparen</h1>
          <div className="ml-auto">
            {getDateInXYears(0)}-{getDateInXYears(options.dauerEinz)}
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div>Rechnungszins: {zins}%</div>
          <div>Einmalbeitrag: {formatEuro(einmalbeitrag)}</div>
          <div>Sparrate monatlich: {formatEuro(rateEinz)}</div>
          <div>
            Einzahlung gesamt: {formatEuro(summary.ansparen.einzahlungSum)}
          </div>
          <div>Rendite gesamt: {formatEuro(summary.ansparen.renditeSum)}</div>
        </CardBody>
        <Divider />
        <CardFooter>
          <span>Summe</span>
          <span className="ml-auto">{formatEuro(summary.ansparen.sum)}</span>
        </CardFooter>
      </Card>
      {dauerAusz && (
        <Card>
          <CardHeader>
            <h1 className="font-bold">Auszahlen</h1>
            <div className="ml-auto">
              {getDateInXYears(0)}-{getDateInXYears(options.dauerEinz)}
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <div>Zins: {zins}%</div>
          </CardBody>
          <Divider />
          <CardFooter>
            <span>Rente monatlich</span>
            <span className="ml-auto">{formatEuro(options.rateAusz)}</span>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

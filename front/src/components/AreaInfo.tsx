import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calculator } from "lucide-react";
import type { ResourceFeature } from "@/assets/interfaces";

interface AreaInfoProps {
  features: ResourceFeature[];
}

const featuresNumericKeys: Array<keyof ResourceFeature['properties']> = [
  'estabelecimento_outras_finalidades',
  'domicilio_particular',
  'estabelecimento_construcao',
  'estabelecimento_religioso',
  'estabelecimento_ensino',
  'estabelecimento_saude',
  'domicilio_coletivo',
  'estabelecimento_agro'
];

function median(values: number[]): number {
  const sortedValues = [...values].sort((a, b) => a - b);

  const midPosition = Math.floor(sortedValues.length / 2);

  const isEven = sortedValues.length % 2 === 0;

  return isEven ? (sortedValues[midPosition - 1] + sortedValues[midPosition]) / 2 : sortedValues[midPosition];
}

export default function AreaInfo({ features }: AreaInfoProps) {
  const totalPoints = features.length;

  const calculatedInfos = featuresNumericKeys
  .map((key) => {
    const values = features.map((f) => f.properties[key] ?? 0) as number[];

    const sum = values.reduce((acc, curr) => acc + curr, 0);
    
    const avg = values.length > 0 ? sum / values.length : 0;

    const med = values.length > 0 ? median(values) : 0;

    return {
      key,
      sum,
      avg: avg.toFixed(1),
      median: med,
    };
  });

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <Calculator className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">Estatísticas</h3>
      </div>
      <div className="rounded-md border border-border bg-card p-3">
        <p className="text-xs text-muted-foreground mb-3">
          Total de pontos: <span className="font-semibold text-foreground">{totalPoints}</span>
        </p>
        <Separator className="mb-3" />
        <ScrollArea className="h-100 pr-2">
          <div className="flex flex-col gap-2">
            {features.length === 0 && (
              <p className="text-xs text-muted-foreground px-2 py-4 text-center">
                Demarque uma região para ver mais informações.
              </p>
            )}
            {features.length !== 0 && calculatedInfos.map((info) => (
              <Card key={info.key} className="shadow-none border-border">
                <CardHeader className="p-2 pb-1">
                  <CardTitle className="text-xs font-medium text-foreground">
                    {info.key}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 pt-0">
                  <div className="grid grid-cols-3 gap-1 text-xs">
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Soma</span>
                      <span className="font-semibold text-foreground">{info.sum}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Média</span>
                      <span className="font-semibold text-foreground">{info.avg}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-muted-foreground">Mediana</span>
                      <span className="font-semibold text-foreground">{info.median}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
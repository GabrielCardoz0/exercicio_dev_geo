import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2 } from "lucide-react";
import type { ResourceFeature } from "@/assets/interfaces";

interface PointsListProps {
  features: ResourceFeature[];
  selectedId: number | null;
  onSelect: (feature: ResourceFeature) => void;
  onRemove: (id: number) => void;
}

export default function SavePointsList({ features, onSelect, onRemove, selectedId }: PointsListProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">
          Pontos Salvos ({features.length})
        </h3>
      </div>
      <ScrollArea className="h-[250px]">
        <div className="flex flex-col gap-1 pr-2">
          {features.length === 0 && (
            <p className="text-xs text-muted-foreground px-2 py-4 text-center">
              Clique no mapa para adicionar pontos.
            </p>
          )}
          {features.map((feature) => {
            const { id, address } = feature.properties;
            const [lng, lat] = feature.geometry.coordinates;
            const isSelected = selectedId === id;

            return (
              <div
                key={id}
                onClick={() => onSelect(feature)}
                className={`flex items-start justify-between rounded-md p-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-foreground">
                    {address?.display_name ?? `Ponto ${id}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {address?.city && `${address.city}, `}
                    {lat.toFixed(4)}, {lng.toFixed(4)}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRemove(id);
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
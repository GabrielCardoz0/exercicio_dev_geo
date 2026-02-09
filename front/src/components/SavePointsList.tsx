import { ScrollArea } from "@/components/ui/scroll-area";
import { MapPin } from "lucide-react";
import type { IMarker } from "@/assets/interfaces";

interface SavePointsListListProps {
  markers: IMarker[];
  selectedId: number | null;
  onSelect: (feature: IMarker) => void;
}

export default function SavePointsList({ markers, onSelect, selectedId }: SavePointsListListProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <MapPin className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-sm font-semibold text-foreground">
          Pontos Salvos ({markers.length})
        </h3>
      </div>
      <ScrollArea className="h-60">
        <div className="flex flex-col gap-1 pr-2">
          {markers.length === 0 && (
            <p className="text-xs text-muted-foreground px-2 py-4 text-center">
              Clique no mapa para adicionar pontos.
            </p>
          )}
          {markers.map((marker) => {
            const { id, lon, lat } = marker;
            const isSelected = selectedId === id;

            return (
              <div
                key={id}
                onClick={() => onSelect(marker)}
                className={`flex items-start justify-between rounded-md p-2 cursor-pointer transition-colors ${
                  isSelected
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate text-foreground">
                    {marker.display_name ?? `Ponto ${id}`}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {marker?.city && `${marker.city}, `}
                    {lat.toFixed(4)}, {lon.toFixed(4)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
}
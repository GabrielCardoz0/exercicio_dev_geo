import type { IMarker } from "@/assets/interfaces"
import { Button } from "./ui/button"
import { Trash2 } from "lucide-react"

interface MarkerInfoPopup {
  onDelete: () => void
  marker: IMarker
}

export default function MarkerInfoPopup({ onDelete, marker }: MarkerInfoPopup) {
  return (
    <div className="p-2 text-sm space-y-2">
      <div className="text-sm font-bold">{marker.postcode}</div>
      <div className="text-xs">
        <p>{marker.display_name}</p>

        <div className="text-blue-400 truncate font-medium pt-2 text-xs text-center">
          {marker.lat.toFixed(8)}, {marker.lon.toFixed(8)}
        </div>
      </div>
      <div className="space-x-4 mx-auto flex justify-center">
        <Button className="w-20 rounded-sm" size={"xs"} variant={"destructive"} onClick={onDelete}>
          Remover
          <Trash2 className="h-3 w-3" />
        </Button>
      </div>
    </div>
  )
}
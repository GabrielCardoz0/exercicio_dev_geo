import { Button } from "./ui/button"

export interface OpenStreetMapFeature {
  "place_id": number,
  "lat": string,
  "lon": string,
  "display_name": string,
  "address"?: {
      "building"?: string,
      "city"?: string,
      "town"?: string,
      "state"?: string,
      "country"?: string,
      "postcode"?: string | number
  }
}

interface NewMarkerPopupProps {
  onSave: () => void,
  onCancel: () => void,
  feature: OpenStreetMapFeature
}

export default function NewMarkerPopup({ feature, onCancel, onSave }: NewMarkerPopupProps) {
  return (
    <div className="p-2 text-sm space-y-2">
      <div className="text-sm font-bold">Adicionar marcador?</div>
      <div className="text-xs">
        <p>{feature?.display_name}</p>

        <div className="text-blue-400 truncate font-medium pt-2 text-xs text-center">
          {Number(feature?.lat).toFixed(8)}, {Number(feature?.lon).toFixed(8)}
        </div>
      </div>
      <div className="space-x-4 mx-auto flex justify-center">
        <Button className="w-20 rounded-sm" size={"xs"} variant={"outline"} onClick={onCancel}>Cancelar</Button>
        <Button className="w-20 rounded-sm" size={"xs"} onClick={onSave}>Salvar</Button>
      </div>
    </div>
  )
}
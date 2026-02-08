import { Button } from "./ui/button"

interface OpenStreetMapFeature{
  "place_id": number,
  "lat": string,
  "lon": string,
  "display_name": string,
  "address": {
      "building": string,
      "city": string,
      "state": string,
      "country": string,
      "postcode": string | number
  }
}

interface NewMarkerPopupProps {
  onSave: () => void,
  onCancel: () => void,
  feature: OpenStreetMapFeature
}

export default function NewMarkerPopup({ feature, onCancel, onSave }: NewMarkerPopupProps) {
  console.log('AQUI VEM', feature);
  return (
    <div className="p-2 text-sm space-y-2">
      <div className="text-sm font-bold">Adicionar marcador?</div>
      <div className="text-xs">
        <p>{feature?.display_name}</p>

        <div className="text-blue-400 truncate font-medium pt-2 text-xs text-center">
          {Number(feature?.lat).toFixed(8)}, {Number(feature?.lon).toFixed(8)}
        </div>
      </div>
      <div className="space-x-4 mx-auto flex justify-center" onClick={onSave}>
        <Button className="w-20 rounded-sm" size={"xs"} variant={"outline"} onClick={onCancel}>Cancelar</Button>
        <Button className="w-20 rounded-sm" size={"xs"}>Salvar</Button>
      </div>
    </div>
  )
}





          // <div className="p-2 text-sm">
          //   <strong>{osmData.address?.building || 'Local desconhecido'}</strong>
          //   <p>{osmData.display_name}</p>
      
          //   <button
          //     className="mt-2 px-2 py-1 bg-blue-600 text-white rounded"
          //     onClick={async () => {
          //       // await saveMarker({
          //       //   lat,
          //       //   lon,
          //       //   osmData,
          //       // })
          //       console.log('chamou para salvar');
          //       const featureId = e.features[0].id
          //       drawRef.current?.delete(String(e.features[0].id))
          //       popupRef.current?.remove()
          //     }}
          //   >
          //     Salvar
          //   </button>
          // </div>
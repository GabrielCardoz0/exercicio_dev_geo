import type { ResourceFeature } from "@/assets/interfaces"

interface MapPopupProps {
  feature: ResourceFeature
}

export default function MapPopup({ feature }: MapPopupProps) {
  return (
    <div className='text-xs space-y-2 font-semibold text-center'>
      <div className="font-bold">Domicílios particulares (Censo 2022)</div>
      <div className='text-sm'>
        {feature.properties.domicilio_particular ?? "Sem informações"}
      </div>

      <div className="text-blue-400 truncate font-medium pt-1">
        {feature.geometry.coordinates[0].toFixed(8)}, {feature.geometry.coordinates[1].toFixed(8)}
      </div>
    </div>
  )
}
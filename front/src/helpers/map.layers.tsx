import type { ResourceFeature } from "@/assets/interfaces"
import { createPopup, createReactDOMContainer } from "./map.helpers"
import MapPopup from "@/components/MapPopup"

export const addStoreLayer = (map: mapboxgl.Map) => {
  map.addLayer({
    id: 'unclustered-point',
    type: 'circle',
    source: 'stores',
    paint: {
      'circle-radius': 3,
      'circle-color': '#0088ff',
      'circle-opacity': 0.4,
    },
  })
}

export const addPointerCursor = (map: mapboxgl.Map) => {
  map.on('mouseenter', 'unclustered-point', () => {
    map.getCanvas().style.cursor = 'pointer'
  })

  map.on('mouseleave', 'unclustered-point', () => {
    map.getCanvas().style.cursor = ''
  })
}

export const showPopupOnPointClick = (map: mapboxgl.Map, popupRef: React.RefObject<mapboxgl.Popup | null>) => {
  map.on('click', 'unclustered-point', (e) => {
    const feature = e.features?.[0] as ResourceFeature | undefined

    if (!feature) return
    
    popupRef.current?.remove()
    
    popupRef.current = createPopup()
    .setLngLat(feature.geometry.coordinates)
    .addTo(map)
    .setDOMContent(createReactDOMContainer(<MapPopup feature={feature} />))
  })
}
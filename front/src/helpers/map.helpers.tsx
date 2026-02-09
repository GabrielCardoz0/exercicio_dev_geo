import mapboxgl from 'mapbox-gl'
import { createRoot } from 'react-dom/client'

export const createMapPopup = ({ lngLat, map }: { lngLat: [number, number], map: mapboxgl.Map }): mapboxgl.Popup => {
  return new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    offset: 10,
    closeOnMove: true
  })
  .setLngLat(lngLat)
  .addTo(map)
}

export const createPopup = (): mapboxgl.Popup => {
  return new mapboxgl.Popup({
    closeOnClick: false,
    closeButton: false,
    offset: 10,
    closeOnMove: true
  })
}

export const createMarker = ({ lngLat, map }: { lngLat: [number, number], map: mapboxgl.Map }): mapboxgl.Marker => {
  return new mapboxgl.Marker().setLngLat(lngLat).addTo(map)
}


export const createReactDOMContainer = (node: React.ReactNode): HTMLElement => {
  const element = document.createElement('div')
  const root = createRoot(element)
  root.render(node)

  return element
}

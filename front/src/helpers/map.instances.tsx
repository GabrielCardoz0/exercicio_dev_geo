import mapboxgl from 'mapbox-gl'
import MapboxDraw from '@mapbox/mapbox-gl-draw'
import { MAPBOX_API_KEY } from '@/variables'

export const createMapInstance = (container: HTMLDivElement) => {
  mapboxgl.accessToken = MAPBOX_API_KEY

  const map = new mapboxgl.Map({
    container,
    center: [-50.55, -20.27],
    zoom: 15,
  })

  const draw = new MapboxDraw({
    displayControlsDefault: false,
    controls: {
      polygon: true,
      trash: true,
      point: true,
    },
  })

  map.addControl(draw)

  return { map, draw }
}

import { getResourcesData } from '@/lib/api'
import { MAPBOX_API_KEY } from '@/variables'
import mapboxgl from 'mapbox-gl'
import { useEffect, useRef } from 'react'
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';


export default function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    mapboxgl.accessToken = MAPBOX_API_KEY

    const map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      center: [-50.500237, -20.290054],
      zoom: 12.5,
      // style: 'mapbox://styles/mapbox/light-v11'
    })

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });

    const defineArea = () => {}

    mapRef.current = map
    mapRef.current
    .addControl(draw)
    .on('draw.create', defineArea)
    .on('draw.delete', defineArea)
    .on('draw.update', defineArea)

    map.on('load', async () => {
      const data = await getResourcesData();

      map
      .addSource('stores', {
        type: 'geojson',
        data,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      })
      .addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'stores',
        paint: {
          'circle-radius': 4,
          'circle-color': '#ff0000',
          "circle-opacity": 0.5
        },
      })
    })
    return () => map.remove()
  }, [])


  return (

    <div className="absolute top-0 left-0 right-0 bottom-0 flex">
      <div ref={mapContainerRef} className="w-full h-full" />
    </div>
  )
};
